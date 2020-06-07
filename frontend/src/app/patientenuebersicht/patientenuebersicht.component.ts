import { Component, OnInit } from '@angular/core';

declare function display_patienten(): any;
@Component({
  selector: 'app-patientenuebersicht',
  templateUrl: './patientenuebersicht.component.html',
  styleUrls: ['./patientenuebersicht.component.scss']
})
export class PatientenuebersichtComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    display_patienten()
  }

}
