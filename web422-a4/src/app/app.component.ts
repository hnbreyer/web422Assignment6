/*********************************************************************************
* WEB422 – Assignment 06
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part of this
* assignment has been copied manually or electronically from any other source (including web sites) or 
* distributed to other students.
* 
* Name: _Helen Nunes Breyer_ Student ID: _120046198_ Date: _10/04/2021_
*
********************************************************************************/ 


import { Component, OnInit } from '@angular/core';
import { Event, NavigationStart, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'web422-a6';

  searchString: string;
  token: any;

  constructor(private router: Router, private auth: AuthService){}

  ngOnInit(){
    this.router.events.subscribe((event: Event) => {
      if(event instanceof NavigationStart){
        this.token = this.auth.readToken();
      }
    })
  }

  handleSearch(){
    this.router.navigate(["/search"], {queryParams: {q: this.searchString}});
    console.log(this.searchString);
    this.searchString = "";
  }

  logout(){
    localStorage.clear();
    this.router.navigate(["/login"]);
  }
}
