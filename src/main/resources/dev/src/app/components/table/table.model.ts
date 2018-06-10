export abstract class TableModel<T> {
    public tableData: T[];
    public columns: string[];
    public getRowData: (columnName: string, row: T) => any;
}
