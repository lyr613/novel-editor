const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('electron', require('electron'))
