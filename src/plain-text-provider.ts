import { statSync, readdirSync } from 'fs';
import path from 'path';
import { promises as fs, existsSync } from 'fs';
import { BaseEntry, Entry, EntryLocation, LeafEntry, ParentEntry, SuccessEntry } from "./entry.js";
import { EntryLoader } from "./provider.js";

export type TextFileEntry = LeafEntry<{}>;

export type TextFolderEntry = ParentEntry<{}>;

export class TextFileLoader implements EntryLoader<TextFileEntry> {
  public async load(parentLocation: EntryLocation, fileName: string): Promise<TextFileEntry> {
    const filePath = path.join(parentLocation.fsPath, fileName);
    const link = path.basename(fileName, path.extname(fileName));

    return {
      type: 'leaf',
      location: {
        path: `${parentLocation.path}/link`,
        fsPath: filePath,
      },
      link,
      props: {},
      title: link,
    }
  }
}

export class FolderTextLoader implements EntryLoader<TextFolderEntry> {
  private extensions: string[];
  private textFileLoader: TextFileLoader;

  constructor(extensions: string[]) {
    this.extensions = extensions;
    this.textFileLoader = new TextFileLoader();
  }

  public async load(parentLocation: EntryLocation, folderName: string): Promise<TextFolderEntry> {
    const folderPath = path.join(`${parentLocation.fsPath}`, folderName);
    const entryPath = path.join(`${parentLocation.path}`, folderName);
    const files = readdirSync(folderPath);

    const subEntries = await Promise.all(
      files.map(async (file) => {
        const childPath = path.join(folderPath, file);
        if (statSync(childPath).isDirectory()) {
          return this.load({
            fsPath: childPath,
            path: entryPath,
          }, file);
        }

        const ext = path.extname(file);
        if (this.extensions.includes(ext)) {
          return this.textFileLoader.load({
            fsPath: childPath,
            path: entryPath,
          }, file);  
        }
        
        return null;
      })
    );

    return {
      type: 'parent',
      location: {
        path: `${parentLocation.path}/${folderName}`,
        fsPath: folderPath,
      },
      link: folderName,
      props: {},
      title: folderName,
      subEntries: subEntries.filter((subEntry): subEntry is Entry => subEntry !== null),
    }
  }
}