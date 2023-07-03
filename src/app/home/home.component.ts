import { Component } from '@angular/core';
import { UserApiService } from 'ngx-spotify';
import { map, shareReplay } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  userInfo$ = this.userApiService.getCurrentUser().pipe(shareReplay({refCount: true}));
  userName$ = this.userInfo$.pipe(map(user => user.display_name))

  constructor(private userApiService: UserApiService) {
  }

}
