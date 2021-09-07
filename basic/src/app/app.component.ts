import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title= "Kenneth Phang";
  numberOfPpl = 10;
  fruits = ['Apple', 'Orange', 'Jackfruit', 'Durian'];
  isDisabled = true;
  
  pressButton(){
    console.log("pressed !");
    this.isDisabled= false;
  }

  pressButton2Disable(){
    this.isDisabled = true;
  }

  sizeChanged($event: any){
    console.log("sized changed listening ..");
  }
}
