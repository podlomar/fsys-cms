export interface EntryLocation {
  readonly path: string;
  readonly fsPath: string;
}

export interface BaseEntry {
  readonly link: string;
  readonly location: EntryLocation,
}

export interface FailedEntry extends BaseEntry {
  readonly type: 'failed',
}

export interface SuccessEntry<PropsType> extends BaseEntry {
  readonly title: string,
  readonly props: PropsType,
}

export interface SuccessLeafEntry<PropsType = any> extends SuccessEntry<PropsType> {
  readonly type: 'leaf';
}

export interface SuccessParentEntry<PropsType = any> extends SuccessEntry<PropsType> {
  readonly type: 'parent';
  readonly subEntries: Entry[];
}

export type LeafEntry<PropsType = any> = SuccessLeafEntry<PropsType> | FailedEntry;

export type ParentEntry<PropsType = any> = SuccessParentEntry<PropsType> | FailedEntry;

export type Entry<PropsType = any> = LeafEntry<PropsType> | ParentEntry<PropsType>;

export interface NotFound {
  readonly type: 'not-found',
}
