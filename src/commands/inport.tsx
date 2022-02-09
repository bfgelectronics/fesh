export const inport = (params: string[], out: any) => {
  const dummyInput = document.createElement("input");
  dummyInput.setAttribute("type", "file");
  dummyInput.setAttribute("accept", "text/plain");
  dummyInput.setAttribute("multiple", "multiple");
  dummyInput.click();
  dummyInput.addEventListener("change", (e: any) => {
    const files = dummyInput.files;
    if (!files) return;
    if (files.length > 0) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const text = reader.result;
        const fileName = files[0].name;
        const extention = fileName.split(".").pop();
        out.store.createFile(fileName, `file>${extention}`, text);
        out.end(`\nadded file ${fileName} to the fs`);
      };
      reader.readAsText(files[0]);
    }
  });
};
