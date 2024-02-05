import { describe, expect, test } from "vitest";
import * as QueryParameter from "../QueryParameter";

describe("QueryParameter - style:form", () => {
  test("explode:true/false value:empty", () => {
    const result1 = QueryParameter.generate("color", {
      value: [],
      style: "form",
      explode: false,
    });
    expect(result1).toBe("color=");
    const result2 = QueryParameter.generate("color", {
      value: [],
      style: "form",
      explode: true,
    });
    expect(result2).toBe("color=");
    const result3 = QueryParameter.generate("color", {
      value: undefined,
      style: "form",
      explode: false,
    });
    expect(result3).toBe("color=");
    const result4 = QueryParameter.generate("color", {
      value: undefined,
      style: "form",
      explode: true,
    });
    expect(result4).toBe("color=");
  });
  test("explode:true/false value:string", () => {
    const result1 = QueryParameter.generate("color", {
      value: "blue",
      style: "form",
      explode: false,
    });
    expect(result1).toBe("color=blue");
    const result2 = QueryParameter.generate("color", {
      value: "blue",
      style: "form",
      explode: true,
    });
    expect(result2).toBe("color=blue");
  });
  test("explode:false value:string[]", () => {
    const result = QueryParameter.generate("color", {
      value: ["blue", "black", "brown"],
      style: "form",
      explode: false,
    });
    expect(result).toBe("color=blue%2Cblack%2Cbrown");
  });
  test("explode:true value:string[]", () => {
    const result = QueryParameter.generate("color", {
      value: ["blue", "black", "brown"],
      style: "form",
      explode: true,
    });
    expect(result).toBe("color=blue&color=black&color=brown");
  });
  test("explode:false value:object", () => {
    const result1 = QueryParameter.generate("color", {
      value: {
        R: 100,
        G: 200,
        B: 150,
      },
      style: "form",
      explode: false,
    });
    expect(result1).toBe("color=R%2C100%2CG%2C200%2CB%2C150");
  });
  test("explode:true value:object", () => {
    const result1 = QueryParameter.generate("color", {
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

describe("QueryParameter - style:spaceDelimited", () => {
  test("explode:false value:any[]", () => {
    const result1 = QueryParameter.generate("color", {
      value: ["blue", "black", "brown"],
      style: "spaceDelimited",
      explode: false,
    });
    expect(result1).toBe("color=blue%20black%20brown");
  });
  test("explode:false value:object", () => {
    const result1 = QueryParameter.generate("color", {
      value: {
        R: 100,
        G: 200,
        B: 150,
      },
      style: "spaceDelimited",
      explode: false,
    });
    expect(result1).toBe("color=R%20100%20G%20200%20B%20150");
  });
});

describe("QueryParameter - style:pipeDelimited", () => {
  test("explode:false value:any[]", () => {
    const result1 = QueryParameter.generate("color", {
      value: ["blue", "black", "brown"],
      style: "pipeDelimited",
      explode: false,
    });
    expect(result1).toBe("color=blue%7Cblack%7Cbrown");
  });
  test("explode:false value:object", () => {
    const result1 = QueryParameter.generate("color", {
      value: {
        R: 100,
        G: 200,
        B: 150,
      },
      style: "pipeDelimited",
      explode: false,
    });
    expect(result1).toBe("color=R%7C100%7CG%7C200%7CB%7C150");
  });
});

describe("QueryParameter - style:deepObject", () => {
  test("explode:true value:object", () => {
    const result1 = QueryParameter.generate("color", {
      value: {
        R: 100,
        G: 200,
        B: 150,
      },
      style: "deepObject",
      explode: true,
    });
    expect(result1).toBe("color%5BR%5D=100&color%5BG%5D=200&color%5BB%5D=150");
  });
});

describe("QueryParameter - style:undefined", () => {
  test("invalid style", () => {
    const result1 = QueryParameter.generate("color", {
      value: {
        R: 100,
        G: 200,
        B: 150,
      },
      style: "invalid" as unknown,
      explode: true,
    });
    expect(result1).toBeUndefined();
  });
});

describe("QueryParameter - # includes", () => {
  test("form - explode:true/false value:string", () => {
    const result1 = QueryParameter.generate("color", {
      value: "#blue",
      style: "form",
      explode: true,
    });
    expect(result1).toBe("color=%23blue");
  });
  test("form - explode:false value:string[]", () => {
    const result = QueryParameter.generate("color", {
      value: ["#blue", "#black", "#brown"],
      style: "form",
      explode: false,
    });
    expect(result).toBe("color=%23blue%2C%23black%2C%23brown");
  });
  test("form - explode:false value:object", () => {
    const result1 = QueryParameter.generate("color", {
      value: {
        R: "#100",
        G: "#200",
        B: "#150",
      },
      style: "form",
      explode: false,
    });
    expect(result1).toBe("color=R%2C%23100%2CG%2C%23200%2CB%2C%23150");
  });
  test("form - explode:true value:object", () => {
    const result1 = QueryParameter.generate("color", {
      value: {
        R: "#100",
        G: "#200",
        B: "#150",
      },
      style: "form",
      explode: true,
    });
    expect(result1).toBe("R=%23100&G=%23200&B=%23150");
  });
  test("spaceDelimited - explode:false value:any[]", () => {
    const result1 = QueryParameter.generate("color", {
      value: ["#blue", "#black", "#brown"],
      style: "spaceDelimited",
      explode: false,
    });
    expect(result1).toBe("color=%23blue%20%23black%20%23brown");
  });
  test("pipeDelimited - explode:false value:any[]", () => {
    const result1 = QueryParameter.generate("color", {
      value: ["#blue", "#black", "#brown"],
      style: "pipeDelimited",
      explode: false,
    });
    expect(result1).toBe("color=%23blue%7C%23black%7C%23brown");
  });
  test("deepObject - explode:true value:object", () => {
    const result1 = QueryParameter.generate("color", {
      value: {
        R: "#100",
        G: "#200",
        B: "#150",
      },
      style: "deepObject",
      explode: true,
    });
    expect(result1).toBe("color%5BR%5D=%23100&color%5BG%5D=%23200&color%5BB%5D=%23150");
  });
});
