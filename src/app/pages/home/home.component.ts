import { Component, OnInit } from '@angular/core';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {

  constructor(private seo: SeoService) {
    seo.updateTitle('Home');
   }

  ngOnInit() {
  }

}
