#!/usr/bin/env node
/**
 * Intandem Government Contracting Resource Center — Official MCP Server (Stdio Transport)
 *
 * Supports:
 * 1. Local in-memory execution (when run inside the repository via `jiti` or bundled build).
 * 2. Zero-dependency remote bridge to `https://www.getintandem.io/api/mcp` when installed standalone via `npx -y @intandem/govcon-mcp`.
 *
 * Protocol: JSON-RPC 2.0 over newline-delimited stdin/stdout (Model Context Protocol).
 */
import readline from 'node:readline';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const REMOTE_MCP_ENDPOINT =
  process.env.INTANDEM_MCP_URL || 'https://www.getintandem.io/api/mcp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const localCorePath = path.resolve(__dirname, '../src/mcp/govconMcpCore.ts');

let localHandler = null;

async function getLocalHandler() {
  if (localHandler !== null) return localHandler;
  if (existsSync(localCorePath)) {
    try {
      const { createJiti } = await import('jiti');
      const jiti = createJiti(path.resolve(__dirname, '..'));
      const coreMod = jiti('./src/mcp/govconMcpCore.ts');
      if (coreMod && typeof coreMod.handleMcpJsonRpc === 'function') {
        localHandler = coreMod.handleMcpJsonRpc;
        return localHandler;
      }
    } catch {
      // Fallback to remote HTTP endpoint if jiti isn't available
    }
  }
  localHandler = false;
  return false;
}

async function processRpcMessage(rawLine) {
  const trimmed = rawLine.trim();
  if (!trimmed) return;

  let parsed;
  try {
    parsed = JSON.parse(trimmed);
  } catch (err) {
    process.stdout.write(
      JSON.stringify({
        jsonrpc: '2.0',
        id: null,
        error: { code: -32700, message: `Parse error: ${err.message}` },
      }) + '\n'
    );
    return;
  }

  const handler = await getLocalHandler();
  if (handler) {
    const response = handler(parsed);
    if (response !== null && response !== undefined) {
      process.stdout.write(JSON.stringify(response) + '\n');
    }
    return;
  }

  // Remote fallback via https://www.getintandem.io/api/mcp
  try {
    const res = await fetch(REMOTE_MCP_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'User-Agent': '@intandem/govcon-mcp/1.2.0',
      },
      body: JSON.stringify(parsed),
    });

    if (res.status === 202 || res.status === 204) {
      return;
    }

    const text = await res.text();
    if (text && text.trim()) {
      // Ensure single-line JSON output per MCP stdio spec
      const json = JSON.parse(text);
      process.stdout.write(JSON.stringify(json) + '\n');
    }
  } catch (err) {
    if (parsed && parsed.id !== undefined) {
      process.stdout.write(
        JSON.stringify({
          jsonrpc: '2.0',
          id: parsed.id,
          error: {
            code: -32603,
            message: `Failed to reach Intandem MCP endpoint (${REMOTE_MCP_ENDPOINT}): ${err.message}`,
          },
        }) + '\n'
      );
    }
  }
}

// CLI flag support (--help / --version / --test / mcp add)
const args = process.argv.slice(2);
if (args.includes('--version') || args.includes('-v')) {
  console.log('1.2.0');
  process.exit(0);
}

if (
  (args[0] === 'mcp' && args[1] === 'add') ||
  args[0] === 'add' ||
  args[0] === 'install' ||
  args[0] === 'setup'
) {
  const home = os.homedir();
  const isWin = process.platform === 'win32';
  const isMac = process.platform === 'darwin';

  const claudeDesktopPath = isWin
    ? path.join(process.env.APPDATA || path.join(home, 'AppData', 'Roaming'), 'Claude', 'claude_desktop_config.json')
    : isMac
      ? path.join(home, 'Library', 'Application Support', 'Claude', 'claude_desktop_config.json')
      : path.join(home, '.config', 'Claude', 'claude_desktop_config.json');

  const targets = [
    { name: 'Cursor', file: path.join(home, '.cursor', 'mcp.json'), createIfParentExists: true },
    { name: 'Claude Desktop', file: claudeDesktopPath, createIfParentExists: true },
    { name: 'Claude Code', file: path.join(home, '.claude.json'), createIfParentExists: false },
    {
      name: 'Windsurf',
      file: path.join(home, '.codeium', 'windsurf', 'mcp_config.json'),
      createIfParentExists: true,
    },
  ];

  const serverEntry = {
    command: 'npx',
    args: ['-y', '@intandem/govcon-mcp'],
  };

  const configured = [];

  for (const t of targets) {
    const dir = path.dirname(t.file);
    if (!existsSync(t.file) && !(t.createIfParentExists && existsSync(dir))) {
      continue;
    }
    try {
      mkdirSync(dir, { recursive: true });
      const current = existsSync(t.file) ? JSON.parse(readFileSync(t.file, 'utf8') || '{}') : {};
      current.mcpServers = current.mcpServers || {};
      current.mcpServers['intandem-govcon'] = serverEntry;
      writeFileSync(t.file, JSON.stringify(current, null, 2) + '\n', 'utf8');
      configured.push(`${t.name} (${t.file})`);
    } catch {
      // Ignore permission or malformed JSON errors on individual clients
    }
  }

  // Always ensure Cursor ~/.cursor/mcp.json is created if no existing client config was found
  if (configured.length === 0) {
    const fallbackCursor = path.join(home, '.cursor', 'mcp.json');
    mkdirSync(path.dirname(fallbackCursor), { recursive: true });
    const current = existsSync(fallbackCursor)
      ? JSON.parse(readFileSync(fallbackCursor, 'utf8') || '{}')
      : {};
    current.mcpServers = current.mcpServers || {};
    current.mcpServers['intandem-govcon'] = serverEntry;
    writeFileSync(fallbackCursor, JSON.stringify(current, null, 2) + '\n', 'utf8');
    configured.push(`Cursor (${fallbackCursor})`);
  }

  console.log('\n✓ Intandem GovCon MCP Server added to:');
  for (const item of configured) {
    console.log(`  • ${item}`);
  }
  console.log('\nRestart your AI agent / IDE to access all 1,460+ FAR, SBA, NAICS, PSC, NIGP & SLED resources.');
  console.log('Documentation: https://www.getintandem.io/government-contracting-resources\n');
  process.exit(0);
}

if (args.includes('--help') || args.includes('-h')) {
  console.error(`
Intandem Government Contracting Resource Center — MCP Server (v1.2.0)
https://www.getintandem.io/government-contracting-resources

Usage:
  npx @intandem/govcon-mcp mcp add        Auto-configure Claude, Cursor & Windsurf
  npx -y @intandem/govcon-mcp             Start MCP server over stdio
  node mcp-server/index.mjs --self-test   Run automated JSON-RPC self-test

Remote Streamable HTTP Endpoint:
  https://www.getintandem.io/api/mcp
`);
  process.exit(0);
}

if (args.includes('--self-test')) {
  (async () => {
    const handler = await getLocalHandler();
    if (!handler) {
      console.error('Local handler not found for self-test.');
      process.exit(1);
    }
    const initRes = handler({
      jsonrpc: '2.0',
      id: 1,
      method: 'initialize',
      params: { protocolVersion: '2024-11-05', clientInfo: { name: 'self-test', version: '1.0' } },
    });
    const toolsRes = handler({ jsonrpc: '2.0', id: 2, method: 'tools/list' });
    const callNaics = handler({
      jsonrpc: '2.0',
      id: 3,
      method: 'tools/call',
      params: { name: 'lookup_commodity_codes', arguments: { code: '541512' } },
    });
    const callPortal = handler({
      jsonrpc: '2.0',
      id: 4,
      method: 'tools/call',
      params: { name: 'find_procurement_portals', arguments: { state: 'Texas' } },
    });
    const callSetAside = handler({
      jsonrpc: '2.0',
      id: 5,
      method: 'tools/call',
      params: { name: 'check_set_aside_program', arguments: { program: 'sdvosb' } },
    });
    console.log(
      JSON.stringify(
        {
          selfTest: 'PASSED',
          serverName: initRes.result.serverInfo.name,
          toolsCount: toolsRes.result.tools.length,
          sampleNaicsCitation: JSON.parse(callNaics.result.content[0].text).naics_detail
            .citation_markdown,
          samplePortalCitation: JSON.parse(callPortal.result.content[0].text).state_portal
            .citation_markdown,
          sampleSetAsideCitation: JSON.parse(callSetAside.result.content[0].text).citation_markdown,
        },
        null,
        2
      )
    );
    process.exit(0);
  })();
} else {
  const rl = readline.createInterface({
    input: process.stdin,
    terminal: false,
  });

  rl.on('line', (line) => {
    void processRpcMessage(line);
  });
}

