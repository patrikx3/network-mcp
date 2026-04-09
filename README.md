[//]: #@corifeus-header

  [![NPM](https://img.shields.io/npm/v/network-mcp.svg)](https://www.npmjs.com/package/network-mcp)  [![Donate for PatrikX3 / P3X](https://img.shields.io/badge/Donate-PatrikX3-003087.svg)](https://paypal.me/patrikx3) [![Contact Corifeus / P3X](https://img.shields.io/badge/Contact-P3X-ff9900.svg)](https://www.patrikx3.com/en/front/contact) [![Corifeus @ Facebook](https://img.shields.io/badge/Facebook-Corifeus-3b5998.svg)](https://www.facebook.com/corifeus.software)  [![Uptime ratio (90 days)](https://network.corifeus.com/public/api/uptime-shield/31ad7a5c194347c33e5445dbaf8.svg)](https://network.corifeus.com/status/31ad7a5c194347c33e5445dbaf8)





# 🌐 P3X Network MCP: AI-powered network analysis MCP server v2026.4.100


  
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

# 🌐 P3X Network MCP

AI-powered network analysis MCP (Model Context Protocol) server. Works with any MCP-compatible client.

Wraps the [network.corifeus.com](https://network.corifeus.com) API to provide network diagnostics directly from your AI assistant.

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

## Usage Examples

```
"audit example.com"
"check DNS for cloudflare.com"
"is patrikx3.com secure?"
"whois google.com"
"check email deliverability for example.com"
```

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

## 🚀 Quick and Affordable Web Development Services

If you want to quickly and affordably develop your next digital project, visit [corifeus.eu](https://corifeus.eu) for expert solutions tailored to your needs.

---

## 🌐 Powerful Online Networking Tool  

Discover the powerful and free online networking tool at [network.corifeus.com](https://network.corifeus.com).  

**🆓 Free**  
Designed for professionals and enthusiasts, this tool provides essential features for network analysis, troubleshooting, and management.  
Additionally, it offers tools for:  
- 📡 Monitoring TCP, HTTP, and Ping to ensure optimal network performance and reliability.  
- 📊 Status page management to track uptime, performance, and incidents in real time with customizable dashboards.  

All these features are completely free to use.  

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

---


[**P3X-NETWORK-MCP**](https://corifeus.com/network-mcp) Build v2026.4.100

 [![NPM](https://img.shields.io/npm/v/network-mcp.svg)](https://www.npmjs.com/package/network-mcp)  [![Donate for PatrikX3 / P3X](https://img.shields.io/badge/Donate-PatrikX3-003087.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=QZVM4V6HVZJW6)  [![Contact Corifeus / P3X](https://img.shields.io/badge/Contact-P3X-ff9900.svg)](https://www.patrikx3.com/en/front/contact) [![Like Corifeus @ Facebook](https://img.shields.io/badge/LIKE-Corifeus-3b5998.svg)](https://www.facebook.com/corifeus.software)





[//]: #@corifeus-footer:end
