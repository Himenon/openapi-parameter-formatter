import * as HeaderParameter from "../HeaderParameter";

describe("HeaderParameter - style:simple", () => {
  test("explode:true/false value:array", () => {
    const result1 = HeaderParameter.generate("color", {
      value: ["blue", "black", "brown"],
      style: "simple",
      explode: false,
    });
    expect(result1).toBe("blue,black,brown");
    const result2 = HeaderParameter.generate("color", {
      value: ["blue", "black", "brown"],
      style: "simple",
      explode: true,
    });
    expect(result2).toBe("blue,black,brown");
  });
  test("explode:true/false value:not-array", () => {
    const result1 = HeaderParameter.generate("color", {
      value: {} as any,
      style: "simple",
      explode: false,
    });
    expect(result1).toBe(undefined);
    const result2 = HeaderParameter.generate("color", {
      value: "hoge" as any,
      style: "simple",
      explode: true,
    });
    expect(result2).toBe(undefined);
  });
});
