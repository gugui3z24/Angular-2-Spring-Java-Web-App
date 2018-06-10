import { Article } from 'src/app/interfaces';
import { TableModel } from 'src/app/components/table/table.model';

export class ManageArticleTableModel implements TableModel<Article> {
    public columns = ['Subject', 'Date', 'Posted', 'Modified', 'Category'];
    public tableData: Article[];
    public getRowData(columnName: string, row: Article): any {
        switch (columnName) {
            case this.columns[0]:
                return row.subject;
            case this.columns[1]:
                return row.createdAt;
            case this.columns[2]:
                return row.creator.fullName;
            case this.columns[3]:
                return row.lastModifier.fullName;
            case this.columns[4]:
                return row.category.name;
        }
    }
}

