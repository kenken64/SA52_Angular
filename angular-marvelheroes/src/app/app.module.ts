import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MaterialModule  } from './material.module';
import { CharacterComponent } from './components/character.component';
import { HeroListComponent } from './components/hero-list.component';
import { HttpClientModule } from '@angular/common/http';
import { MarvelService } from './services/marvel.service';

@NgModule({
  declarations: [
    AppComponent,
    CharacterComponent,
    HeroListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    { provide: 'publicKey', useValue: '76ee705b0c648cd243529c1870cfbf79' },
    { provide: 'privateKey', useValue: '9ec118cdd907df89f157b4f2625c5b0abb670bd7' },
    MarvelService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
