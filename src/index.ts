import { Entry } from "./entry.js";
import { EntryLoader } from "./provider.js";

export class FsysCms<RootEntryType extends Entry> {
  private rootEntry: RootEntryType;
  
  constructor(rootEntry: RootEntryType) {
    this.rootEntry = rootEntry;
  }

  public static async load<RootEntryType extends Entry>(
    rootFolder: string, rootLoader: EntryLoader<RootEntryType>
  ): Promise<FsysCms<RootEntryType>> {
    const rootEntry = await rootLoader.load({
      path: '',
      fsPath: rootFolder,
    }, '');

    return new FsysCms(rootEntry);
  }
}