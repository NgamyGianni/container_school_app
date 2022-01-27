import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button-manage-home',
  templateUrl: './button-manage-home.component.html',
  styleUrls: ['./button-manage-home.component.css']
})
export class ButtonManageHomeComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  manageProduct(){
    console.log("I click manage product")
    this.router.navigate(['/dashboard'])
  }
}
