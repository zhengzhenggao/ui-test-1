export const sleep = (ms: number) => {
  return new Promise((res, err) => {
    setTimeout(res, ms);
  });
};
