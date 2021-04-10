import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit, OnDestroy {

  results: any;
  searchQuery: string;
  routeSub: any;
  resultSub: any;

  constructor(private route: ActivatedRoute, private musicService: MusicDataService) { }

  ngOnInit(): void {
    
    this.routeSub = this.route.queryParams.subscribe(params=>{
     this.searchQuery = params['q'];

      this.resultSub = this.musicService.searchArtists(this.searchQuery).subscribe(data => {
         this.results = data.artists.items.filter(artist => artist.images.length > 0)
      });
  });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
    this.resultSub.unsubscribe();
  }

}
