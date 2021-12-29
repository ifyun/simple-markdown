const path = require("path")
const url = require("url")

const {
  app,
  BrowserWindow
} = require("electron")

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({
    title: "Simple Markdown",
    width: 1280,
    height: 1024,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
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

app.on("ready", () => createWindow())

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
