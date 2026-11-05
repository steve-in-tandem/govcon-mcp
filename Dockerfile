FROM node:20-alpine

LABEL org.opencontainers.image.title="Intandem US Government Contracting & SLED Reference MCP Server"
LABEL org.opencontainers.image.description="Official Model Context Protocol (MCP) Server for 351 NAICS codes, 165 PSC codes, 136 NIGP codes, 50 State & 250+ City portals, 8 SBA set-asides, and 500+ FAR/DFARS terms."
LABEL org.opencontainers.image.url="https://www.getintandem.io/government-contracting-resources"
LABEL org.opencontainers.image.documentation="https://www.getintandem.io/about/steve-salstrand"
LABEL org.opencontainers.image.source="https://github.com/steve-in-tandem/govcon-mcp"
LABEL org.opencontainers.image.authors="Steve Salstrand (Stephen Salstrand) <https://www.getintandem.io/about/steve-salstrand>"
LABEL org.opencontainers.image.vendor="InTandem LLC (https://www.getintandem.io)"
LABEL org.opencontainers.image.licenses="MIT"

WORKDIR /app

COPY package.json index.mjs core.gz README.md LICENSE ./

CMD ["node", "index.mjs"]


