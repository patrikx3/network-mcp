[//]: #@corifeus-header

  [![NPM](https://img.shields.io/npm/v/p3x-network-mcp.svg)](https://www.npmjs.com/package/p3x-network-mcp)  [![Donate for PatrikX3 / P3X](https://img.shields.io/badge/Donate-PatrikX3-003087.svg)](https://paypal.me/patrikx3) [![Contact Corifeus / P3X](https://img.shields.io/badge/Contact-P3X-ff9900.svg)](https://www.patrikx3.com/en/front/contact) [![Corifeus @ Facebook](https://img.shields.io/badge/Facebook-Corifeus-3b5998.svg)](https://www.facebook.com/corifeus.software)  [![Uptime ratio (90 days)](https://network.corifeus.com/public/api/uptime-shield/31ad7a5c194347c33e5445dbaf8.svg)](https://network.corifeus.com/status/31ad7a5c194347c33e5445dbaf8)





# 🔍 P3X Network MCP — Model Context Protocol server exposing 17 DNS, SSL, WHOIS, email deliverability, and security tools to any MCP client v2026.4.117


  
🌌 **Bugs are evident™ - MATRIX️**  
🚧 **This project is under active development!**  
📢 **We welcome your feedback and contributions.**  
    



### NodeJS LTS is supported

### 🛠️ Built on NodeJs version

```txt
v24.14.1
```





# 📝 Description

                        
[//]: #@corifeus-header:end

A Model Context Protocol (MCP) server that exposes the [network.corifeus.com](https://network.corifeus.com) diagnostics suite — DNS, SSL, WHOIS, email deliverability, BGP, security headers, and more — directly inside any MCP-compatible AI assistant (Claude Code, Codex, Cursor, and others).

Ask in plain language: *"audit example.com"*, *"why do my emails land in spam?"*, *"check DNS propagation for patrikx3.com"* — and the assistant calls the right tool for you.

## Features

- **17 tools** — audits, DNS, SSL, WHOIS, HTTP, email deliverability, blacklist lookups, BGP, geolocation, IPv6
- **Zero config** — runs over stdio with `npx`, no account, no API key
- **AI-powered audit** — `network_audit` returns a single combined health report
- **Live email test** — end-to-end SPF/DKIM/DMARC verification with spam score and AI-generated fix suggestions
- **Works with every MCP client** — Claude Code, Codex, Cursor, Continue, or any custom host

## Install

### Claude Code

```bash
claude mcp add p3x-network -- npx p3x-network-mcp
```

Or with a global install:

```bash
npm install -g p3x-network-mcp
claude mcp add p3x-network -- p3x-network-mcp
```

### Codex

Add to your MCP config (`~/.codex/config.json` or project-level):

```json
{
  "mcpServers": {
    "p3x-network": {
      "command": "npx",
      "args": ["p3x-network-mcp"]
    }
  }
}
```

### Generic MCP client

Any MCP-compatible client can use this server via stdio transport:

```bash
npx p3x-network-mcp
```

## Available Tools

| Tool | Description |
|------|-------------|
| `network_audit` | AI-powered comprehensive network analysis |
| `dns_lookup` | Query DNS records (A, AAAA, CNAME, NS, MX, TXT, SOA) |
| `ssl_check` | SSL/TLS certificate details |
| `whois` | WHOIS lookup for domains and IPs |
| `security_headers` | HTTP security headers analysis (HSTS, CSP, etc.) |
| `mx_check` | MX record and mail server check |
| `email_deliverability` | SPF, DKIM, DMARC validation |
| `dnsbl` | DNS blacklist check for IPs |
| `bgp` | BGP routing info by prefix or ASN |
| `reverse_dns` | PTR record lookup |
| `http_check` | HTTP response, redirects, status codes |
| `dns_propagation` | Global DNS propagation check |
| `ipv6_check` | IPv6 support verification |
| `geolocation` | IP geolocation data |
| `my_ip` | Server public IP address |
| `email_test` | Start a live email deliverability test (SPF, DKIM, DMARC, spam score, AI analysis). Results are sent by email automatically. |
| `email_test_result` | Get the result of a previously started email test (optional — results are also emailed) |

## Usage Examples

```
"audit example.com"
"check DNS for cloudflare.com"
"is patrikx3.com secure?"
"whois google.com"
"check email deliverability for example.com"
"test email support@example.com"
```

### Email Test Flow

The `email_test` tool performs a live end-to-end email deliverability test:

1. Call `email_test` with an email address (e.g. `support@example.com`) and optional `language` code
2. The system sends a test email to that address
3. The recipient replies to the test email
4. **Results are automatically sent by email** — no polling required! The result email includes:
   - Score (0-10)
   - SPF, DKIM, DMARC authentication results
   - Individual blacklist status for all 23 checked lists
   - Spam score
   - Message format and header analysis
   - AI-powered recommendations in the selected language
5. Optionally, call `email_test_result` with the returned `testId` to get results programmatically

Supported languages: `en`, `hu`, `de`, `fr`, `es`, `it`, `cs`, `ru`, `zh`, `ja`

This goes beyond passive DNS checks (`email_deliverability`) by verifying that email authentication actually works in practice on a real delivered message.

## Configuration

| Environment Variable | Default | Description |
|---------------------|---------|-------------|
| `P3X_NETWORK_URL` | `https://network.corifeus.com` | Base URL for the network API |

## License

MIT

## Homepage

https://network.corifeus.com

[//]: #@corifeus-footer

---

# 🌐 Meet Assistant SaaS — meeting.corifeus.com

Don't want to install anything? Try the **hosted version** at **[meeting.corifeus.com](https://meeting.corifeus.com)** — full meeting workflow built for European businesses, no setup, no API key, no command line.

What the hosted version offers:

- **21-language live translation** during the meeting
- **AI summaries, action items, decisions, attendees, key quotes** auto-generated after every meeting
- **Custom vocabulary** — your client / company / industry terms corrected automatically (Pro+ tier)
- **Searchable meeting library** — find any decision or promise across all your past meetings
- **Shareable read-only links** — send a clean meeting summary to a client or teammate, no signup needed on their end
- **One-click email summary** after each meeting
- **Premium engine on every plan** — no downgraded model, ever
- **EU billing** — Stripe Tax + VAT-compliant + EUR-priced (Solo €19.99 / Pro €39.99 / Business €99.99 per month, no lock-in)
- **GDPR-compliant by default** — browser-language auto-detection, no tracking cookies, your meetings stored encrypted

Try the live demo (1 minute free, no signup) or browse the **public sample meeting** at [meeting.corifeus.com/sample](https://meeting.corifeus.com/sample).

---

# Corifeus Network

AI-powered network & email toolkit — free, no signup.

**Web** · [network.corifeus.com](https://network.corifeus.com)  **MCP** · [`npm i -g p3x-network-mcp`](https://www.npmjs.com/package/p3x-network-mcp)

- **AI Network Assistant** — ask in plain language, get a full domain health report
- **Network Audit** — DNS, SSL, security headers, DNSBL, BGP, IPv6, geolocation in one call
- **Diagnostics** — DNS lookup & global propagation, WHOIS, reverse DNS, HTTP check, my-IP
- **Mail Tester** — live SPF/DKIM/DMARC + spam score + AI fix suggestions, results emailed (localized)
- **Monitoring** — TCP / HTTP / Ping with alerts and public status pages
- **MCP server** — 17 tools exposed to Claude Code, Codex, Cursor, any MCP client
- **Install** — `claude mcp add p3x-network -- npx p3x-network-mcp`
- **Try** — *"audit example.com"*, *"why do my emails land in spam? test me@example.com"*
- **Source** — [patrikx3/network](https://github.com/patrikx3/network) · [patrikx3/network-mcp](https://github.com/patrikx3/network-mcp)
- **Contact** — [patrikx3.com](https://www.patrikx3.com/en/front/contact) · [donate](https://paypal.me/patrikx3)

---

## ❤️ Support Our Open-Source Project  
If you appreciate our work, consider ⭐ starring this repository or 💰 making a donation to support server maintenance and ongoing development. Your support means the world to us—thank you!  

---

### 🌍 About My Domains  
All my domains, including [patrikx3.com](https://patrikx3.com), [corifeus.eu](https://corifeus.eu), and [corifeus.com](https://corifeus.com), are developed in my spare time. While you may encounter minor errors, the sites are generally stable and fully functional.  

---

### 📈 Versioning Policy  
**Version Structure:** We follow a **Major.Minor.Patch** versioning scheme:  
- **Major:** 📅 Corresponds to the current year.  
- **Minor:** 🌓 Set as 4 for releases from January to June, and 10 for July to December.  
- **Patch:** 🔧 Incremental, updated with each build.  

**🚨 Important Changes:** Any breaking changes are prominently noted in the readme to keep you informed.


[**P3X-NETWORK-MCP**](https://corifeus.com/network-mcp) Build v2026.4.117

 [![NPM](https://img.shields.io/npm/v/p3x-network-mcp.svg)](https://www.npmjs.com/package/p3x-network-mcp)  [![Donate for PatrikX3 / P3X](https://img.shields.io/badge/Donate-PatrikX3-003087.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=QZVM4V6HVZJW6)  [![Contact Corifeus / P3X](https://img.shields.io/badge/Contact-P3X-ff9900.svg)](https://www.patrikx3.com/en/front/contact) [![Like Corifeus @ Facebook](https://img.shields.io/badge/LIKE-Corifeus-3b5998.svg)](https://www.facebook.com/corifeus.software)





[//]: #@corifeus-footer:end
