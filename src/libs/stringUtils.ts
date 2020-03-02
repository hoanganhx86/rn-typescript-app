export const numberWithCommas = (x?: any) => {
  return `${x}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
