import { PrimitiveType, ObjectType, ArrayType } from "./Types";
import * as Core from "./Core";

export interface Parameter {
  value: PrimitiveType | ObjectType | ArrayType;
  style: "form";
  explode: boolean;
}

export const generate = (key: string | number, params: Parameter): string | undefined => {
  if (params.style === "form") {
    return Core.generateFormParamter(key, params);
  }
  return undefined;
};
