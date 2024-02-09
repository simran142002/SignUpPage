import { Component, OnInit, Renderer2, ElementRef} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrl: './verify-otp.component.css'
})
export class VerifyOtpComponent implements OnInit{
  email: string = '';
  otp: string[] = ['', '', '', '', '', ''];
  timer: number = 40; // Set the timer duration in seconds
  countdown: any;
  otpVerified: boolean = false;

  constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router,     private renderer: Renderer2,
    private el: ElementRef) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.email = params['email'];
    });

    // Start the timer
    this.startTimer();

  }

  focusNext(index: number) {
    if (index < this.otp.length) {
      const nextInput = this.el.nativeElement.querySelectorAll('input')[index];
      nextInput.focus();
    }
  }

  startTimer() {
    this.countdown = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        // Timer expired, navigate back to signup
        this.router.navigate(['/signup']);
      }
    }, 1000);
  }

  onLastInput() {
    // this.verifyOtp();
  }

  verifyOtp() {
    if (!this.otpVerified) { // Check if OTP is not already verified
      const fullOtp = this.otp.join('');
      
      this.apiService.verifyOtp(this.email, fullOtp).subscribe(
        response => {
          clearInterval(this.countdown); // Stop the timer
          this.otpVerified = true; // Set the flag to avoid duplicate verifications
          this.router.navigate(['/success']);
        },
        error => {
          console.error(error);
        }
      );
    }
  }
}
