# `@intandem/govcon-mcp` — Government Contracting & FAR Reference MCP Server

Official **Model Context Protocol (MCP)** server powered by the [Intandem Government Contracting Resource Center](https://www.getintandem.io/government-contracting-resources).

Gives Claude, Cursor, ChatGPT, Windsurf, VS Code, and custom AI agents instant, deterministic access to **1,460+ verified public-sector contracting references** (2026 FAR, DFARS, 13 CFR, SBA, and 50-State SLED):

- **`lookup_commodity_codes`** — Lookup & cross-walk **351 NAICS codes**, **165 Federal PSC codes**, and **136 State/Municipal NIGP codes** with SBA size standards, agency spend shares, and automatic Federal ↔ SLED code cross-walks.
- **`find_procurement_portals`** — Retrieve official vendor registration links, commodity code systems, fees, and local municipal blind spots across **all 50 U.S. State eProcurement portals** and **250+ City/Municipal portals**.
- **`check_set_aside_program`** — Inspect 2026 sole-source award ceilings, FAR/13 CFR citations, `FAR 52.219-14` subcontracting limits, and compliant teaming matrices for **8(a), SDVOSB, VOSB, WOSB/EDWOSB, HUBZone, Small Business, SBA Mentor-Protégé, and Buy Indian Act (ISBEE)**.
- **`define_govcon_term`** — Instant definitions, regulatory key points, and real-world examples for **500+ FAR, DFARS, CMMC, DCAA, and SLED terms**.
- **`get_govcon_playbook`** — Retrieve **12 step-by-step GovCon How-To Playbooks** (SAM.gov registration, Capability Statements, Sources Sought/RFIs, Go/No-Go qualification, RFP proposal writing, wrap-rate pricing, and contractor teaming).
- **`search_govcon_resources`** — Unified omni-search across all 8 GovCon reference libraries.

---

## Option 1: One-Command Auto-Setup (Recommended)

Run this in your terminal to automatically add the Intandem GovCon MCP server to Claude Code, Claude Desktop, Cursor, and Windsurf:

```bash
npx @intandem/govcon-mcp mcp add
```

## Option 2: Zero-Install Remote HTTP MCP Endpoint

Add the remote Streamable HTTP endpoint directly to your MCP client configuration:

```json
{
  "mcpServers": {
    "intandem-govcon": {
      "url": "https://www.getintandem.io/api/mcp"
    }
  }
}
```

## Option 3: Local Stdio via `npx`

For stdio-based MCP clients (Claude Desktop, Cursor, Windsurf):

```json
{
  "mcpServers": {
    "intandem-govcon": {
      "command": "npx",
      "args": ["-y", "@intandem/govcon-mcp"]
    }
  }
}
```

---

## About Intandem

[Intandem](https://www.getintandem.io) scans 100,000+ active federal (SAM.gov), 50-state, and 3,000+ local municipal, county, school district, and utility portals daily—matching solicitations to your NAICS/PSC/NIGP codes and SBA certifications, shredding 100-page RFPs with Tandy AI, and finding compliant SBA teaming partners.

