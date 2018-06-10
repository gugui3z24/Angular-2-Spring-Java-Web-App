import { Directive, OnInit, Input, ElementRef, OnDestroy, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[appMask]'
})
export class MaskDirective implements OnInit, OnDestroy {

  @Input('appMask') public appMask: string;
  private destroy = new Subject<void>();

  constructor(
    private control: NgControl,
    private elementRef: ElementRef
  ) { }

  @HostListener('keydown', ['$event'])
  public onInput(event: KeyboardEvent): void {
    if (event.target['value'] != null && event.target['value'].length === this.getMaxLength() && event.key.length === 1) {
      event.preventDefault();
    }
  }

  ngOnInit() {
    this.control.valueChanges.pipe(takeUntil(this.destroy)).subscribe(value => {
      if (value != null) {
        if (value.length > this.getMaxLength()) {
          value = value.substring(0, this.getMaxLength());
        }
        const regExp = this.getMask();
        const caretPosition: number = (<HTMLInputElement>this.elementRef.nativeElement).selectionStart;
        const previousValue = value;
        const newValue = value.replace(regExp, '');
        this.control.valueAccessor.writeValue(value.replace(regExp, ''));
        const diff: number = previousValue.length - newValue.length;
        this.elementRef.nativeElement.setSelectionRange(caretPosition - diff, caretPosition - diff);
      }
    });
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

  private getMask(): RegExp {
    switch (this.appMask) {
      case 'username':
        return new RegExp(/[\W]/g);
      case 'name':
        return new RegExp(/[0-9\`\~\!\@\#\$\%\^\&\*\(\)\_\+\=\[\]\{\}\;\:\"\,\<\.\>\/\?]/g);
    }
  }

  private getMaxLength(): number {
    switch (this.appMask) {
      case 'username':
        return 25;
      case 'name':
        return 40;
    }

  }

}
