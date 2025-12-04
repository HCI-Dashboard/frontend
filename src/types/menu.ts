export interface Menu {
  menuCd: string;
  menuNm: string;
  uri?: string;
  layout?: string;
  children?: Menu[];
}
