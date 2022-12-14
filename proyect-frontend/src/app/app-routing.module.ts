import { LandingComponent } from './landing/landing.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, AuthGuardIn } from './guards/auth.guard';
import { SignInComponent } from './pages/auth/sign-in/sign-in.component';
import { SignUpComponent } from './pages/auth/sign-up/sign-up.component';
import { UserComponent } from './pages/user/user.component';
import { DetachablesComponent } from './pages/user/detachables/detachables.component';
import { PersonalDataComponent } from './pages/user/personal-data/personal-data.component';
import { MainAppComponent } from './pages/main-app/main-app.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      { path: '', component: LandingComponent },
      {
        path: 'app',
        component: MainAppComponent,
        canActivate: [AuthGuardIn],

        children: [
          {
            path: 'user',
            component: UserComponent,
            children: [
              {
                path: 'detachables',
                component: DetachablesComponent,
              },
              {
                path: 'personal',
                component: PersonalDataComponent,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: 'sign-in',
    component: SignInComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
