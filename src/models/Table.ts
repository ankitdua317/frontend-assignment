export interface ColumnConfig<T> {
  header: string;
  accessor: keyof T;
}

export interface TableProps<T> {
  apiUrl: string;
  pageSize: number;
  columns: ColumnConfig<T>[];
}
