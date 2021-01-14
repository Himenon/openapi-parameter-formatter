import * as QueryParameter from "../QueryParameter";

describe("QueryParameter - style:deepObject", () => {
  test("explode:true / nest value", () => {
    const result1 = QueryParameter.generate("filters", {
      value: { level1: { level2: "hello" } },
      style: "deepObject",
      explode: true,
    });
    expect(result1).toBe(`filters[level1][level2]=hello`);
  });
  test("explode:true / nest value", () => {
    const result1 = QueryParameter.generate("filters", {
      value: { level1: { level2: { level3: "hello" } } },
      style: "deepObject",
      explode: true,
    });
    expect(result1).toBe(`filters[level1][level2][level3]=hello`);
  });
  test("explode:true / nest value", () => {
    const result1 = QueryParameter.generate("filters", {
      value: { level1: { level2: { level3: "hello" }, "level2-1": { "level3-1": "world" } } },
      style: "deepObject",
      explode: true,
    });
    expect(result1).toBe(`filters[level1][level2][level3]=hello&filters[level1][level2-1][level3-1]=world`);
  });
});
