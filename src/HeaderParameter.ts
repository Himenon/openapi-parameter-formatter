import * as Guard from "./Guard";
import { ArrayType } from "./Types";

export interface Parameter {
  value: ArrayType;
  style?: "simple";
  explode: boolean;
}

export const generate = (key: string | number, params: Parameter): string | undefined => {
  if (Guard.isArray(params.value)) {
    return params.value.join(",");
  }
  return undefined;
};
