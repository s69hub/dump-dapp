export const getEllipsisTxt = (str, n = 6) => {
  if (str) {
    return `${str.slice(0, n)}...${str.slice(str.length - n)}`;
  }
  return "";
};

export const limitDigits = (num, limit) => {
  if (num) {
    return num.toFixed(limit);
  }
  return "";
};

export const tokenValue = (value, decimals) =>
  decimals ? value / Math.pow(10, decimals) : value;

export const addDecimals = (value, decimals) =>
  decimals ? value * Math.pow(10, decimals) : value;
