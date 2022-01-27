import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  background: Record<string, string>={};
  colorText: Record<string, string>={};
  constructor(public router:Router) { }

  ngOnInit(): void {
    this.background={"background-color":"aqua",}
    this.colorText={"color":"black"}
  }

 }

