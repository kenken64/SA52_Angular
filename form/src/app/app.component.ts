import { Component, OnInit, OnDestroy} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Rsvp } from './Rsvp';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'form';
  model = new Rsvp('', '', '');

  ngOnInit(){
    // init
  }

  ngOnDestroy(){
    // destroy
  }

  processForm(form: NgForm){
    console.log(form);
    const name = form.controls['name'].value;
    const email = form.controls['email'].value;
    const phone = form.controls['phone'].value;
    const attending = form.controls['attending'].value;
    console.log(`${name} ${email} ${phone} ${attending}`);
    form.reset();
  }
}
