export const ls = (params: string[], out: any) => {
  const files = out.store.fs.map((file: any) => file.name).join(" ");
  if (files.length !== 0) {
    out.end(`\n${files}`);
    return;
  }
  out.end('\n No files found in the fs, use the "inport" command to add files');
};
