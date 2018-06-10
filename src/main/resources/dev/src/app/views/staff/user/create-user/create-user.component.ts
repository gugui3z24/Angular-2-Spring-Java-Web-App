import { Component, OnInit, ViewChild } from '@angular/core';
import { ApplicationUser, Role } from 'src/app/interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { take } from 'rxjs/operators';
import { FormatUtil } from 'src/app/utilities/format-util';
import { AlertConfig } from 'src/app/utilities/alert/alert-config';
import { AlertService } from 'src/app/utilities/alert/alert.service';
import { Router } from '@angular/router';
import { StringUtil } from 'src/app/utilities/string-util';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/views/staff/user/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  public user = <ApplicationUser>{
    role: <Role>{}
  };
  public roles: Role[] = [];
  public confirm: string;
  @ViewChild('form') private form: NgForm;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit() {
    this.http.get<Role[]>(environment.apiUrl + '/api/role').pipe(take(1)).subscribe(roles => {
      this.roles = FormatUtil.getRolesName(roles);
    });
  }

  public save() {
    const user = { ...this.user };
    user.first = user.first.toLowerCase();
    user.last = user.last.toLowerCase();
    user.username = user.username.toLowerCase();
    this.userService.createUser(user).pipe(take(1)).subscribe(() => {
      const config = <AlertConfig>{};
      config.dismissible = true;
      config.message = `Successfully registered ${user.username}!`;
      config.icon = '<i class="fas fa-info-circle"></i>';
      config.type = 'primary';
      this.alertService.showAlert(config);
      this.router.navigate(['..']);
    }, () => {
      const config = <AlertConfig>{};
      config.dismissible = true;
      config.icon = '<i class="fas fa-exclamation-triangle"></i>';
      config.message = 'Username is taken. Please try again.';
      config.title = '403 - Forbidden';
      config.type = 'danger';
      config.timer = 3000;
      this.alertService.showAlert(config);
    });
  }

  public validatePasswords(): void {
    if (StringUtil.isBlank(this.user.password) || StringUtil.isBlank(this.confirm)) {
      this.form.controls['confirm-password'].setErrors(null);
      return;
    }
    if (this.user.password !== this.confirm) {
      this.form.controls['confirm-password'].setErrors({ 'mismatch': true });
    } else {
      this.form.controls['confirm-password'].setErrors(null);
    }
  }

}
