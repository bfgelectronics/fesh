export const theme = (params: string[], out: any) => {
  if (params.length === 0) {
    const textColor = prompt("Enter a color hex for text color") || "#fff";
    const bkg = prompt("Enter a color hex for background color") || "#000";
    if (textColor === bkg) {
      out.end("The text color and background color can't be the same");
      return;
    }
    document.body.style.color = textColor;
    document.body.style.backgroundColor = bkg;
    out.end("\nTheme updated sucesfully");
  }
  if (params.length === 1) {
    if (params[0] == "-h" || params[0] == "--help" || params[0] === "help") {
      out.end(
        "\nUsage:\n\t- theme | and a prompt will appear to introduce the collors \n\t- theme [hex textColor] [hex bkgColor] | the hex values will be directly applied as theme\n"
      );
      return;
    }
  }
  document.body.style.color = params[0];
  document.body.style.backgroundColor = params[1];
  out.end("\nTheme updated sucesfully");
};
