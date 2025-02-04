import { createRequire } from "module";

interface Libfm {
  getFiles: (path: string) => FileList;
  getUserName: () => string;
  getDrives: () => FileList;
  getDriveUsage: (disk: string) => any;
  searchFiles: (currentPath: string, searchQuery: string) => FileList;
  copyFile: (path: string, destination: string) => any;
  cutFile: (path: string, destination: string) => any;
  renameFile: (path: string, newName: string) => any;
  compressFile: (path: string, destination: string) => any;
  getDeviceLabelOrUUID: (disk: string) => any;
  mountDrive: (disk: string) => any;
  unmountDrive: (disk: string) => any;
  initLogger: (...args: any[]) => any;
  startDriveListener: (callback: (action: string, device: string) => void) => any;
  stopDriveListener: () => any;
  startFileListener: (path: string ,callback: (eventType: string, filePath: string) => void) => any;
  stopFileListener: () => any;
}

interface FileEntry {
  name: string;
  type: string;
  path: string;
  size: number;
}

type FileList = FileEntry[];

let fmNodePath: string | null = null;

const dummyFunction = () => {
  throw new Error("Libfm not initialized. Please call init() with the path to 'fm.node'.");
};

let libfm: Libfm = {
  getFiles: dummyFunction,
  getUserName: dummyFunction,
  getDrives: dummyFunction,
  getDriveUsage: dummyFunction,
  searchFiles: dummyFunction,
  copyFile: dummyFunction,
  cutFile: dummyFunction,
  renameFile: dummyFunction,
  compressFile: dummyFunction,
  getDeviceLabelOrUUID: dummyFunction,
  mountDrive: dummyFunction,
  unmountDrive: dummyFunction,
  initLogger: dummyFunction,
  startDriveListener: dummyFunction,
  stopDriveListener: dummyFunction,
  startFileListener: dummyFunction,
  stopFileListener: dummyFunction,
};

export function init(fmNodeLocation: string) {
  fmNodePath = fmNodeLocation;
  loadLibfm();
  console.log("Libfm successfully initialized.");
}

function loadLibfm() {
  if (!fmNodePath) {
    throw new Error("Libfm not initialized. Please call init() with the path to 'fm.node'.");
  }

  try {
    const require = createRequire(import.meta.url);
    libfm = require(fmNodePath);
  } catch (error) {
    console.error("Failed to load libfm:", error);
    throw error;
  }
}

export function getUserName(): string {
  try {
    return libfm.getUserName();
  } catch (error) {
    console.error("Error in getUserName:", error);
    throw new Error("Failed to get the user name. Please check the system or configuration.");
  }
}

export function getFiles(path: string): FileList {
  try {
    return libfm.getFiles(path);
  } catch (error) {
    console.error("Error in getFiles:", error);
    throw new Error("Failed to fetch files. Please verify the path and try again.");
  }
}

export function searchFiles(currentPath: string, searchQuery: string): FileList {
  try {
    return libfm.searchFiles(currentPath, searchQuery);
  } catch (error) {
    console.error("Error in searchFiles:", error);
    throw new Error("Failed to search files. Ensure the path and query are correct.");
  }
}

export function getDrives(): FileList {
  try {
    return libfm.getDrives();
  } catch (error) {
    console.error("Error in getDrives:", error);
    throw new Error("Failed to retrieve drives. Please check the system setup.");
  }
}

export function getDriveUsage(disk: string): any {
  try {
    return libfm.getDriveUsage(disk);
  } catch (error) {
    console.error("Error in getDriveUsage:", error);
    throw new Error("Failed to get drive usage. Verify the disk identifier and try again.");
  }
}

export function getDeviceLabelOrUUID(disk: string): any {
  try {
    return libfm.getDeviceLabelOrUUID(disk);
  } catch (error) {
    console.error("Error in getDeviceLabelOrUUID:", error);
    throw new Error("Failed to get device label or UUID. Check the disk identifier.");
  }
}

export function mountDrive(disk: string): any {
  try {
    return libfm.mountDrive(disk);
  } catch (error) {
    console.error("Error in mountDrive:", error);
    throw new Error("Failed to mount drive. Ensure the disk is available.");
  }
}

export function unmountDrive(disk: string): any {
  try {
    return libfm.unmountDrive(disk);
  } catch (error) {
    console.error("Error in unmountDrive:", error);
    throw new Error("Failed to unmount drive. Ensure the disk is not in use.");
  }
}

export function copyFile(path: string, destination: string): any {
  try {
    return libfm.copyFile(path, destination);
  } catch (error) {
    console.error("Error in copyFile:", error);
    throw new Error("Failed to copy the file. Check the source and destination paths.");
  }
}

export function cutFile(path: string, destination: string): any {
  try {
    return libfm.cutFile(path, destination);
  } catch (error) {
    console.error("Error in cutFile:", error);
    throw new Error("Failed to move the file. Verify the source and destination paths.");
  }
}

export function renameFile(path: string, newName: string): any {
  try {
    return libfm.renameFile(path, newName);
  } catch (error) {
    console.error("Error in renameFile:", error);
    throw new Error("Failed to rename the file. Ensure the file path and new name are valid.");
  }
}

export function compressFile(path: string, destination: string): any {
  try {
    return libfm.compressFile(path, destination);
  } catch (error) {
    console.error("Error in compressFile:", error);
    throw new Error("Failed to compress the file. Check the source and destination paths.");
  }
}

export function startDriveListener(callback: (action: string, device: string) => void): any {
  try {
    return libfm.startDriveListener(callback);
  } catch (error) {
    console.error("Error in startDriveListener:", error);
  }
}

export function stopDriveListener(): any {
  try {
    return libfm.stopDriveListener();
  } catch (error) {
    console.error("Error in stopDriveListener:", error);
  }
}

export function startFileListener(path: string, callback: (eventType: string, filePath: string) => void): any {
  try {
    return libfm.startFileListener(path, callback);
  } catch (error) {
    console.error("Error in startFileListener:", error);
  }
}

export function stopFileListener(): any {
  try {
    return libfm.stopFileListener();
  } catch (error) {
    console.error("Error in stopFileListener:", error);
  }
}

export default libfm;
