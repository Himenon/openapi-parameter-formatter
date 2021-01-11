import * as PathParameter from "../PathParameter";

describe("PathParameter - style:matrix", () => {
  test("explode:true/false value:empty", () => {
    const result1 = PathParameter.generate("color", {
      value: undefined,
      style: "matrix",
      explode: false,
    });
    expect(result1).toBe(";color");
    const result2 = PathParameter.generate("color", {
      value: undefined,
      style: "matrix",
      explode: true,
    });
    expect(result2).toBe(";color");
    const result3 = PathParameter.generate("color", {
      value: [],
      style: "matrix",
      explode: false,
    });
    expect(result3).toBe(";color");
    const result4 = PathParameter.generate("color", {
      value: {},
      style: "matrix",
      explode: true,
    });
    expect(result4).toBe(";color");
  });

  test("explode:true/false value:string", () => {
    const result1 = PathParameter.generate("color", {
      value: "blue",
      style: "matrix",
      explode: false,
    });
    expect(result1).toBe(";color=blue");
    const result2 = PathParameter.generate("color", {
      value: "blue",
      style: "matrix",
      explode: true,
    });
    expect(result2).toBe(";color=blue");
  });

  test("explode:true/false value:array", () => {
    const result1 = PathParameter.generate("color", {
      value: ["blue", "black", "brown"],
      style: "matrix",
      explode: false,
    });
    expect(result1).toBe(";color=blue,black,brown");
    const result2 = PathParameter.generate("color", {
      value: ["blue", "black", "brown"],
      style: "matrix",
      explode: true,
    });
    expect(result2).toBe(";color=blue;color=black;color=brown");
  });

  test("explode:true/false value:object", () => {
    const result1 = PathParameter.generate("color", {
      value: {
        R: 100,
        G: 200,
        B: 150,
      },
      style: "matrix",
      explode: false,
    });
    expect(result1).toBe(";color=R,100,G,200,B,150");
    const result2 = PathParameter.generate("color", {
      value: {
        R: 100,
        G: 200,
        B: 150,
      },
      style: "matrix",
      explode: true,
    });
    expect(result2).toBe(";R=100;G=200;B=150");
  });
});

describe("PathParameter - style:label", () => {
  test("explode:true/false value:empty", () => {
    const result1 = PathParameter.generate("color", {
      value: undefined,
      style: "label",
      explode: false,
    });
    expect(result1).toBe(".");
    const result2 = PathParameter.generate("color", {
      value: undefined,
      style: "label",
      explode: true,
    });
    expect(result2).toBe(".");
    const result3 = PathParameter.generate("color", {
      value: [],
      style: "label",
      explode: false,
    });
    expect(result3).toBe(".");
    const result4 = PathParameter.generate("color", {
      value: {},
      style: "label",
      explode: true,
    });
    expect(result4).toBe(".");
  });

  test("explode:true/false value:string", () => {
    const result1 = PathParameter.generate("color", {
      value: "blue",
      style: "label",
      explode: false,
    });
    expect(result1).toBe(".blue");
    const result2 = PathParameter.generate("color", {
      value: "blue",
      style: "label",
      explode: true,
    });
    expect(result2).toBe(".blue");
  });

  test("explode:true/false value:array", () => {
    const result1 = PathParameter.generate("color", {
      value: ["blue", "black", "brown"],
      style: "label",
      explode: false,
    });
    expect(result1).toBe(".blue.black.brown");
    const result2 = PathParameter.generate("color", {
      value: ["blue", "black", "brown"],
      style: "label",
      explode: true,
    });
    expect(result2).toBe(".blue.black.brown");
  });

  test("explode:true/false value:object", () => {
    const result1 = PathParameter.generate("color", {
      value: {
        R: 100,
        G: 200,
        B: 150,
      },
      style: "label",
      explode: false,
    });
    expect(result1).toBe(".R.100.G.200.B.150");
    const result2 = PathParameter.generate("color", {
      value: {
        R: 100,
        G: 200,
        B: 150,
      },
      style: "label",
      explode: true,
    });
    expect(result2).toBe(".R=100.G=200.B=150");
  });
});
