import { Entry, EntryLocation, NotFound, SuccessEntry } from "./entry.js";

export interface EntryLoader<EntryType extends Entry = Entry> {
  load(parentLocation: EntryLocation, fileName: string): Promise<EntryType>;
}

export interface EntryProvider<ChildProvider extends EntryProvider = any> {
  fetchEntry(): Promise<Entry | NotFound>;
}
