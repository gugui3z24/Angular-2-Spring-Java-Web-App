import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.scss']
})
export class DiscussionComponent implements OnInit, OnDestroy {

  private destroy = new Subject<void>();
  public pageId: string;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.pipe(takeUntil(this.destroy)).subscribe((data: ParamMap) => {
      this.pageId = data.get('id');
    });
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

}
