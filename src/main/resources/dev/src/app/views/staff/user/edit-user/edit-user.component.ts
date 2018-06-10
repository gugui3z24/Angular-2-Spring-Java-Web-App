import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { ApplicationUser, Role } from 'src/app/interfaces';
import { FormatUtil } from 'src/app/utilities/format-util';
import { UserService } from 'src/app/views/staff/user/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  public user: ApplicationUser;
  public roles: Role[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.data.pipe(take(1)).subscribe(data => {
      data.data[0] = FormatUtil.getRolesName(data.data[0]);
      data.data[1].role = FormatUtil.getRoleName(data.data[1].role);
      this.roles = data.data[0];
      this.user = data.data[1];
    });
  }

  public save(): void {
    const user = { ...this.user };
    user.first = user.first.toLowerCase();
    user.last = user.last.toLowerCase();
    this.userService.updateUser(user).pipe(take(1)).subscribe(() => {
      this.router.navigate(['/manage-user']);
    }, () => { });
  }

}
