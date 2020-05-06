export enum Spacing {
  XS = 4,
  S = 8,
  M = 16,
  L = 32,
  XL = 64
}

interface ClassConfig {
  width: string;
  height: string;
}

const classMap: { [spacing: string]: ClassConfig } = {
  [Spacing.XS]: {
    height: "h-2",
    width: "w-2"
  },
  [Spacing.S]: {
    height: "h-4",
    width: "w-4"
  },
  [Spacing.M]: {
    height: "h-8",
    width: "w-8"
  },
  [Spacing.L]: {
    height: "h-16",
    width: "w-16"
  },
  [Spacing.XL]: {
    height: "h-32",
    width: "w-32"
  }
};

export function heightClass(spacing: Spacing): string {
  return classMap[spacing].height;
}

export function widthClass(spacing: Spacing): string {
  return classMap[spacing].width;
}
