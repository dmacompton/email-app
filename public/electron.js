const electron = require("electron");
const { app, BrowserWindow, ipcMain } = electron;
const path = require("path");
const isDev = require("electron-is-dev");
const fetch = require("electron-main-fetch");

let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1060,
    height: 660,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInSubFrames: true
    }
  });

  // and load the index.html of the app.
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
  mainWindow.on("closed", function() {
    mainWindow = null;
  });

  ipcMain.on("async-message", event => {
    fetch("https://api.myjson.com/bins/ri3em")
      .then(data => {
        event.sender.send("async-reply", data);
      })
      .catch(e => {
        event.sender.send("async-reply-error", e.message);
      });
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);
// Quit when all windows are closed.
app.on("window-all-closed", function() {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", function() {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
//# sourceMappingURL=electron.js.map
