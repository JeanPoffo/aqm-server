const sumAndDivide = (numbers: number[], divider: number): number => {
  const sum = numbers.reduce((total, actual) => Number(total) + Number(actual), 0);
  return sum !== 0 && divider !== 0 ? (sum / divider) : 0;
};

export {
  sumAndDivide,
};
