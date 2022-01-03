const path = require("path")
const url = require("url")
const electron = require("electron")
const {
  app,
  BrowserWindow
} = require("electron")

const remoteMain = require("@electron/remote/main")
remoteMain.initialize()

let mainWindow
let webContents

const handleRedirect = (e, url) => {
  if (url !== webContents.getURL()) {
    e.preventDefault()
    require("electron").shell.openExternal(url).catch(err => {
      console.log(err)
    })
  }
}

function createWindow (width, height) {
  mainWindow = new BrowserWindow({
    width,
    height,
    title: "Simple Markdown",
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: false
    }
  })

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "./index.html"),
      protocol: "file",
      slashes: true
    })
  ).catch(err => {
    console.error(err)
  })

  mainWindow.on("closed", () => {
    mainWindow = null
  })
}

app.on("ready", () => {
  const screenHeight = electron.screen.getPrimaryDisplay().size.height

  if (screenHeight <= 1080) {
    createWindow(900, 720)
  } else if (screenHeight <= 1440) {
    createWindow(1280, 1024)
  } else {
    createWindow(1600, 1280)
  }

  webContents = mainWindow.webContents
  webContents.on("will-navigate", handleRedirect)
  webContents.on("new-window", handleRedirect)
  remoteMain.enable(webContents)
})

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})

app.on("activate", () => {
  if (mainWindow == null) {
    createWindow()
  }
})
