import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/utilities/modal/modal.service';
import { LoginService } from 'src/app/views/login/login.service';
import { LoginComponent } from 'src/app/views/login/login.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private modalService: ModalService,
    public loginService: LoginService
  ) { }

  ngOnInit() {
    this.loginService.loginObservable.subscribe(() => {
      this.showLoginModal();
    });
  }

  public showLoginModal(): void {
    this.modalService.openModal(LoginComponent);
  }




}
