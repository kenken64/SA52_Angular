import { Component, OnInit } from '@angular/core';
import { CharacterItem, MarvelService } from '../services/marvel.service';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.css']
})
export class HeroListComponent implements OnInit {
  characters : CharacterItem[] = [];

  constructor(private marvelSvc: MarvelService) { }

  ngOnInit(): void {
    this.marvelSvc.getCharacterList()
      .then(result => {
        this.characters = result;
      }).catch(error =>{
        console.log(error);
      });
  }

}
