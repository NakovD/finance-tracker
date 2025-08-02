export const sum = <T extends object>(values: T[], key: keyof T): number =>
  values.reduce((acc, curr) => acc + (isNaN(+curr[key]) ? 0 : +curr[key]), 0);
