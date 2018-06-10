import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationUser } from 'src/app/interfaces';
import { take } from 'rxjs/operators';
import { FormatUtil } from 'src/app/utilities/format-util';
import { LoginService } from 'src/app/views/login/login.service';
import { ManageUserTableModel } from 'src/app/views/staff/user/manage-user/manage-user-table';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {

  public tableModel = new ManageUserTableModel();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.activatedRoute.data.pipe(take(1)).subscribe((data: { users: ApplicationUser[] }) => {
      data.users = data.users.filter(user => user.username !== this.loginService.getUsername());
      data.users.map(user => user.role = FormatUtil.getRoleName(user.role));
      const users = data.users.sort((a: ApplicationUser, b: ApplicationUser) => {
        return a.username.localeCompare(b.username);
      });
      this.tableModel.tableData = users;
    });
  }

  public editUser(id: number): void {
    this.router.navigate(['/edit-user', id]);
  }

}
