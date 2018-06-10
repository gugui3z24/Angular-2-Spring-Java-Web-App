import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../utilities/modal/modal.service';
import { LoginService } from './login.service';
import { ApplicationUser } from 'src/app/interfaces';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public user = <ApplicationUser>{};

  constructor(
    public modalService: ModalService,
    private loginService: LoginService
  ) { }

  ngOnInit() {

  }

  public submit(): void {
    this.user.username = this.user.username.toLowerCase();
    this.loginService.login(this.user).pipe(take(1)).subscribe(null, () => {});
  }

}
