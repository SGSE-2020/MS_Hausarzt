import { Component, OnInit } from '@angular/core';

declare function find(): any;
declare function display_patientenakte(user_id, name): any;
declare var username: any;
@Component({
  selector: 'app-termine',
  templateUrl: './termine.component.html',
  styleUrls: ['./termine.component.scss']
})
export class TermineComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    find()
    if (document.cookie.length > 20) {
      console.log(username)
      display_patientenakte(document.cookie, username)
    }
  }

}
