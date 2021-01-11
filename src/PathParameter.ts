import { ParameterOfMatrix, ParameterOfLabel, ParameterOfSimple } from "./Types";
import * as Core from "./Core";

export type Parameter = ParameterOfMatrix | ParameterOfLabel | ParameterOfSimple;

export const generate = (key: string | number, params: Parameter): string | undefined => {
  if (params.style === "simple") {
    return Core.generateFromSimple(key, params);
  }
  if (params.style === "matrix") {
    return Core.generateFromMatrix(key, params);
  }
  if (params.style === "label") {
    return Core.generateFromLabel(key, params);
  }
  return undefined;
};
