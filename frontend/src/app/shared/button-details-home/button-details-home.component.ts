import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button-details-home',
  templateUrl: './button-details-home.component.html',
  styleUrls: ['./button-details-home.component.css']
})
export class ButtonDetailsHomeComponent implements OnInit {
  displayList!:boolean;
  @Output() getDetailsProduct = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
    this.displayList=false
    console.log('initalization displayList',this.displayList)
    this.getDetailsProduct.emit(this.displayList)
  }
  onGetDetailsProducts(){
      console.log("I clicked get details products")
     this.displayList=!this.displayList
     this.getDetailsProduct.emit(this.displayList)
    console.log("Send home to show/not list products",this.displayList)
  }
  test(){
    console.log("test");
  }

}
