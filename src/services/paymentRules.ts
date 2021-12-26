export const getPaymentProportion = (average: number) => {
  if (average < 150) return 0.3;
  if (average < 200) return 0.4;
  return 0.5;
};
