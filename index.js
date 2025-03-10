const {app , BrowserWindow} = require('electron')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,      // Habilita o uso de require no renderer
            contextIsolation: false,    // Desativa o isolamento do contexto
        }
    })

    win.loadFile('./src/index.html');
    win.maximize();
}

app.whenReady().then(() => {
    createWindow();
});