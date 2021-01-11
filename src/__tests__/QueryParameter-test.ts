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
    expect(result).toBe("color=blue,black,brown");
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
    expect(result1).toBe("color=R,100,G,200,B,150");
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
    expect(result1).toBe("blue%20black%20brown");
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
    expect(result1).toBe("R%20100%20G%20200%20B%20150");
  });
});

describe("QueryParameter - style:pipeDelimited", () => {
  test("explode:false value:any[]", () => {
    const result1 = QueryParameter.generate("color", {
      value: ["blue", "black", "brown"],
      style: "pipeDelimited",
      explode: false,
    });
    expect(result1).toBe("blue|black|brown");
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
    expect(result1).toBe("R|100|G|200|B|150");
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
    expect(result1).toBe("color[R]=100&color[G]=200&color[B]=150");
  });
});
