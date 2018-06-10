import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaskDirective } from 'src/app/utilities/mask/mask.directive';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    MaskDirective,
    HeaderComponent
  ],
  exports: [
    MaskDirective,
    HeaderComponent
  ]
})
export class UtilityModule { }
