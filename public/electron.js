const electron = require("electron");
const { app, BrowserWindow, ipcMain } = electron;
const path = require("path");
const isDev = require("electron-is-dev");
const fetch = require("electron-main-fetch");

let mainWindow;
let childWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1060,
    height: 660,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  // mainWindow.webContents.openDevTools();
  mainWindow.on("closed", function() {
    mainWindow = null;
    childWindow = null;
  });

  ipcMain.on("show-child", function(event, email) {
    if (childWindow) return;

    childWindow = new BrowserWindow({
      width: 800,
      height: 600,
      parent: mainWindow,
      webPreferences: {
        nodeIntegration: true
      }
    });

    childWindow
      .loadURL(
        isDev
          ? `file://${path.join(__dirname, "../public/child.html")}`
          : `file://${path.join(__dirname, "../build/child.html")}`
      )
      .then(() => {
        childWindow.webContents.send("child-data", email);
      });

    childWindow.on("closed", function() {
      childWindow = null;
    });
  });

  ipcMain.on("get-data", event => {
    fetch("https://api.myjson.com/bins/ri3em")
      .then(data => {
        event.sender.send("async-reply", data);
      })
      .catch(e => {
        event.sender.send("async-reply-error", e.message);
      });
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", function() {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", function() {
  if (mainWindow === null) {
    createWindow();
  }
});
