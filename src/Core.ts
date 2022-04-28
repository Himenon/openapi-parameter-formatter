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
import flatten from "flat";

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

export const generateFormParamter = (key: string | number, params: ParameterOfForm): string => {
  return generateFormParamterAsURLSearchParams(key, params).toString();
};

export const generateFormParamterAsURLSearchParams = (key: string | number, params: ParameterOfForm): URLSearchParams => {
  const queryParams = new URLSearchParams();
  if (Guard.isEmpty(params.value)) {
    queryParams.append(key.toString(), "");
    return queryParams;
  }

  if (Guard.isPrimitive(params.value)) {
    queryParams.append(key.toString(), params.value?.toString() ?? "");
    return queryParams;
  }

  if (Guard.isArray(params.value)) {
    if (params.explode) {
      params.value.map(item => {
        queryParams.append(key.toString(), item.toString());
      });
    } else {
      queryParams.append(key.toString(), params.value.join(","));
    }
    return queryParams;
  }

  if (Guard.isObject(params.value)) {
    if (params.explode) {
      Object.entries(params.value).map(([k, v]) => {
        queryParams.append(k.toString(), v.toString());
      });
    } else {
      const value = Object.entries(params.value)
        .map(([k, v]) => `${k},${v}`)
        .join(",");
      queryParams.append(key.toString(), value);
    }
    return queryParams;
  }

  queryParams.append(key.toString(), "");
  return queryParams;
};

export const generateSpaceDelimited = (key: string | number, params: ParameterOfSpaceDelimited): string | undefined => {
  return generateSpaceDelimitedAsURLSearchParams(key, params)?.toString();
};

export const generateSpaceDelimitedAsURLSearchParams = (
  key: string | number,
  params: ParameterOfSpaceDelimited,
): URLSearchParams | undefined => {
  const queryParams = new URLSearchParams();
  if (Guard.isArray(params.value)) {
    queryParams.append(key.toString(), params.value.join(" "));
    return queryParams;
  }

  if (Guard.isObject(params.value)) {
    const value = Object.entries(params.value)
      .map(([k, v]) => `${k} ${v}`)
      .join(" ");
    queryParams.append(key.toString(), value);
    return queryParams;
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
  const queryParams = new URLSearchParams();
  if (Guard.isArray(params.value)) {
    queryParams.append(key.toString(), params.value.join("|"));
    return queryParams;
  }

  if (Guard.isObject(params.value)) {
    const value = Object.entries(params.value)
      .map(([k, v]) => `${k}|${v}`)
      .join("|");
    queryParams.append(key.toString(), value);
    return queryParams;
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
      .map(k1 => `[${k1}]`)
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
      return ";" + params.value.map(v => `${key}=${v}`).join(";");
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
