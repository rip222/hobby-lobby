import { Component, OnInit } from '@angular/core';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'not-found',
  templateUrl: './not-found.component.html',
  styles: []
})
export class NotFoundComponent implements OnInit {

  constructor(private seo: SeoService) {
    seo.updateTitle('Page Not Found');
   }

  ngOnInit() {
  }

}
