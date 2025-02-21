interface FileEntry {
  name: string;
  type: string;
  path: string;
  size: number;
}

type FileList = FileEntry[];

export function getUserName(): string {
  return window.ipcRenderer.sendSync("getUserName");
}

export function getFiles(path: string): FileList {
  return window.ipcRenderer.sendSync("getFiles", path);
}

export function searchFiles(currentPath: string, searchQuery: string): FileList {
  return window.ipcRenderer.sendSync("searchFiles", currentPath, searchQuery);
}

export function getDrives(): FileList {
  return window.ipcRenderer.sendSync("getDrives");
}

export function getDriveUsage(disk: string) {
  return window.ipcRenderer.sendSync("getDriveUsage", disk);
}

export function getDeviceLabelOrUUID(disk: string) {
  return window.ipcRenderer.sendSync("getDeviceLabelOrUUID", disk);
}

export function mountDrive(disk: string) {
  return window.ipcRenderer.sendSync("mountDrive", disk);
}

export function unmountDrive(disk: string) {
  return window.ipcRenderer.sendSync("unmountDrive", disk);
}

export function copyFile(path: string, destination: string) {
  return window.ipcRenderer.sendSync("copyFile", path, destination);
}

export function cutFile(path: string, destination: string) {
  return window.ipcRenderer.sendSync("cutFile", path, destination);
}

export function startDriveListener(callback: (action: string, device: string) => void) {
  window.ipcRenderer.sendSync("startDriveListener");

  window.ipcRenderer.on("startDriveListener-event", (_, { action, device }) => {
    callback(action, device);
  });
}

export function stopDriveListener() {
  return window.ipcRenderer.sendSync("stopDriveListener");
}

export function startFileListener(path: string, callback: (eventType: string, filePath: string) => void) {
  window.ipcRenderer.sendSync("startFileListener", path);

  window.ipcRenderer.on("startFileListener-event", (_, { eventType, filePath }) => {
    callback(eventType, filePath);
  });
}

export function stopFileListener() {
  return window.ipcRenderer.sendSync("stopFileListener");
}