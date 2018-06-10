import {
  Component, Input, QueryList, ContentChildren, TemplateRef, Output, EventEmitter
} from '@angular/core';
import { TableModel } from 'src/app/components/table/table.model';
import { TableCellDirective } from 'src/app/components/table/table-cell.directive';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  @Input('tableModel') public tableModel: TableModel<any>;
  @ContentChildren(TableCellDirective) public cells: QueryList<TableCellDirective>;
  @Output('rowClick') public rowClick = new EventEmitter<any>();

  public hasCustomTemplate(column: string): boolean {
    return this.cells.some(cell => cell.appTableCell === column);
  }

  public getCustomTemplate(column: string): TemplateRef<any> {
    return this.cells.find(cell => cell.appTableCell === column).temp;
  }

  public onRowClick(row: any): void {
    this.rowClick.next(row);
  }

}
