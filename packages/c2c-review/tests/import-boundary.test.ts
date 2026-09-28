import childProcess from "node:child_process";
import fs from "node:fs";
import fsPromises from "node:fs/promises";
import net from "node:net";
import tls from "node:tls";
import ts from "typescript";
import { afterEach, describe, expect, it, vi } from "vitest";

afterEach(() => {
  vi.restoreAllMocks();
});

function hasExportModifier(node: ts.Node): boolean {
  return (
    ts.canHaveModifiers(node) &&
    (ts.getModifiers(node)?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword) ?? false)
  );
}

function isPureValue(expression: ts.Expression): boolean {
  if (
    ts.isStringLiteral(expression) ||
    ts.isNoSubstitutionTemplateLiteral(expression) ||
    ts.isNumericLiteral(expression) ||
    expression.kind === ts.SyntaxKind.TrueKeyword ||
    expression.kind === ts.SyntaxKind.FalseKeyword
  ) {
    return true;
  }

  if (ts.isObjectLiteralExpression(expression)) {
    return expression.properties.every(
      (property) =>
        ts.isPropertyAssignment(property) &&
        !ts.isComputedPropertyName(property.name) &&
        isPureValue(property.initializer),
    );
  }

  if (
    ts.isCallExpression(expression) &&
    ts.isPropertyAccessExpression(expression.expression) &&
    ts.isIdentifier(expression.expression.expression) &&
    expression.expression.expression.text === "Object" &&
    expression.expression.name.text === "freeze" &&
    expression.arguments.length === 1
  ) {
    return isPureValue(expression.arguments[0]!);
  }

  return false;
}

describe("c2c-review import boundary", () => {
  it("exports only inert identity/provenance/contract values and starts no observed side effect", async () => {
    const source = ts.createSourceFile(
      "src/index.ts",
      await fsPromises.readFile(new URL("../src/index.ts", import.meta.url), "utf8"),
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TS,
    );

    expect(source.parseDiagnostics).toEqual([]);
    for (const statement of source.statements) {
      expect(hasExportModifier(statement), "every top-level declaration must be exported").toBe(true);

      if (ts.isVariableStatement(statement)) {
        expect(statement.declarationList.flags & ts.NodeFlags.Const).not.toBe(0);
        for (const declaration of statement.declarationList.declarations) {
          expect(ts.isIdentifier(declaration.name)).toBe(true);
          expect(declaration.initializer).toBeDefined();
          expect(isPureValue(declaration.initializer!)).toBe(true);
        }
        continue;
      }

      expect(ts.isTypeAliasDeclaration(statement) || ts.isInterfaceDeclaration(statement)).toBe(true);
    }

    const sideEffectSpies = [
      vi.spyOn(childProcess, "spawn"),
      vi.spyOn(childProcess, "fork"),
      vi.spyOn(childProcess, "exec"),
      vi.spyOn(childProcess, "execFile"),
      vi.spyOn(fs, "writeFileSync"),
      vi.spyOn(fs, "appendFileSync"),
      vi.spyOn(fs, "mkdirSync"),
      vi.spyOn(fs, "renameSync"),
      vi.spyOn(fs, "unlinkSync"),
      vi.spyOn(fs, "createWriteStream"),
      vi.spyOn(fsPromises, "writeFile"),
      vi.spyOn(fsPromises, "appendFile"),
      vi.spyOn(fsPromises, "mkdir"),
      vi.spyOn(fsPromises, "rename"),
      vi.spyOn(fsPromises, "unlink"),
      vi.spyOn(net.Server.prototype, "listen"),
      vi.spyOn(net.Socket.prototype, "connect"),
      vi.spyOn(tls, "connect"),
      vi.spyOn(globalThis, "fetch"),
      vi.spyOn(globalThis, "setTimeout"),
      vi.spyOn(globalThis, "setInterval"),
    ];
    const before = {
      cwd: process.cwd(),
      env: { ...process.env },
      exitCode: process.exitCode,
    };

    const entry = await import("../src/index.js");

    expect(entry.C2C_REVIEW_PACKAGE_NAME).toBe("@codex-chatgpt-web/c2c-review");
    expect(entry.C2C_REVIEW_PACKAGE_VERSION).toBe("0.1.3");
    expect(entry.C2C_REVIEW_SOURCE).toEqual({
      repository: "Shota-Zaki/codex-with-chatgpt",
      commit: "89af4fa34952fe58e017b095ae2f793420cf05b0",
    });
    expect(entry.C2C_REVIEW_PACKAGE_CONTRACT).toEqual({
      name: "@codex-chatgpt-web/c2c-review",
      version: "0.1.3",
      role: "independent-review-package",
      implementationStatus: "inert-skeleton",
      source: entry.C2C_REVIEW_SOURCE,
    });
    expect(Object.isFrozen(entry.C2C_REVIEW_SOURCE)).toBe(true);
    expect(Object.isFrozen(entry.C2C_REVIEW_PACKAGE_CONTRACT)).toBe(true);

    expect(sideEffectSpies.every((spy) => spy.mock.calls.length === 0)).toBe(true);
    expect(process.cwd()).toBe(before.cwd);
    expect(process.env).toEqual(before.env);
    expect(process.exitCode).toBe(before.exitCode);
  });
});
