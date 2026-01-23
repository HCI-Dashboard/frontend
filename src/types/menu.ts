export interface Menu {
  id: number;
  parentId: number | null;
  name: string;
  path: string;
  component: string | null;
  children?: Menu[];
}
