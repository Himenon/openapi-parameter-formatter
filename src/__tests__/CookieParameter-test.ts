import * as CookieParameter from "../CookieParameter";

describe("CookieParameter - style:form", () => {
  test("explode:true/false value:empty", () => {
    const result1 = CookieParameter.generate("color", {
      value: [],
      style: "form",
      explode: false,
    });
    expect(result1).toBe("color=");
    const result2 = CookieParameter.generate("color", {
      value: [],
      style: "form",
      explode: true,
    });
    expect(result2).toBe("color=");
    const result3 = CookieParameter.generate("color", {
      value: undefined,
      style: "form",
      explode: false,
    });
    expect(result3).toBe("color=");
    const result4 = CookieParameter.generate("color", {
      value: undefined,
      style: "form",
      explode: true,
    });
    expect(result4).toBe("color=");
  });
  test("explode:true/false value:string", () => {
    const result1 = CookieParameter.generate("color", {
      value: "blue",
      style: "form",
      explode: false,
    });
    expect(result1).toBe("color=blue");
    const result2 = CookieParameter.generate("color", {
      value: "blue",
      style: "form",
      explode: true,
    });
    expect(result2).toBe("color=blue");
  });
  test("explode:false value:string[]", () => {
    const result = CookieParameter.generate("color", {
      value: ["blue", "black", "brown"],
      style: "form",
      explode: false,
    });
    expect(result).toBe("color=blue,black,brown");
  });
  test("explode:true value:string[]", () => {
    const result = CookieParameter.generate("color", {
      value: ["blue", "black", "brown"],
      style: "form",
      explode: true,
    });
    expect(result).toBe("color=blue&color=black&color=brown");
  });
  test("explode:false value:object", () => {
    const result1 = CookieParameter.generate("color", {
      value: {
        R: 100,
        G: 200,
        B: 150,
      },
      style: "form",
      explode: false,
    });
    expect(result1).toBe("color=R,100,G,200,B,150");
  });
  test("explode:true value:object", () => {
    const result1 = CookieParameter.generate("color", {
      value: {
        R: 100,
        G: 200,
        B: 150,
      },
      style: "form",
      explode: true,
    });
    expect(result1).toBe("R=100&G=200&B=150");
  });
});
