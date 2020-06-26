import { Component, OnInit } from '@angular/core';

declare function display_self(): any;
@Component({
  selector: 'app-termine',
  templateUrl: './termine.component.html',
  styleUrls: ['./termine.component.scss']
})
export class TermineComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    display_self()
  }

}
