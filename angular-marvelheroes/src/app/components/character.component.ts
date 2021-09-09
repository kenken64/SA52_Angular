import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { MarvelService, Character} from '../services/marvel.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {
  character?: Character;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private marvelSvc : MarvelService) { }

  ngOnInit(): void {
    this.marvelSvc.getCharacter(this.activatedRoute.snapshot.params.id)
      .then(result=> {
        this.character = result;
      })
  }

  back(){
    this.router.navigate(['/']);
  }

}
