import { ipcMain, IpcMainEvent } from "electron";
import {
  copyFile,
  getFiles,
  searchFiles,
  getUserName,
  getDrives,
  getDeviceLabelOrUUID,
  getDriveUsage,
  mountDrive,
  unmountDrive,
  startDriveListener,
  stopDriveListener,
  startFileListener,
  stopFileListener,
} from "../lib/index.js";

export default function initFM() {
  ipcMain.on("copyFile", (event: IpcMainEvent, path: string, destination: string) => {
    event.returnValue = copyFile(path, destination);
  });

  ipcMain.on("cutFile", (event: IpcMainEvent, path: string, destination: string) => {
    event.returnValue = copyFile(path, destination);
  });

  ipcMain.on("getFiles", (event: IpcMainEvent, directoryPath: string) => {
    event.returnValue = getFiles(directoryPath);
  });

  ipcMain.on("searchFiles", (event: IpcMainEvent, directoryPath: string, searchQuery: string) => {
    event.returnValue = searchFiles(directoryPath, searchQuery);
  });

  ipcMain.on("getUserName", (event: IpcMainEvent) => {
    event.returnValue = getUserName();
  });

  ipcMain.on("getDrives", (event: IpcMainEvent) => {
    event.returnValue = getDrives();
  });

  ipcMain.on("getDeviceLabelOrUUID", (event: IpcMainEvent, path: string) => {
    event.returnValue = getDeviceLabelOrUUID(path);
  });

  ipcMain.on("getDriveUsage", (event: IpcMainEvent, disk: string) => {
    event.returnValue = getDriveUsage(disk);
  });

  ipcMain.on("mountDrive", (event: IpcMainEvent, disk: string) => {
    event.returnValue = mountDrive(disk);
  });

  ipcMain.on("unmountDrive", (event: IpcMainEvent, disk: string) => {
    event.returnValue = unmountDrive(disk);
  });

  ipcMain.on("startDriveListener", (event: IpcMainEvent) => {
    startDriveListener((action: string, device: string) => {
      event.sender.send("startDriveListener-event", { action, device });
    });
    event.returnValue = true;
  });

  ipcMain.on("stopDriveListener", (event: IpcMainEvent) => {
    stopDriveListener();
    event.returnValue = true;
  });

  ipcMain.on("startFileListener", (event: IpcMainEvent, path: string) => {
    startFileListener(path, (action: string, device: string) => {
      event.sender.send("startFileListener-event", { action, device });
    });
    event.returnValue = true;
  });

  ipcMain.on("stopFileListener", (event: IpcMainEvent) => {
    stopFileListener();
    event.returnValue = true;
  });
}
