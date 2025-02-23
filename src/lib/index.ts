import { createRequire } from "module";
import fs from "fs";

const require = createRequire(import.meta.url);

const possiblePaths = [
  "/usr/local/lib/node_modules/filerix/filerix.node",
  "/usr/lib/node_modules/filerix/filerix.node",
  "/usr/lib64/node_modules/filerix/filerix.node"
];

const addonPath = possiblePaths.find(fs.existsSync);

if (!addonPath) {
  console.error(`Error: Ensure that 'node-filerix' is installed or built. Expected file not found: ${possiblePaths}`);
  process.exit(1);
}

let filerix: Filerix;

try {
  filerix = require(addonPath);
} catch (error) {
  console.error("Error: Failed to load 'node-filerix'. Ensure it is built correctly.", error);
  process.exit(1);
}

interface Filerix {
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
  startFileListener: (path: string, callback: (eventType: string, filePath: string) => void) => any;
  stopFileListener: () => any;
}

interface FileEntry {
  name: string;
  type: string;
  path: string;
  size: number;
}

type FileList = FileEntry[];

export function getUserName(): string {
  try {
    return filerix.getUserName();
  } catch (error) {
    console.error("Error in getUserName:", error);
    throw new Error("Failed to get the user name. Please check the system or configuration.");
  }
}

export function getFiles(path: string): FileList {
  try {
    return filerix.getFiles(path);
  } catch (error) {
    console.error("Error in getFiles:", error);
    throw new Error("Failed to fetch files. Please verify the path and try again.");
  }
}

export function searchFiles(currentPath: string, searchQuery: string): FileList {
  try {
    return filerix.searchFiles(currentPath, searchQuery);
  } catch (error) {
    console.error("Error in searchFiles:", error);
    throw new Error("Failed to search files. Ensure the path and query are correct.");
  }
}

export function getDrives(): FileList {
  try {
    return filerix.getDrives();
  } catch (error) {
    console.error("Error in getDrives:", error);
    throw new Error("Failed to retrieve drives. Please check the system setup.");
  }
}

export function getDriveUsage(disk: string): any {
  try {
    return filerix.getDriveUsage(disk);
  } catch (error) {
    console.error("Error in getDriveUsage:", error);
    throw new Error("Failed to get drive usage. Verify the disk identifier and try again.");
  }
}

export function getDeviceLabelOrUUID(disk: string): any {
  try {
    return filerix.getDeviceLabelOrUUID(disk);
  } catch (error) {
    console.error("Error in getDeviceLabelOrUUID:", error);
    throw new Error("Failed to get device label or UUID. Check the disk identifier.");
  }
}

export function mountDrive(disk: string): any {
  try {
    return filerix.mountDrive(disk);
  } catch (error) {
    console.error("Error in mountDrive:", error);
    throw new Error("Failed to mount drive. Ensure the disk is available.");
  }
}

export function unmountDrive(disk: string): any {
  try {
    return filerix.unmountDrive(disk);
  } catch (error) {
    console.error("Error in unmountDrive:", error);
    throw new Error("Failed to unmount drive. Ensure the disk is not in use.");
  }
}

export function copyFile(path: string, destination: string): any {
  try {
    return filerix.copyFile(path, destination);
  } catch (error) {
    console.error("Error in copyFile:", error);
    throw new Error("Failed to copy the file. Check the source and destination paths.");
  }
}

export function cutFile(path: string, destination: string): any {
  try {
    return filerix.cutFile(path, destination);
  } catch (error) {
    console.error("Error in cutFile:", error);
    throw new Error("Failed to move the file. Verify the source and destination paths.");
  }
}

export function renameFile(path: string, newName: string): any {
  try {
    return filerix.renameFile(path, newName);
  } catch (error) {
    console.error("Error in renameFile:", error);
    throw new Error("Failed to rename the file. Ensure the file path and new name are valid.");
  }
}

export function compressFile(path: string, destination: string): any {
  try {
    return filerix.compressFile(path, destination);
  } catch (error) {
    console.error("Error in compressFile:", error);
    throw new Error("Failed to compress the file. Check the source and destination paths.");
  }
}

export function startDriveListener(callback: (action: string, device: string) => void): any {
  try {
    return filerix.startDriveListener(callback);
  } catch (error) {
    console.error("Error in startDriveListener:", error);
  }
}

export function stopDriveListener(): any {
  try {
    return filerix.stopDriveListener();
  } catch (error) {
    console.error("Error in stopDriveListener:", error);
  }
}

export function startFileListener(path: string, callback: (eventType: string, filePath: string) => void): any {
  try {
    return filerix.startFileListener(path, callback);
  } catch (error) {
    console.error("Error in startFileListener:", error);
  }
}

export function stopFileListener(): any {
  try {
    return filerix.stopFileListener();
  } catch (error) {
    console.error("Error in stopFileListener:", error);
  }
}

export default filerix;
