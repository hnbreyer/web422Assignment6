import { Component, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  favourites: Array<any>;
  favSub: any;

  constructor(private musicService: MusicDataService) { }

  ngOnInit(): void {

    this.favSub = this.musicService.getFavourites().subscribe(fav=> this.favourites = fav.tracks);
  }

  removeFromFavourites(id){
    this.musicService.removeFromFavourites(id).subscribe(data =>{
      this.favourites = data.tracks;
    })
  }

  
  ngOnDestroy(): void{
    this.favSub.unsubscribe();
  }


}

