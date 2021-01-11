import { ParameterOfForm, ParameterOfSpaceDelimited, ParameterOfPipeDelimited, ParameterOfDeepObject } from "./Types";
import * as Core from "./Core";

export type Parameter = ParameterOfForm | ParameterOfSpaceDelimited | ParameterOfPipeDelimited | ParameterOfDeepObject;

export const generate = (key: string | number, params: Parameter): string | undefined => {
  if (params.style === "form") {
    return Core.generateFormParamter(key, params);
  }
  if (params.style === "spaceDelimited") {
    return Core.generateSpaceDelimited(key, params);
  }
  if (params.style === "pipeDelimited") {
    return Core.generatePipeDelimitedParameter(key, params);
  }
  if (params.style === "deepObject") {
    return Core.generateDeepObjectParameter(key, params);
  }
  return undefined;
};
