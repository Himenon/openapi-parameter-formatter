import { describe, expect, text } from "vitest";
import * as QueryParameter from "../QueryParameter";

describe("QueryParameter - style:form", () => {
  test("explode:true/false value:empty", () => {
    const result1 = QueryParameter.generateByURLSearchParams("color", {
      value: [],
      style: "form",
      explode: false,
    });
    expect(result1?.toString()).toBe("color=");
    const result2 = QueryParameter.generateByURLSearchParams("color", {
      value: [],
      style: "form",
      explode: true,
    });
    expect(result2?.toString()).toBe("color=");
    const result3 = QueryParameter.generateByURLSearchParams("color", {
      value: undefined,
      style: "form",
      explode: false,
    });
    expect(result3?.toString()).toBe("color=");
    const result4 = QueryParameter.generateByURLSearchParams("color", {
      value: undefined,
      style: "form",
      explode: true,
    });
    expect(result4?.toString()).toBe("color=");
  });
  test("explode:true/false value:string", () => {
    const result1 = QueryParameter.generateByURLSearchParams("color", {
      value: "blue",
      style: "form",
      explode: false,
    });
    expect(result1?.toString()).toBe("color=blue");
    const result2 = QueryParameter.generateByURLSearchParams("color", {
      value: "blue",
      style: "form",
      explode: true,
    });
    expect(result2?.toString()).toBe("color=blue");
  });
  test("explode:false value:string[]", () => {
    const result = QueryParameter.generateByURLSearchParams("color", {
      value: ["blue", "black", "brown"],
      style: "form",
      explode: false,
    });
    expect(result?.toString()).toBe("color=blue%2Cblack%2Cbrown");
  });
  test("explode:true value:string[]", () => {
    const result = QueryParameter.generateByURLSearchParams("color", {
      value: ["blue", "black", "brown"],
      style: "form",
      explode: true,
    });
    expect(result?.toString()).toBe("color=blue&color=black&color=brown");
  });
  test("explode:false value:object", () => {
    const result1 = QueryParameter.generateByURLSearchParams("color", {
      value: {
        R: 100,
        G: 200,
        B: 150,
      },
      style: "form",
      explode: false,
    });
    expect(result1?.toString()).toBe("color=R%2C100%2CG%2C200%2CB%2C150");
  });
  test("explode:true value:object", () => {
    const result1 = QueryParameter.generateByURLSearchParams("color", {
      value: {
        R: 100,
        G: 200,
        B: 150,
      },
      style: "form",
      explode: true,
    });
    expect(result1?.toString()).toBe("R=100&G=200&B=150");
  });
});

describe("QueryParameter - style:spaceDelimited", () => {
  test("explode:false value:any[]", () => {
    const result1 = QueryParameter.generateByURLSearchParams("color", {
      value: ["blue", "black", "brown"],
      style: "spaceDelimited",
      explode: false,
    });
    expect(result1?.toString()).toBe("color=blue+black+brown");
  });
  test("explode:false value:object", () => {
    const result1 = QueryParameter.generateByURLSearchParams("color", {
      value: {
        R: 100,
        G: 200,
        B: 150,
      },
      style: "spaceDelimited",
      explode: false,
    });
    expect(result1?.toString()).toBe("color=R+100+G+200+B+150");
  });
});

describe("QueryParameter - style:pipeDelimited", () => {
  test("explode:false value:any[]", () => {
    const result1 = QueryParameter.generateByURLSearchParams("color", {
      value: ["blue", "black", "brown"],
      style: "pipeDelimited",
      explode: false,
    });
    expect(result1?.toString()).toBe("color=blue%7Cblack%7Cbrown");
  });
  test("explode:false value:object", () => {
    const result1 = QueryParameter.generateByURLSearchParams("color", {
      value: {
        R: 100,
        G: 200,
        B: 150,
      },
      style: "pipeDelimited",
      explode: false,
    });
    expect(result1?.toString()).toBe("color=R%7C100%7CG%7C200%7CB%7C150");
  });
});

describe("QueryParameter - style:deepObject", () => {
  test("explode:true value:object", () => {
    const result1 = QueryParameter.generateByURLSearchParams("color", {
      value: {
        R: 100,
        G: 200,
        B: 150,
      },
      style: "deepObject",
      explode: true,
    });
    expect(result1?.toString()).toBe("color%5BR%5D=100&color%5BG%5D=200&color%5BB%5D=150");
  });
});

describe("QueryParameter - style:undefined", () => {
  test("invalid style", () => {
    const result1 = QueryParameter.generateByURLSearchParams("color", {
      value: {
        R: 100,
        G: 200,
        B: 150,
      },
      style: "invalid" as any,
      explode: true,
    });
    expect(result1?.toString()).toBeUndefined();
  });
});
