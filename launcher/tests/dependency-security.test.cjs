const test = require("node:test");
const assert = require("node:assert/strict");
const path = require("node:path");
const { createRequire } = require("node:module");
const { createServer } = require("node:http");
const { once } = require("node:events");

const launcherRequire = createRequire(path.join(__dirname, "..", "package.json"));
const fromPackage = (name) => createRequire(launcherRequire.resolve(name));

test("builder URI serialization refuses authority injection while retaining numeric ports", () => {
  const uri = fromPackage("ajv")("fast-uri");
  for (const port of ["443@evil.invalid", "443/path", "443?query"]) {
    assert.throws(() => uri.serialize({ scheme: "https", host: "trusted.invalid", port }));
  }
  assert.equal(uri.serialize({ scheme: "https", host: "trusted.invalid", port: 8443 }),
    "https://trusted.invalid:8443/");
});

test("indexed source maps reject invalid offsets and retain valid source locations", () => {
  const { SourceMapConsumer } = launcherRequire("source-map-js");
  const section = (line) => ({
    version: 3,
    sections: [{ offset: { line, column: 0 }, map: {
      version: 3, sources: ["input.css"], names: [], mappings: "AAAA",
    } }],
  });
  for (const line of [-0.5, Infinity, "bad"]) {
    assert.throws(() => new SourceMapConsumer(section(line)));
  }
  const consumer = new SourceMapConsumer(section(0));
  const mappings = [];
  consumer.eachMapping((mapping) => mappings.push(mapping));
  assert.deepEqual(mappings.map(({ source, generatedLine, generatedColumn, originalLine, originalColumn }) =>
    ({ source, generatedLine, generatedColumn, originalLine, originalColumn })), [
    { source: "input.css", generatedLine: 1, generatedColumn: 0, originalLine: 1, originalColumn: 0 },
  ]);
});

test("all builder glob major lines keep ordinary brace and glob behavior", () => {
  const asar = fromPackage("@electron/asar");
  const universal = fromPackage("@electron/universal");
  const filelist = fromPackage("filelist");
  const builder = fromPackage("app-builder-lib");
  for (const resolveFrom of [asar, universal, filelist, builder]) {
    const minimatch = resolveFrom("minimatch");
    const match = typeof minimatch === "function" ? minimatch : minimatch.minimatch;
    assert.equal(match("dist/app.js", "dist/*.{js,css}"), true);
    assert.equal(match("dist/app.txt", "dist/*.{js,css}"), false);
    const expand = createRequire(resolveFrom.resolve("minimatch"))("brace-expansion");
    const expandPattern = typeof expand === "function" ? expand : expand.expand;
    assert.deepEqual(expandPattern("asset-{a,b}-{1..2}"),
      ["asset-a-1", "asset-a-2", "asset-b-1", "asset-b-2"]);
  }
});

test("both downloader undici major lines retain bounded retry and local response bodies", async () => {
  const nodeGyp = fromPackage("node-gyp");
  const electronGet = createRequire(launcherRequire.resolve("@electron/get"));
  for (const resolveFrom of [nodeGyp, electronGet]) {
    const { Agent, RetryAgent, EnvHttpProxyAgent, fetch } = resolveFrom("undici");
    assert.equal(typeof EnvHttpProxyAgent, "function");
    let requests = 0;
    const server = createServer((_request, response) => {
      requests += 1;
      response.writeHead(requests === 1 ? 503 : 200, { "retry-after": "0" });
      response.end(requests === 1 ? "retry" : "artifact-control");
    });
    server.listen(0, "127.0.0.1");
    await once(server, "listening");
    const agent = new RetryAgent(new Agent(), { maxRetries: 1, minTimeout: 1, maxTimeout: 5 });
    try {
      const response = await fetch(`http://127.0.0.1:${server.address().port}/artifact`, {
        dispatcher: agent, signal: AbortSignal.timeout(5000),
      });
      assert.equal(response.status, 200);
      assert.equal(await response.text(), "artifact-control");
      assert.equal(requests, 2);
    } finally {
      await agent.close();
      server.closeAllConnections();
      await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
    }
  }
});
