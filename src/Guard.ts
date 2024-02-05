import { UndefinedType, BigIntType, PrimitiveType, ObjectType, ArrayType, NullType } from "./Types";

export const isNull = (value: unknown): value is NullType => {
  return typeof value === "object" && value === null;
};

export const isUndefined = (value: unknown): value is UndefinedType => {
  return typeof value === "undefined";
};

export const isBigInt = (value: unknown): value is BigIntType => {
  return typeof value === "bigint";
};

// export const isSymbol = (value: unknown): value is SymbolType => {
//   return typeof value === "symbol";
// };

export const isString = (value: unknown): value is string => {
  return typeof value === "string";
};

export const isNumber = (value: unknown): value is number => {
  return typeof value === "number";
};

export const isBoolean = (value: unknown): value is boolean => {
  return typeof value === "boolean";
};

export const isArray = (value: unknown): value is ArrayType => {
  return !!value && typeof value === "object" && Array.isArray(value);
};

export const isPrimitive = (value: unknown): value is PrimitiveType => {
  if (!value) {
    return false;
  }
  return [isUndefined, isBoolean, isNumber, isString, isBigInt].some((validate) => validate(value));
};

export const isObject = (value: unknown): value is ObjectType => {
  if (isArray(value) || isPrimitive(value)) {
    return false;
  }
  return typeof value === "object";
};

export const isEmpty = (value: unknown): boolean => {
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
