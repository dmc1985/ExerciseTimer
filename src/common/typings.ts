export type NumericDictionary<T> = {
  [index: number]: T;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Dictionary<T = any> = {
  [index: string]: T;
};

export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export type Nillable<T> = T | null | undefined;
