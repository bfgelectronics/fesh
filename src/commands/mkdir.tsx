export const mkdir = (params: string[], out: any) => {
  if (params.length === 0) {
    out.end("\nUsage: mkdir <dirName>");
    return;
  }
  params.forEach((dirName: string) => {
    out.store.createFolder(dirName);
    out.write(`added folder ${dirName} to the fs`);
  });
  out.end(`\n added all the dirs to fs`);
};
