const moduleEl = document.createElement("script");
moduleEl.type = "module";
const code = `
(async () => {
    const inputPath = await blobsAPI.openFileDialog();
    const input = await blobsAPI.getFile(inputPath);
    const { transpile } = await import("https://esm.sh/typescript");

    let transpiled;
    try {
        transpiled = transpile(input);
    } catch (error) {
        await blobsAPI.createNotification("TypescriptTranspiler", "Failed to transpile code! Error in console.");
        console.error(error);
        return;
    }

    const path = await blobsAPI.openSaveDialog(inputPath.replace(".ts", ".js"));
    await blobsAPI.writeFile(path, "file", transpiled)
})();
`;
const dataURL = "data:text/javascript;charset=utf-8," + encodeURIComponent(code);
moduleEl.src = dataURL;
document.body.append(moduleEl);