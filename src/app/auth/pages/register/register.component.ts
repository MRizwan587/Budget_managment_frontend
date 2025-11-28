import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm!: FormGroup;
  errorMessage='';
  hidePassword = true;
  hideConfirmPassword = true;
  data: any=null;
  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService){}

  ngOnInit(): void {

    this.registerForm= this.fb.group({
      name : ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern( /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{6,}$/)]],
      confirmPassword: ['', [Validators.required]]
    },{
      Validators: this.passwordMatch.bind(this)
    }

    )
  }

    passwordMatch(form: FormGroup){
      const pass= form.get("password");
      const confPass= form.get("confirmPassword");
      if (!pass || !confPass){
        return null
      }
      return pass.value === confPass ? null : { passwordMismatch: true};
    }
  
    onSubmit(){
       
      if (this.registerForm.invalid){ 
        
        Object.keys(this.registerForm.controls).forEach((key)=>{
          this.registerForm.get(key)?.markAsTouched();
        });
        return;
          } 

        this.errorMessage="";
        const registerData ={
          name: this.registerForm.value.name,
          email: this.registerForm.value.email,
          password: this.registerForm.value.password,
          role: "admin" //default
        };

        this.authService.register(registerData).subscribe({
      next: (response) => {
        if (response.success) {
          // Navigate to dashboard on success
           console.log('this is register form data: ', registerData);
           this.data=response.data.user;
        localStorage.setItem("user", JSON.stringify(this.data)) ;
          this.router.navigate(["/auth/onboarding"]);
        } else {
          this.errorMessage = response.message || "Registration failed";
        }
      },
      error: (error) => {
        this.errorMessage =
          error.error?.message || "An error occurred during registration";
      },
    });
        
      } 
    

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

    get name(){
      return this.registerForm.get('name')
    }
    get email(){
      return this.registerForm.get('email')
    }
    get password(){
      return this.registerForm.get('password')
    }
    get confirmPassword(){
      return this.registerForm.get('confirmPassword')
    }

    
      navigateToLogin(): void {
    this.router.navigate(["/login"], { replaceUrl: true });
  }
}
