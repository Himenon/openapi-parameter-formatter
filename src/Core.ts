import {
  ParameterOfLabel,
  ParameterOfMatrix,
  ParameterOfSimple,
  ParameterOfForm,
  ParameterOfSpaceDelimited,
  ParameterOfPipeDelimited,
  ParameterOfDeepObject,
  PrimitiveType,
  ObjectType,
} from "./Types";
import * as Guard from "./Guard";

/**
 * @see https://tools.ietf.org/html/rfc6570#section-3.2.2
 */
export const generateFromSimple = (key: string | number, params: ParameterOfSimple): string | undefined => {
  if (Guard.isArray(params.value)) {
    return params.value.filter(Boolean).join(",");
  }
  if (Guard.isPrimitive(params.value)) {
    return `${params.value}`;
  }
  if (Guard.isObject(params.value)) {
    if (params.explode) {
      return Object.entries(params.value)
        .map(([key, value]) => `${key}=${value || ""}`)
        .join(",");
    } else {
      return Object.entries(params.value)
        .map(([key, value]) => `${key},${value || ""}`)
        .join(",");
    }
  }
  return undefined;
};

export const generateFormParamterForCookie = (key: string | number, params: ParameterOfForm): string => {
  if (Guard.isEmpty(params.value)) {
    return `${key}=`;
  }
  if (Guard.isPrimitive(params.value)) {
    return `${key}=${params.value}`;
  }
  if (Guard.isArray(params.value)) {
    if (params.explode) {
      return params.value.map((item) => `${key}=${item}`).join("&");
    } else {
      return `${key}=${params.value.join(",")}`;
    }
  }
  if (Guard.isObject(params.value)) {
    if (params.explode) {
      return Object.entries(params.value)
        .map(([k, v]) => `${k}=${v}`)
        .join("&");
    } else {
      const value = Object.entries(params.value)
        .map(([k, v]) => `${k},${v}`)
        .join(",");
      return `${key}=${value}`;
    }
  }
  return `${key}=`;
};

export const generateFormParamter = (key: string | number, params: ParameterOfForm): string => {
  return generateFormParamterAsURLSearchParams(key, params).toString();
};

export const generateFormParamterAsURLSearchParams = (key: string | number, params: ParameterOfForm): URLSearchParams => {
  const instance = new URLSearchParams();
  if (Guard.isEmpty(params.value)) {
    instance.append(key.toString(), "");
    return instance;
  }

  if (Guard.isPrimitive(params.value)) {
    instance.append(key.toString(), params.value?.toString() ?? "");
    return instance;
  }

  if (Guard.isArray(params.value)) {
    if (params.explode) {
      params.value.map((item) => {
        instance.append(key.toString(), item.toString());
      });
    } else {
      instance.append(key.toString(), params.value.join(","));
    }
    return instance;
  }

  if (Guard.isObject(params.value)) {
    if (params.explode) {
      Object.entries(params.value).map(([k, v]) => {
        instance.append(k.toString(), v.toString());
      });
    } else {
      const value = Object.entries(params.value)
        .map(([k, v]) => `${k},${v}`)
        .join(",");
      instance.append(key.toString(), value);
    }
    return instance;
  }

  instance.append(key.toString(), "");
  return instance;
};

/**
 * If you want to change the encoding of space to "+", use the genericSpaceDelimitedAsURLSearchParams.
 * @see https://stackoverflow.com/questions/1634271/url-encoding-the-space-character-or-20
 */
export const generateSpaceDelimited = (key: string | number, params: ParameterOfSpaceDelimited): string | undefined => {
  return generateSpaceDelimitedAsURLSearchParams(key, params)?.toString().replace(/\+/g, "%20");
};

export const generateSpaceDelimitedAsURLSearchParams = (
  key: string | number,
  params: ParameterOfSpaceDelimited,
): URLSearchParams | undefined => {
  const instance = new URLSearchParams();
  if (Guard.isArray(params.value)) {
    instance.append(key.toString(), params.value.join(" "));
    return instance;
  }

  if (Guard.isObject(params.value)) {
    const value = Object.entries(params.value)
      .map(([k, v]) => `${k} ${v}`)
      .join(" ");
    instance.append(key.toString(), value);
    return instance;
  }

  return undefined;
};

export const generatePipeDelimitedParameter = (key: string | number, params: ParameterOfPipeDelimited): string | undefined => {
  return generatePipeDelimitedParameterAsURLSearchParams(key, params)?.toString();
};

export const generatePipeDelimitedParameterAsURLSearchParams = (
  key: string | number,
  params: ParameterOfPipeDelimited,
): URLSearchParams | undefined => {
  const instance = new URLSearchParams();
  if (Guard.isArray(params.value)) {
    instance.append(key.toString(), params.value.join("|"));
    return instance;
  }

  if (Guard.isObject(params.value)) {
    const value = Object.entries(params.value)
      .map(([k, v]) => `${k}|${v}`)
      .join("|");
    instance.append(key.toString(), value);
    return instance;
  }

  return undefined;
};

export const generateDeepObjectParameter = (key: string | number, params: ParameterOfDeepObject): string | undefined => {
  return generateDeepObjectParameterAsURLSearchParams(key, params)?.toString();
};

export const generateDeepObjectParameterAsURLSearchParams = (
  key: string | number,
  params: ParameterOfDeepObject,
): URLSearchParams | undefined => {
  if (!Guard.isObject(params.value)) {
    return undefined;
  }
  const queryParams = new URLSearchParams();
  const flatObject = flatten<ObjectType, { [key: string]: PrimitiveType }>(params.value);
  Object.entries(flatObject).map(([dotKeyName, primitiveValue]) => {
    const nestedKey = dotKeyName
      .split(".")
      .map((k1) => `[${k1}]`)
      .join("");
    queryParams.append(`${key}${nestedKey}`, primitiveValue?.toString() ?? "");
  });
  return queryParams;
};

export const generateFromMatrix = (key: string | number, params: ParameterOfMatrix): string | undefined => {
  if (Guard.isEmpty(params.value)) {
    return `;${key}`;
  }
  if (Guard.isString(params.value)) {
    return `;${key}=${params.value}`;
  }
  if (Guard.isArray(params.value)) {
    if (params.explode) {
      return ";" + params.value.map((v) => `${key}=${v}`).join(";");
    } else {
      return `;${key}=${params.value.join(",")}`;
    }
  }
  if (Guard.isObject(params.value)) {
    if (params.explode) {
      const value = Object.entries(params.value)
        .map(([k, v]) => `${k}=${v}`)
        .join(";");
      return `;${value}`;
    } else {
      const value = Object.entries(params.value)
        .map(([k, v]) => `${k},${v}`)
        .join(",");
      return `;${key}=${value}`;
    }
  }

  return `;${key}`;
};

export const generateFromLabel = (key: string | number, params: ParameterOfLabel): string | undefined => {
  if (Guard.isEmpty(params.value)) {
    return ".";
  }
  if (Guard.isPrimitive(params.value)) {
    return `.${params.value}`;
  }
  if (Guard.isArray(params.value)) {
    return `.${params.value.join(".")}`;
  }
  if (Guard.isObject(params.value)) {
    if (params.explode) {
      const value = Object.entries(params.value)
        .map(([k, v]) => `${k}=${v}`)
        .join(".");
      return `.${value}`;
    } else {
      const value = Object.entries(params.value)
        .map(([k, v]) => `${k}.${v}`)
        .join(".");
      return `.${value}`;
    }
  }
  return ".";
};

function flatten<T extends object, R extends Record<string, unknown>>(obj: T): R {
  function recursive(path: string[], data: object, flatted: Record<string, unknown>) {
    for (const [key, value] of Object.entries(data)) {
      const currentPath = [...path, key];
      if (Guard.isObject(value)) {
        recursive(currentPath, value, flatted);
      } else {
        flatted[currentPath.join(".")] = value;
      }
    }
  }
  const flatted = {} as R;
  recursive([], obj, flatted);
  return flatted;
}
