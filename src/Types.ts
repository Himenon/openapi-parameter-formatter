export type NullType = null;
export type UndefinedType = undefined;
export type BigIntType = bigint;
export type SymbolType = symbol;
export type PrimitiveType = string | number | boolean | NullType | UndefinedType | BigIntType;
export type ObjectType = { [key: string]: string | number | boolean };
export type ArrayType = (string | number | boolean)[];

export interface ParameterOfMatrix {
  value: PrimitiveType | ArrayType | ObjectType;
  style: "matrix";
  explode: boolean;
}

export interface ParameterOfLabel {
  value: PrimitiveType | ArrayType | ObjectType;
  style: "label";
  explode: boolean;
}

export interface ParameterOfSimple {
  value: PrimitiveType | ArrayType | ObjectType;
  style: "simple";
  explode: boolean;
}

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
