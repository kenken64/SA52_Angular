import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterComponent } from './components/character.component';
import { HeroListComponent } from './components/hero-list.component';

const routes: Routes = [
  {path: "", component: HeroListComponent},
  {path: "list", component: HeroListComponent},
  {path: "character/:id", component: CharacterComponent},
  {path: "**", redirectTo: "/", pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
