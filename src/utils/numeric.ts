const sumAndDivide = (numbers: number[]): number => {
  const sum = numbers.reduce((total, actual) => Number(total) + Number(actual), 0);
  return (sum !== 0 && numbers.length !== 0 ? (sum / numbers.length) : 0);
};

export {
  sumAndDivide,
};
