import { Injectable } from '@angular/core';
import { ApplicationUser } from 'src/app/interfaces';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/views/staff/user/user.service';

@Injectable()
export class ManagerUserResolverService implements Resolve<ApplicationUser[]> {

  constructor(private userService: UserService) { }

  resolve(): ApplicationUser[] | Observable<ApplicationUser[]> | Promise<ApplicationUser[]> {
    return this.userService.getAllUsers();
  }
}
