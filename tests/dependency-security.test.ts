import { expect, test } from "bun:test";
import { createRequire } from "node:module";

// Exercise the resolved transitive packages used by Ajv and the bundled SDK.
// This checks dependency behavior; it does not assert an application exploit.
const require = createRequire(import.meta.url);
const uri = require("fast-uri");
const { Address4, Address6 } = require("ip-address");

test("URI serialization rejects an authority injected through the port", () => {
  for (const port of ["443@evil.invalid", "443/path", "443?query"]) {
    expect(() => uri.serialize({ scheme: "https", host: "trusted.invalid", port })).toThrow();
  }
  expect(uri.serialize({ scheme: "https", host: "trusted.invalid", port: 8443 }))
    .toBe("https://trusted.invalid:8443/");
});

test("IPv6 link-local classification covers the entire fe80::/10 range", () => {
  for (const value of ["fe80::1", "fea0::1", "febf::1"]) {
    expect(new Address6(value).isLinkLocal()).toBe(true);
  }
  expect(new Address6("fec0::1").isLinkLocal()).toBe(false);
  expect(new Address6("2001:db8::1").isLinkLocal()).toBe(false);
});

test("subnet membership cannot match across IPv4 and IPv6 families", () => {
  const v4 = new Address4("192.0.2.1");
  const v6 = new Address6("2001:db8::1");
  for (const method of ["isInSubnet", "isHostInSubnet"]) {
    expect(v4[method](new Address6("::/0"))).toBe(false);
    expect(v6[method](new Address4("0.0.0.0/0"))).toBe(false);
    expect(v4[method](new Address4("192.0.2.0/24"))).toBe(true);
    expect(v6[method](new Address6("2001:db8::/32"))).toBe(true);
  }
});
