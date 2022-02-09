export const file = (params: string[], out: any) => {
  if (params.length != 1) {
    out.end("\nUsage: file <fileName>");
    return;
  }
  const fileName = params[0];
  const file = out.store.fs.filter((file: any) => file.name === fileName)[0];
  if (!file) {
    out.end(`\nNo file found with the name ${fileName}`);
    return;
  }

  out.end(`\n${fileName} type: ${file.type}`);
};
