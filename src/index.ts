interface FileEntry {
  name: string;
  type: string;
  path: string;
  size: number;
}

type FileList = FileEntry[];

export function getUserName(): string {
  try {
    return window.ipcRenderer.sendSync("getUserName");
  } catch (error) {
    console.error("Failed to get username:", error);
    throw error;
  }
}

export function getFiles(path: string): FileList {
  try {
    return window.ipcRenderer.sendSync("getFiles", path);
  } catch (error) {
    console.error("Failed to fetch files:", error);
    throw error;
  }
}

export function searchFiles(currentPath: string, searchQuery: string): FileList {
  try {
    return window.ipcRenderer.sendSync("searchFiles", currentPath, searchQuery);
  } catch (error) {
    console.error("Error during file search:", error);
    throw error;
  }
}

export function getDrives(): FileList {
  try {
    return window.ipcRenderer.sendSync("getDrives");
  } catch (error) {
    console.error("Error during file search:", error);
    throw error;
  }
}

export function getDriveUsage(disk: string) {
  try {
    return window.ipcRenderer.sendSync("getDriveUsage", disk);
  } catch (error) {
    console.error("Error during file search:", error);
    throw error;
  }
}

export function getDeviceLabelOrUUID(disk: string) {
  try {
    return window.ipcRenderer.sendSync("getDeviceLabelOrUUID", disk);
  } catch (error) {
    console.error("Error during file search:", error);
    throw error;
  }
}

export function mountDrive(disk: string) {
  try {
    return window.ipcRenderer.sendSync("mountDrive", disk);
  } catch (error) {
    console.error("Error during file search:", error);
    throw error;
  }
}

export function unmountDrive(disk: string) {
  try {
    return window.ipcRenderer.sendSync("unmountDrive", disk);
  } catch (error) {
    console.error("Error during file search:", error);
    throw error;
  }
}

export function copyFile(path: string, destination: string) {
  try {
    return window.ipcRenderer.sendSync("copyFile", path, destination);
  } catch (error) {
    console.error("Error during file search:", error);
    throw error;
  }
}
