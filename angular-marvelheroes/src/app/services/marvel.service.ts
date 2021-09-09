import { Injectable , Inject} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, flatMap, toArray } from 'rxjs/operators';
import { Md5 } from 'ts-md5/dist/md5';

export interface CharacterItem {
  id: number;
  name: string;
}

export interface Character {
  id: number;
  name: string;
  description: string;
  image: string;
}


@Injectable({
  providedIn: 'root'
})
export class MarvelService {
  marvel_api_urll: string= 'https://gateway.marvel.com:443/v1/public/';
  
  constructor(private http: HttpClient, @Inject('publicKey') private publicKey: string,
  @Inject('privateKey') private privateKey: string) { 
  }

  getAPiHash(): string{
    const md5 = new Md5();
    let hashVal = md5.appendStr(`1${this.privateKey}${this.publicKey}`).end();
    console.log(String(hashVal));
    return String(hashVal);
  }

  /***
   * Get char list from marvel api
   */
  getCharacterList(): Promise<CharacterItem[]> {
    
    const params = new HttpParams()
      .set('limit', 100+ '')
      .set('ts', '1')
      .set('apikey', this.publicKey)
      .set('hash', this.getAPiHash());

    return (
      this.http.get<CharacterItem[]>(`${this.marvel_api_urll}characters`, {params})
      .pipe(
        map((v:any) =>v['data']['results']),
        flatMap(v => v),
        map((v: any) => {
          return (<CharacterItem>{id:v.id, name: v.name});
        }),
        toArray()
      )
      .toPromise()
    )
  }

  /**
   * Get the hero details / Get char details
   */
  getCharacter(id : number): Promise<Character> {
    const params = new HttpParams()
      .set('ts', '1')
      .set('apikey', this.publicKey)
      .set('hash', this.getAPiHash());
    
    return(
      this.http.get<Character>(`${this.marvel_api_urll}characters/${id}`, {params})
        .pipe(
          map((v:any) => v['data']['results'][0]),
          map((v: any) => {
            console.log(v);
            return (<Character>{
              id: v.id,
              name: v.name,
              description: v.description || 'No description',
              image: `${v.thumbnail.path}.${v.thumbnail.extension}`
            })
          })
        )
        .toPromise()
    );
  }
}
