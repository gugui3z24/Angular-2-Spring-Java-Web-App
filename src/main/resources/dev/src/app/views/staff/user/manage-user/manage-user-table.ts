import { ApplicationUser } from 'src/app/interfaces';
import { TableModel } from 'src/app/components/table/table.model';

export class ManageUserTableModel implements TableModel<ApplicationUser> {
    public columns = ['Username', 'Name', 'Permission'];
    public tableData: ApplicationUser[];
    public getRowData(columnName: string, row: ApplicationUser): any {
        switch (columnName) {
            case this.columns[0]:
                return row.username;
            case this.columns[1]:
                return row.fullName;
            case this.columns[2]:
                return row.role.name;
        }
    }
}

