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
  return libfm.getUserName();
}

export function getFiles(path: string): FileList {
  return libfm.getFiles(path);
}

export function searchFiles(currentPath: string, searchQuery: string): FileList {
  return libfm.searchFiles(currentPath, searchQuery);
}

export function getDrives(): FileList {
  return libfm.getDrives();
}

export function getDriveUsage(disk: string): any {
  return libfm.getDriveUsage(disk);
}

export function getDeviceLabelOrUUID(disk: string): any {
  return libfm.getDeviceLabelOrUUID(disk);
}

export function mountDrive(disk: string): any {
  return libfm.mountDrive(disk);
}

export function unmountDrive(disk: string): any {
  return libfm.unmountDrive(disk);
}

export function copyFile(path: string, destination: string): any {
  return libfm.copyFile(path, destination);
}

export function cutFile(path: string, destination: string): any {
  return libfm.cutFile(path, destination);
}

export function renameFile(path: string, newName: string): any {
  return libfm.renameFile(path, newName);
}

export function compressFile(path: string, destination: string): any {
  return libfm.compressFile(path, destination);
}

export default libfm;
