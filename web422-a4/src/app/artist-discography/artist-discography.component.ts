import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css']
})
export class ArtistDiscographyComponent implements OnInit {

  albums: any;
  artist: any;
  routeSub: any;
  artistSub: any;
  albumByArtistSub: any;

  constructor(private musicService: MusicDataService, private route: ActivatedRoute) { }


  ngOnInit(): void {

    this.routeSub = this.route.params.subscribe(params=>{
      this.artistSub = this.musicService.getArtistById(params.id).subscribe(artistData => this.artist = artistData);

      this.albumByArtistSub = this.musicService.getAlbumsByArtistId(params.id).subscribe(albumData => {
         this.albums = albumData.items.filter((curValue, index, self) => self.findIndex(t => t.name.toUpperCase() === curValue.name.toUpperCase()) === index)
      
    
     });
  });
}



  ngOnDestroy(): void{
    this.artistSub.unsubscribe();
    this.routeSub.unsubscribe();
    this.albumByArtistSub.unsubscribe();
  }

}
