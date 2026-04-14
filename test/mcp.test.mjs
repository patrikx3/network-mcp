import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

const startClient = async () => {
    const transport = new StdioClientTransport({
        command: 'node',
        args: ['index.mjs'],
    });
    const client = new Client({ name: 'test-client', version: '1.0.0' });
    await client.connect(transport);
    return client;
};

describe('P3X Network MCP Server', () => {

    it('should list all tools', async () => {
        const client = await startClient();
        try {
            const { tools } = await client.listTools();
            const names = tools.map(t => t.name);
            assert.ok(names.includes('network_audit'), 'missing network_audit');
            assert.ok(names.includes('dns_lookup'), 'missing dns_lookup');
            assert.ok(names.includes('ssl_check'), 'missing ssl_check');
            assert.ok(names.includes('whois'), 'missing whois');
            assert.ok(names.includes('security_headers'), 'missing security_headers');
            assert.ok(names.includes('mx_check'), 'missing mx_check');
            assert.ok(names.includes('email_deliverability'), 'missing email_deliverability');
            assert.ok(names.includes('dnsbl'), 'missing dnsbl');
            assert.ok(names.includes('bgp'), 'missing bgp');
            assert.ok(names.includes('reverse_dns'), 'missing reverse_dns');
            assert.ok(names.includes('http_check'), 'missing http_check');
            assert.ok(names.includes('dns_propagation'), 'missing dns_propagation');
            assert.ok(names.includes('ipv6_check'), 'missing ipv6_check');
            assert.ok(names.includes('geolocation'), 'missing geolocation');
            assert.ok(names.includes('my_ip'), 'missing my_ip');
            assert.ok(names.includes('email_test'), 'missing email_test');
            assert.ok(names.includes('email_test_result'), 'missing email_test_result');
            assert.equal(names.length, 17, `expected 17 tools, got ${names.length}`);
        } finally {
            await client.close();
        }
    });

    it('should run dns_lookup', async () => {
        const client = await startClient();
        try {
            const result = await client.callTool({ name: 'dns_lookup', arguments: { domain: 'example.com' } });
            assert.ok(result.content.length > 0, 'expected content');
            const text = result.content[0].text;
            const data = JSON.parse(text);
            assert.ok(data, 'expected JSON response');
        } finally {
            await client.close();
        }
    });

    it('should run ssl_check', async () => {
        const client = await startClient();
        try {
            const result = await client.callTool({ name: 'ssl_check', arguments: { domain: 'example.com' } });
            assert.ok(result.content.length > 0, 'expected content');
            const data = JSON.parse(result.content[0].text);
            assert.ok(data, 'expected JSON response');
        } finally {
            await client.close();
        }
    });

    it('should run my_ip', async () => {
        const client = await startClient();
        try {
            const result = await client.callTool({ name: 'my_ip', arguments: {} });
            assert.ok(result.content.length > 0, 'expected content');
            const data = JSON.parse(result.content[0].text);
            assert.ok(data, 'expected JSON response');
        } finally {
            await client.close();
        }
    });

    it('should run whois', async () => {
        const client = await startClient();
        try {
            const result = await client.callTool({ name: 'whois', arguments: { query: 'example.com' } });
            assert.ok(result.content.length > 0, 'expected content');
            const data = JSON.parse(result.content[0].text);
            assert.ok(data, 'expected JSON response');
        } finally {
            await client.close();
        }
    });

});
