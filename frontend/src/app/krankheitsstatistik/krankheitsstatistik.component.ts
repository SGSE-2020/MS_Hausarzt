import { Component, OnInit } from '@angular/core';

declare function display_krank_statistik(): any;

@Component({
  selector: 'app-krankheitsstatistik',
  templateUrl: './krankheitsstatistik.component.html',
  styleUrls: ['./krankheitsstatistik.component.scss']
})
export class KrankheitsstatistikComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    display_krank_statistik()
  }

}
