export const test = async (params: string[], out: any) => {
  out.write("test1");
  await new Promise((resolve) => {
    setTimeout(() => {
      out.write("test2");
      resolve("solved");
    }, 1000);
  });
  await new Promise((resolve) => {
    setTimeout(() => {
      out.write("test3");
      resolve("solved");
    }, 1000);
  });
  out.write("Provided params: " + JSON.stringify(params));
  out.end("\nended exec");
};
