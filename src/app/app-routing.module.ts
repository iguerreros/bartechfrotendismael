import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { NuevoreusuarioComponent } from './auth/nuevoreusuario/nuevoreusuario.component';
import { PrincipalComponent } from './principal/principal.component';
import { ProdGuardService as guard } from './guards/prod-guard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'registro', component: NuevoreusuarioComponent},
  { path: 'principal', component: PrincipalComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user'] } },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
