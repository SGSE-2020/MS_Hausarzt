import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImpressumComponent } from './impressum/impressum.component';
import { KrankheitsstatistikComponent } from './krankheitsstatistik/krankheitsstatistik.component';
import { ProfilComponent } from './profil/profil.component';
import { MitarbeiteruebersichtComponent } from './mitarbeiteruebersicht/mitarbeiteruebersicht.component';
import { TermineComponent } from './termine/termine.component';
import { PatientenuebersichtComponent } from './patientenuebersicht/patientenuebersicht.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'impressum', component: ImpressumComponent },
  { path: 'krankheitsstatistik', component: KrankheitsstatistikComponent },
  { path: 'profil', component: ProfilComponent },
  { path: 'termine', component: TermineComponent },
  { path: 'patientenuebersicht', component: PatientenuebersichtComponent },
  { path: 'mitarbeiteruebersicht', component: MitarbeiteruebersichtComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
