import { ipcMain, IpcMainEvent } from "electron";
import libfm, {
  copyFile,
  getFiles,
  searchFiles,
  getUserName,
  getDrives,
  getDeviceLabelOrUUID,
  getDriveUsage,
  mountDrive,
  unmountDrive
} from "../lib/index.js";

export default function initFM({ debug = "none" }: { debug?: "debug" | "info" | "warning" | "error" | "none" } = { }) {
  libfm.initLogger(debug);

  ipcMain.on("copyFile", (event: IpcMainEvent, path: string, destination: string) => {
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
}
