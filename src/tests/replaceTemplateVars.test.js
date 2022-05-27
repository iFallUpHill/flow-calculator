import { replaceTemplateVars } from "../utils/replaceTemplateVars";

describe("replaceTemplateVars", () => {
  it("correctly evaluates mathematical expressions", () => {
    expect(replaceTemplateVars("${5 + 6 - 3}")).toBe("8");
  });

  it("correctly substitutes properties from a configuration object", () => {
    expect(replaceTemplateVars("${var}", { var: 5 })).toBe("5");
  });

  it("respects order of operations", () => {
    expect(replaceTemplateVars("${5 + 4 *(var-3)}", { var: 5 })).toBe("13");
  });

  it("handles absolute values", () => {
    expect(replaceTemplateVars("${Math.abs(-1)}")).toBe("1");
  });

  it("can parse more complicated expressions", () => {
    const string =
      "output.push(G0 X${bedWidth - Math.abs(bedMargin)} Y${maxBedLength - Math.abs(bedMargin)} ; Move to Corner);";
    const config = {
      bedWidth: 250,
      bedMargin: 5,
      maxBedLength: 210,
    };

    expect(replaceTemplateVars(string, config)).toBe(
      "output.push(G0 X245 Y205 ; Move to Corner);"
    );
  });

  describe("throws errors when", () => {
    it("an expression has an empty pair of parentheses", () => {
      expect(() => replaceTemplateVars("${()}")).toThrow();
    });

    it("an expression has an invalid binary operation", () => {
      expect(() => replaceTemplateVars("${*5}")).toThrow();
    });

    it("an expression has a non-numeric token which is not a config option", () => {
      expect(() =>
        replaceTemplateVars("${one + two}", { one: 1 })
      ).toThrowError(/two/);
    });
  });
});
