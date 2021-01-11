# @himenon/openapi-parameter-formatter

A library that serializes OpenAPI parameter objects.
It is implemented according to the following style definition.

- https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#style-examples

## Usage

```ts
import { PathParameter } from "@himenon/openapi-parameter-formatter";

PathParameter.generate("color", {
  value: {
    R: 100,
    G: 200,
    B: 150,
  },
  style: "label",
  explode: true,
});
```

```ts
import { QueryParameter } from "@himenon/openapi-parameter-formatter";

QueryParameter.generate("color", {
  value: {
    R: 100,
    G: 200,
    B: 150,
  },
  style: "deepObject",
  explode: true,
});
// color[R]=100&color[G]=200&color[B]=150
```

```ts
import { HeaderParameter } from "@himenon/openapi-parameter-formatter";

HeaderParameter.generate("color", {
  value: ["blue", "black", "brown"],
  style: "simple",
  explode: false,
});
// "blue,black,brown"
```

```ts
import { CookieParameter } from "@himenon/openapi-parameter-formatter";

CookieParameter.generate("color", {
  value: ["blue", "black", "brown"],
  style: "form",
  explode: false,
});
// "color=R,100,G,200,B,150"
```

## LICENCE

[@himenon/openapi-parameter-formatter](https://github.com/Himenon/openapi-parameter-formatter)・MIT
