import { Component, OnInit, OnDestroy } from '@angular/core';
import { OverlayService } from 'src/app/utilities/overlay/overlay.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss']
})
export class OverlayComponent implements OnInit, OnDestroy {

  private destroy = new Subject<void>();
  public showOverlay: boolean;

  constructor(
    private overlayService: OverlayService,
  ) { }

  ngOnInit() {
    this.overlayService.overlay$.pipe(takeUntil(this.destroy)).subscribe((showOverlay: boolean) => {
      this.showOverlay = showOverlay;
    });
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
    this.overlayService.overlay$.complete();
  }

}
