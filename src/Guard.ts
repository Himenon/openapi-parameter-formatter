import { UndefinedType, BigIntType, PrimitiveType, ObjectType, ArrayType, NullType } from "./Types";

export const isNull = (value: any): value is NullType => {
  return typeof value === "object" && value === null;
};

export const isUndefined = (value: any): value is UndefinedType => {
  return typeof value === "undefined";
};

export const isBigInt = (value: any): value is BigIntType => {
  return typeof value === "bigint";
};

// export const isSymbol = (value: any): value is SymbolType => {
//   return typeof value === "symbol";
// };

export const isString = (value: any): value is string => {
  return typeof value === "string";
};

export const isNumber = (value: any): value is number => {
  return typeof value === "number";
};

export const isBoolean = (value: any): value is boolean => {
  return typeof value === "boolean";
};

export const isArray = (value: any): value is ArrayType => {
  return !!value && typeof value === "object" && Array.isArray(value);
};

export const isPrimitive = (value: any): value is PrimitiveType => {
  if (!value) {
    return false;
  }
  return [isUndefined, isBoolean, isNumber, isString, isBigInt].some(validate => validate(value));
};

export const isObject = (value: any): value is ObjectType => {
  if (isArray(value) || isPrimitive(value)) {
    return false;
  }
  return typeof value === "object";
};

export const isEmpty = (value: any): boolean => {
  if (!value) {
    return false;
  }
  if (isArray(value)) {
    return value.length === 0;
  }
  if (isObject(value)) {
    return Object.keys(value).length === 0;
  }
  return !value;
};
