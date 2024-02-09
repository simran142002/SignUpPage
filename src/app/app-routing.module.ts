import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', component: SignupComponent },
  { path: 'signup', component: AppComponent },
  { path: 'verify-otp', component: VerifyOtpComponent },
  // Add other routes as needed
  { path: '**', redirectTo: '/signup' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
