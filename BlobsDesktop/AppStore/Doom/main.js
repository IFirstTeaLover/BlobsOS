let savedCss = await blobsAPI.applicationStorageRead("js-dos.css");
let savedMain = await blobsAPI.applicationStorageRead("js-dos.js");
let savedDoom = await blobsAPI.applicationStorageRead("doom.jsdos");
if (!savedCss || !savedMain || !savedDoom) await installStuff();
const style = document.createElement("link");
await setAttrs(style, {
    rel: "stylesheet",
    "href":"data:text/css;charset=utf-8," + encodeURIComponent(savedCss)
});
const script = document.createElement("script");
script.src = "data:text/javascript;charset=utf-8," + encodeURIComponent(savedMain);

const scriptLoaded = new Promise((resolve, reject) => {
    script.onload = resolve;
    script.onerror = reject;
});

document.body.append(style, script);

await scriptLoaded;

const player = document.createElement("div");

await setAttrs(player, {
    "style":"width: 100%; height: 100%;"
})
document.body.append(player)
const doomDataURI = arrayBufferToDataURI(savedDoom)
requestAnimationFrame(() => {
    Dos(player, {
        url: doomDataURI
    })
})

async function installStuff() {
    const cssResponse = await fetch("https://v8.js-dos.com/latest/js-dos.css");
    if (!cssResponse.ok) {
        blobsAPI.createNotification("Failed to install JS-DOS!", "The JS-DOS css file failed to download!");
        await blobsAPI.closeApp();
        return;
    }
    const cssData = await cssResponse.text()
    await blobsAPI.applicationStorageWrite("js-dos.css", "file", cssData);
    savedCss = cssData;

    const mainResponse = await fetch("https://v8.js-dos.com/latest/js-dos.js")
        if (!mainResponse.ok) {
        blobsAPI.createNotification("Failed to install JS-DOS!", "The JS-DOS JS file failed to download!");
        await blobsAPI.closeApp();
        return;
    }
    const mainData = await mainResponse.text()
    await blobsAPI.applicationStorageWrite("js-dos.js", "file", mainData);
    savedMain = mainData;

    const doomResponse = await fetch("https://v8.js-dos.com/bundles/doom.jsdos")
    if (!doomResponse.ok) {
        blobsAPI.createNotification("Failed to install Doom!", "The Doom JS-DOS file failed to download!");
        await blobsAPI.closeApp();
        return;
    }
    const doomData = await doomResponse.arrayBuffer()
    await blobsAPI.applicationStorageWrite("doom.jsdos", "file", doomData);
    savedDoom = doomData;

}

function arrayBufferToDataURI(buffer,) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return `data:application/zip;base64,${btoa(binary)}`;
}
