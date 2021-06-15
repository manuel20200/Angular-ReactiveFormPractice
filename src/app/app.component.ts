import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CustomValidators } from './custom-validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  signupForm: FormGroup;
  projectOptions = [
    "Stable",
    "Critical",
    "Finished"
  ];
  forbiddenProjectNames = ['Test'];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.signupForm = new FormGroup ({
      'projectName': new FormControl(null, [Validators.required, CustomValidators.invalidProjectName], CustomValidators.asyncInvalidProjectName),
      'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails ),
      'projectStatus': new FormControl(null)
    });
  }
    
  onSubmit() {
    console.log(this.signupForm.get('projectName').value);
    console.log(this.signupForm.get('email').value);
    console.log(this.signupForm.get('projectStatus').value);
  }

  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenProjectNames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true};
    }
    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'kike@kike.com') {
          resolve({'emailIsForbidden': true});
        } else {
          resolve(null);
        }
      }, 3000);
    });
    console.log(promise)
    return promise;
  }

}
