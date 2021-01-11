import { PrimitiveType, ObjectType, ArrayType } from "./Types";
import * as QueryParameter from "./QueryParameter";

export interface Parameter {
  value: PrimitiveType | ObjectType | ArrayType;
  style: "form";
  explode: boolean;
}

export const generate = (key: string | number, params: Parameter): string | undefined => {
  if (params.style === "form") {
    return QueryParameter.generateFormParamter(key, params);
  }
  return undefined;
};
