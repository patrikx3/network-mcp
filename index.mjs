#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

const BASE_URL = process.env.P3X_NETWORK_URL || 'https://network.corifeus.com';

async function request(method, path, body = undefined) {
    const url = `${BASE_URL}${path}`;
    const headers = {
        'Content-Type': 'application/json',
    };
    const options = { method, headers };
    if (body !== undefined) {
        options.body = JSON.stringify(body);
    }
    const res = await fetch(url, options);
    const text = await res.text();
    let json;
    try {
        json = JSON.parse(text);
    } catch {
        throw new Error(`HTTP ${res.status}: ${text}`);
    }
    if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${JSON.stringify(json)}`);
    }
    return json;
}

const server = new McpServer({
    name: 'p3x-network',
    version: '2026.4.1',
    instructions: 'P3X Network MCP — AI-powered network diagnostics for any MCP client. Use network_audit for comprehensive analysis. Use individual tools (dns_lookup, ssl_check, etc.) for targeted queries. All endpoints are public, no authentication required.',
});

// --- AI-powered audit (main tool) ---

server.registerTool('network_audit', {
    title: 'Network Audit',
    description: 'AI-powered comprehensive network analysis. Sends a natural language prompt to the network AI and returns structured analysis with tool results. Use this for broad questions like "audit example.com" or "is example.com secure?".',
    inputSchema: {
        prompt: z.string().describe('Natural language query, e.g. "audit example.com", "check DNS for cloudflare.com", "is patrikx3.com secure?"'),
    },
}, async ({ prompt }) => {
    const result = await request('POST', '/public/ai/network-query', { prompt });
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
});

// --- Individual diagnostic tools ---

server.registerTool('dns_lookup', {
    title: 'DNS Lookup',
    description: 'Query DNS records for a domain. Returns A, AAAA, CNAME, NS, MX, TXT, SOA records.',
    inputSchema: {
        domain: z.string().describe('Domain name to look up (e.g. "example.com")'),
    },
}, async ({ domain }) => {
    const result = await request('GET', `/public/api/dns?domain=${encodeURIComponent(domain)}`);
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
});

server.registerTool('ssl_check', {
    title: 'SSL Certificate Check',
    description: 'Check SSL/TLS certificate details for a domain including issuer, validity dates, and chain info.',
    inputSchema: {
        domain: z.string().describe('Domain name to check (e.g. "example.com")'),
    },
}, async ({ domain }) => {
    const result = await request('GET', `/public/api/ssl-cert?domain=${encodeURIComponent(domain)}`);
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
});

server.registerTool('whois', {
    title: 'WHOIS Lookup',
    description: 'WHOIS lookup for a domain or IP. Returns registrar, registration dates, nameservers, and contact info.',
    inputSchema: {
        query: z.string().describe('Domain or IP to query (e.g. "example.com" or "1.2.3.4")'),
    },
}, async ({ query }) => {
    const result = await request('GET', `/public/api/whois?query=${encodeURIComponent(query)}`);
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
});

server.registerTool('security_headers', {
    title: 'Security Headers Check',
    description: 'Analyze HTTP security headers for a URL. Checks for HSTS, CSP, X-Frame-Options, etc.',
    inputSchema: {
        url: z.string().describe('Full URL to check (e.g. "https://example.com")'),
    },
}, async ({ url }) => {
    const result = await request('GET', `/public/api/security-headers?url=${encodeURIComponent(url)}`);
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
});

server.registerTool('mx_check', {
    title: 'MX Record Check',
    description: 'Check MX (mail exchange) records and mail server configuration for a domain.',
    inputSchema: {
        domain: z.string().describe('Domain name to check (e.g. "example.com")'),
    },
}, async ({ domain }) => {
    const result = await request('GET', `/public/api/mx-check?domain=${encodeURIComponent(domain)}`);
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
});

server.registerTool('email_deliverability', {
    title: 'Email Deliverability',
    description: 'Check email deliverability for a domain including SPF, DKIM, DMARC records.',
    inputSchema: {
        domain: z.string().describe('Domain name to check (e.g. "example.com")'),
    },
}, async ({ domain }) => {
    const result = await request('GET', `/public/api/email-deliverability?domain=${encodeURIComponent(domain)}`);
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
});

server.registerTool('dnsbl', {
    title: 'DNSBL Check',
    description: 'Check if an IP address is listed on DNS-based blacklists (DNSBL/RBL).',
    inputSchema: {
        ip: z.string().describe('IP address to check (e.g. "1.2.3.4")'),
    },
}, async ({ ip }) => {
    const result = await request('GET', `/public/api/dnsbl?ip=${encodeURIComponent(ip)}`);
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
});

server.registerTool('bgp', {
    title: 'BGP Lookup',
    description: 'BGP routing information lookup by IP prefix or ASN.',
    inputSchema: {
        prefix: z.string().optional().describe('IP prefix (e.g. "1.2.3.0/24")'),
        asn: z.string().optional().describe('Autonomous System Number (e.g. "AS13335")'),
    },
}, async ({ prefix, asn }) => {
    const params = new URLSearchParams();
    if (prefix) params.set('prefix', prefix);
    if (asn) params.set('asn', asn);
    const result = await request('GET', `/public/api/bgp?${params.toString()}`);
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
});

server.registerTool('reverse_dns', {
    title: 'Reverse DNS',
    description: 'Reverse DNS (PTR) lookup for an IP address.',
    inputSchema: {
        ip: z.string().describe('IP address to look up (e.g. "1.2.3.4")'),
    },
}, async ({ ip }) => {
    const result = await request('GET', `/public/api/reverse-dns?ip=${encodeURIComponent(ip)}`);
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
});

server.registerTool('http_check', {
    title: 'HTTP Check',
    description: 'Check HTTP response, redirects, status codes, and response headers for a URL.',
    inputSchema: {
        url: z.string().describe('Full URL to check (e.g. "https://example.com")'),
    },
}, async ({ url }) => {
    const result = await request('GET', `/public/api/http-check?url=${encodeURIComponent(url)}`);
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
});

server.registerTool('dns_propagation', {
    title: 'DNS Propagation',
    description: 'Check DNS propagation across multiple global nameservers.',
    inputSchema: {
        domain: z.string().describe('Domain name to check (e.g. "example.com")'),
        type: z.string().optional().describe('DNS record type (e.g. "A", "AAAA", "MX", "CNAME"). Default: "A"'),
    },
}, async ({ domain, type }) => {
    const params = new URLSearchParams({ domain });
    if (type) params.set('type', type);
    const result = await request('GET', `/public/api/dns-propagation?${params.toString()}`);
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
});

server.registerTool('ipv6_check', {
    title: 'IPv6 Check',
    description: 'Check IPv6 support and connectivity for a host.',
    inputSchema: {
        host: z.string().describe('Hostname to check (e.g. "example.com")'),
    },
}, async ({ host }) => {
    const result = await request('GET', `/public/api/ipv6-check?host=${encodeURIComponent(host)}`);
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
});

server.registerTool('geolocation', {
    title: 'IP Geolocation',
    description: 'Get geolocation data for an IP address, or for the server\'s own IP if none provided.',
    inputSchema: {
        ip: z.string().optional().describe('IP address to geolocate. Omit to get the server\'s own IP geolocation.'),
    },
}, async ({ ip }) => {
    const path = ip ? `/public/api/geolocation/${encodeURIComponent(ip)}` : '/public/api/geolocation';
    const result = await request('GET', path);
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
});

server.registerTool('my_ip', {
    title: 'My IP',
    description: 'Get the public IP address of the server running this MCP.',
    inputSchema: {},
}, async () => {
    const result = await request('GET', '/public/api/ip');
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
});

server.registerTool('email_test', {
    title: 'Email Test',
    description: 'Start a live email deliverability test. Sends a test email to the given address — the recipient must reply to it. The reply is analyzed for SPF, DKIM, DMARC authentication, blacklist status, spam score, headers, and message format. Results are automatically sent to the tested email address, so polling with email_test_result is optional. Returns a testId to check results programmatically if needed.',
    inputSchema: {
        email: z.string().describe('Email address to test (e.g. "support@example.com")'),
        language: z.string().optional().describe('Language code for the test and result emails (en, hu, de, fr, es, it, cs, ru, zh, ja). Defaults to en.'),
    },
}, async ({ email, language }) => {
    const result = await request('POST', '/public/api/mail-tester/start', { email, language: language || 'en' });
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
});

server.registerTool('email_test_result', {
    title: 'Email Test Result',
    description: 'Get the result of a previously started email test. Returns the score (0-10), SPF/DKIM/DMARC results, blacklist status, spam score, and AI analysis. Status will be "waiting" until the recipient replies to the test email.',
    inputSchema: {
        testId: z.string().describe('The 32-character hex test ID returned by email_test'),
    },
}, async ({ testId }) => {
    const result = await request('GET', `/public/api/mail-tester/result/${encodeURIComponent(testId)}`);
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
});

const transport = new StdioServerTransport();
await server.connect(transport);
