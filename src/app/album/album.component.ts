import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';


@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  album: any;
  routeSub: any;
  albumByIdSub: any;
  addFavouritesSub: any;

  constructor(private Snack: MatSnackBar, private musicService: MusicDataService, private route: ActivatedRoute) { }

  @Output() customEvent = new EventEmitter();

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params=>{
      this.albumByIdSub = this.musicService.getAlbumById(params.id).subscribe(albumData => this.album = albumData);
      
    });
  }

  addToFavourites(trackID){
      this.musicService.addToFavourites(trackID).subscribe(data=>{
          this.customEvent.emit(
            this.Snack.open("Adding to Favourites...", "Done", {duration: 1500})
          )
      }, err => {
        this.customEvent.emit(
          this.Snack.open("Adding to Favourites...", "Unable to add song to Favourites", {duration: 1500})
        )

      })
  }

  
  ngOnDestroy(): void{
    this.albumByIdSub.unsubscribe();
    this.routeSub.unsubscribe();
  }
}

