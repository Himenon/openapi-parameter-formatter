import {
  ParameterOfLabel,
  ParameterOfMatrix,
  ParameterOfSimple,
  ParameterOfForm,
  ParameterOfSpaceDelimited,
  ParameterOfPipeDelimited,
  ParameterOfDeepObject,
} from "./Types";
import * as Guard from "./Guard";

export const generateFromSimple = (key: string | number, params: ParameterOfSimple): string | undefined => {
  if (Guard.isArray(params.value)) {
    return params.value.join(",");
  }
  return undefined;
};

export const generateFormParamter = (key: string | number, params: ParameterOfForm): string => {
  if (Guard.isEmpty(params.value)) {
    return `${key}=`;
  }
  if (Guard.isPrimitive(params.value)) {
    return `${key}=${params.value}`;
  }
  if (Guard.isArray(params.value)) {
    if (params.explode) {
      return params.value.map(item => `${key}=${item}`).join("&");
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

export const generateSpaceDelimited = (key: string | number, params: ParameterOfSpaceDelimited): string | undefined => {
  if (Guard.isArray(params.value)) {
    return encodeURIComponent(params.value.join(" "));
  }
  if (Guard.isObject(params.value)) {
    const value = Object.entries(params.value)
      .map(([k, v]) => `${k} ${v}`)
      .join(" ");
    return encodeURIComponent(value);
  }
  return undefined;
};

export const generatePipeDelimitedParameter = (key: string | number, params: ParameterOfPipeDelimited): string | undefined => {
  if (Guard.isArray(params.value)) {
    return params.value.join("|");
  }
  if (Guard.isObject(params.value)) {
    const value = Object.entries(params.value)
      .map(([k, v]) => `${k}|${v}`)
      .join("|");
    return value;
  }
  return undefined;
};

export const generateDeepObjectParameter = (key: string | number, params: ParameterOfDeepObject): string | undefined => {
  if (!Guard.isObject(params.value)) {
    return undefined;
  }
  return Object.entries(params.value)
    .map(([k, v]) => `${key}[${k}]=${v}`)
    .join("&");
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
