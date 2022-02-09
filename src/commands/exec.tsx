export const exec = async (params: string[], out: any) => {
  let jsSnippet = params.join(" ");
  let output;
  try {
    output = eval(jsSnippet);
  } catch (e: any) {
    out.end(`\n${e.message}`);
    return;
  }
  if (output) out.write(JSON.stringify(output));
  out.end("\nended execution");
};
