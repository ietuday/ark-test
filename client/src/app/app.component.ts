import { Component, OnInit } from '@angular/core';
import { LoadingService } from './core/services/loading/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Mindbowser assignment';
  isLoading = false;
  constructor(private loadingService: LoadingService){}

  ngOnInit(){
    this.loadingService.loadingState.subscribe(res => {
      this.isLoading = res.active;
    })
  }
}
