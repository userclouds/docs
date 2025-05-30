export const isProd = process.env.NODE_ENV === "production";

export const BASE_PATH = isProd
  ? (process.env.NEXT_PUBLIC_BASE_URL ?? `${process.env.PWD}/out` ?? "")
  : "";
