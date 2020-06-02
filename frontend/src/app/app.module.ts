import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { ProfilComponent } from './profil/profil.component';
import { KrankheitsstatistikComponent } from './krankheitsstatistik/krankheitsstatistik.component';
import { HomeComponent } from './home/home.component';
import { PatientenuebersichtComponent } from './patientenuebersicht/patientenuebersicht.component';
import { TermineComponent } from './termine/termine.component';
import { MitarbeiteruebersichtComponent } from './mitarbeiteruebersicht/mitarbeiteruebersicht.component';

@NgModule({
  declarations: [
    AppComponent,
    ImpressumComponent,
    ProfilComponent,
    KrankheitsstatistikComponent,
    HomeComponent,
    PatientenuebersichtComponent,
    TermineComponent,
    MitarbeiteruebersichtComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
