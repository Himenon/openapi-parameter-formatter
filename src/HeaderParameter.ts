import { ParameterOfSimple } from "./Types";
import * as Core from "./Core";

export type Parameter = ParameterOfSimple;

export const generate = (key: string | number, params: Parameter): string | undefined => {
  if (params.style === "simple") {
    return Core.generateFromSimple(key, params);
  }
  return undefined;
};
