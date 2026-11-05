# `@intandem/govcon-mcp` — Government Contracting & FAR Reference MCP Server

[![mcptry](https://mcptry.com/badge/io.github.steve-in-tandem/govcon-mcp)](https://mcptry.com/servers/io.github.steve-in-tandem/govcon-mcp) [![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.23989928.svg)](https://doi.org/10.5281/zenodo.23989928)

Official **Model Context Protocol (MCP)** server powered by the [Intandem Government Contracting Resource Center](https://www.getintandem.io/government-contracting-resources).

Gives Claude, Cursor, ChatGPT, Windsurf, VS Code, Antigravity, and custom AI agents instant, deterministic access to **1,460+ verified public-sector contracting references** (2026 FAR, DFARS, 13 CFR, SBA, and 50-State SLED):

- **`lookup_commodity_codes`** — Lookup & cross-walk [**351 NAICS codes**](https://www.getintandem.io/naics), [**165 Federal PSC codes**](https://www.getintandem.io/psc), and [**136 State/Municipal NIGP codes**](https://www.getintandem.io/nigp) with SBA size standards, agency spend shares, and automatic Federal ↔ SLED code cross-walks.
- **`find_procurement_portals`** — Retrieve official vendor registration links, commodity code systems, fees, and local municipal blind spots across [**all 50 U.S. State eProcurement portals & 250+ City/Municipal portals**](https://www.getintandem.io/procurement-portals).
- **`check_set_aside_program`** — Inspect 2026 sole-source award ceilings, FAR/13 CFR citations, `FAR 52.219-14` subcontracting limits, and compliant teaming matrices across [**8 SBA Socioeconomic Set-Aside Programs**](https://www.getintandem.io/set-asides) (**8(a), SDVOSB, VOSB, WOSB/EDWOSB, HUBZone, Small Business, SBA Mentor-Protégé, and Buy Indian Act / ISBEE**).
- **`define_govcon_term`** — Instant definitions, regulatory key points, and real-world examples from the [**500+ Term GovCon & FAR Glossary**](https://www.getintandem.io/glossary).
- **`get_govcon_playbook`** — Retrieve [**12 Step-by-Step GovCon Capture & FAR Playbooks**](https://www.getintandem.io/guides) (SAM.gov registration, Capability Statements, Sources Sought/RFIs, Go/No-Go qualification, RFP proposal writing, wrap-rate pricing, and contractor teaming).
- **`search_govcon_resources`** — Unified omni-search across all 8 GovCon reference libraries and [**5 Free Interactive GovCon Calculators & Tools**](https://www.getintandem.io/tools).

---

## Option 1: One-Command Auto-Setup (Recommended)

Run this in your terminal to automatically add the Intandem GovCon MCP server to Claude Code, Claude Desktop, Cursor, Windsurf, and Antigravity:

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

For stdio-based MCP clients (Claude Desktop, Cursor, Windsurf, VS Code):

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

## Direct Web Reference Directories

Every tool response includes canonical verification links back to the underlying statutory reference pages:

- [Government Contracting Resource Center Hub](https://www.getintandem.io/government-contracting-resources)
- [Interactive GovCon Tools & Calculators](https://www.getintandem.io/tools) ([AI Capability Statement Writer](https://www.getintandem.io/tools/capabilities-statement-writer), [Smart NAICS Code Finder](https://www.getintandem.io/tools/naics-finder), [RFP Go/No-Go Bid Scorecard](https://www.getintandem.io/tools/go-no-go-calculator), [SBA Set-Aside & Sole-Source Checker](https://www.getintandem.io/tools/set-aside-eligibility-checker), [2026 FAR Acquisition Threshold Calculator](https://www.getintandem.io/tools/far-threshold-calculator))
- [50-State & 250+ City Procurement Portal Directory](https://www.getintandem.io/procurement-portals)
- [SBA Socioeconomic Set-Aside Hubs](https://www.getintandem.io/set-asides)
- [Federal NAICS Code Directory (351 Codes)](https://www.getintandem.io/naics)
- [Federal Product & Service Code (PSC) Directory (165 Codes)](https://www.getintandem.io/psc)
- [State & Local NIGP Commodity Code Directory (136 Codes)](https://www.getintandem.io/nigp)
- [Step-by-Step Government Contracting Playbooks](https://www.getintandem.io/guides)
- [Government Contracting & FAR Glossary (500+ Terms)](https://www.getintandem.io/glossary)

---

## About Intandem & Author

[Intandem](https://www.getintandem.io) ([About Intandem](https://www.getintandem.io/about)) scans 100,000+ active federal ([SAM.gov](https://www.getintandem.io/contract-intelligence)), 50-state, and 3,000+ local municipal, county, school district, and utility portals daily—matching solicitations to your NAICS/PSC/NIGP codes and SBA certifications, shredding 100-page RFPs with [Tandy AI](https://www.getintandem.io/tandy) inside the [Bid Workspace](https://www.getintandem.io/bid-workspace), and finding compliant SBA [Teaming Partners](https://www.getintandem.io/teaming).

### Author & Systems Architecture

Architected and maintained by [**Steve Salstrand (Stephen Salstrand)** — Founder & Principal Systems Architect of InTandem](https://www.getintandem.io/about/steve-salstrand) (CAGE: `21QN8`, San Antonio, Texas).

- **Executive Biography & Systems Architecture Profile**: [https://www.getintandem.io/about/steve-salstrand](https://www.getintandem.io/about/steve-salstrand)
- **About InTandem LLC**: [https://www.getintandem.io/about](https://www.getintandem.io/about)
- **CERN Zenodo DOI Record**: [https://zenodo.org/records/23989928](https://zenodo.org/records/23989928) (`10.5281/zenodo.23989928`)
- **Hugging Face Dataset**: [US GovCon NAICS/PSC/NIGP/SLED Dataset (2026)](https://huggingface.co/datasets/InTandem-Steve/us-govcon-naics-psc-nigp-sled-2026)
- **PyPI Python SDK**: [intandem-govcon](https://pypi.org/project/intandem-govcon/)
- **LinkedIn**: [Stephen Salstrand](https://www.linkedin.com/in/stephensalstrand/)
- **Hugging Face**: [InTandem-Steve (Steve Salstrand)](https://huggingface.co/InTandem-Steve)

### Citation (BibTeX)

```bibtex
@software{salstrand2026intandem_govcon_mcp,
  author       = {Salstrand, Steve (Stephen Salstrand)},
  title        = {{Intandem Government Contracting & FAR Reference MCP Server (@intandem/govcon-mcp)}},
  year         = {2026},
  publisher    = {Zenodo / InTandem LLC},
  doi          = {10.5281/zenodo.23989928},
  url          = {https://doi.org/10.5281/zenodo.23989928},
  note         = {Author profile: https://www.getintandem.io/about/steve-salstrand}
}
```
