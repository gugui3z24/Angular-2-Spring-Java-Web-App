import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/views/login/login.service';
import { ModalService } from 'src/app/utilities/modal/modal.service';
import { ModalConfig } from 'src/app/utilities/modal/modal-config';

@Injectable()
export class ModeratorGuard implements CanActivate {

  constructor(
    private loginService: LoginService,
    private modalService: ModalService
  ) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    const role = this.loginService.getRole();
    const allowedAccess = role === 'ROLE_MODERATOR' || role === 'ROLE_ADMIN';
    if (!allowedAccess) {
      const config = <ModalConfig>{};
      config.title = '401 - Unauthorized';
      config.dismissable = true;
      this.modalService.openModal('You do not have access to this page. You must be a Moderator or higher.', config);
    }
    return allowedAccess;
  }
}
