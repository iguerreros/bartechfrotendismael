import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private tokenService: TokenService,
    private router : Router
    ) { }

  ngOnInit() {
    if (this.tokenService.getToken()) {
        this.router.navigate(['principal/']);
    }else {
        this.router.navigate(['login/']);
    }
  }
}
