import { Directive, OnInit, Input, ElementRef, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appTableCell]'
})
export class TableCellDirective implements OnInit {

  @Input('appTableCell') public appTableCell: string;

  constructor(public el: ElementRef, public temp: TemplateRef<any>) { }

  ngOnInit() {
  }

}
