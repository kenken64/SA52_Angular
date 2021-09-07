import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-font-size',
  templateUrl: './font-size.component.html',
  styleUrls: ['./font-size.component.css']
})
export class FontSizeComponent implements OnInit {
  @Input() message: string = "";
  @Output() onFontSize = new EventEmitter<number>();
  fontSize: string = '10em';

  constructor() { }

  ngOnInit(): void {
    console.log()
  }

  fontSizeChanged($event: any){
    console.log("sliding ...");
    const fontSize = parseInt($event.target.value);
    this.fontSize = `${fontSize}em`;
    console.log(this.fontSize);
    this.onFontSize.next(fontSize);
  }

}
