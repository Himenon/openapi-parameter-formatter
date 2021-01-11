import { PrimitiveType, ObjectType, ArrayType } from "./Types";
import * as Guard from "./Guard";

export interface ParameterOfForm {
  value: PrimitiveType | ArrayType | ObjectType;
  style: "form";
  explode: boolean;
}

export interface ParameterOfSpaceDelimited {
  value: ArrayType | ObjectType;
  style: "spaceDelimited";
  explode: false;
}

export interface ParameterOfPipeDelimited {
  value: ArrayType | ObjectType;
  style: "pipeDelimited";
  explode: false;
}

export interface ParameterOfDeepObject {
  value: ObjectType;
  style: "deepObject";
  explode: true;
}

export type Parameter = ParameterOfForm | ParameterOfSpaceDelimited | ParameterOfPipeDelimited | ParameterOfDeepObject;

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

export const generate = (key: string | number, params: Parameter): string | undefined => {
  if (params.style === "form") {
    return generateFormParamter(key, params);
  }
  if (params.style === "spaceDelimited") {
    return generateSpaceDelimited(key, params);
  }
  if (params.style === "pipeDelimited") {
    return generatePipeDelimitedParameter(key, params);
  }
  if (params.style === "deepObject") {
    return generateDeepObjectParameter(key, params);
  }
  return `${key}=`;
};
