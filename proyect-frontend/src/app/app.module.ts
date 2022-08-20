import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { HomeComponent } from './pages/home/home.component';
import { FormComponent } from './pages/auth/form/form.component';
import { SignInComponent } from './pages/auth/sign-in/sign-in.component';
import { SignUpComponent } from './pages/auth/sign-up/sign-up.component';
import { UserComponent } from './pages/user/user.component';
import { DetachablesComponent } from './pages/user/detachables/detachables.component';
import { PersonalDataComponent } from './pages/user/personal-data/personal-data.component';
import { PreferencesComponent } from './pages/user/preferences/preferences.component';
import { MainAppComponent } from './pages/main-app/main-app.component';

import { HttpClientModule } from '@angular/common/http';
import { TopbarComponent } from './shared/components/topbar/topbar.component';

import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    HomeComponent,
    FormComponent,
    SignInComponent,
    SignUpComponent,
    UserComponent,
    PreferencesComponent,
    PersonalDataComponent,
    DetachablesComponent,
    MainAppComponent,
    TopbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    TableModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
