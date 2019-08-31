import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  constructor(private meta: Meta, private title: Title) { }

  updateTitle(title: string) {
    this.title.setTitle(title);
  }

  generateTags(data: any, url: string) {
    this.title.setTitle(data.title);
    this.meta.updateTag({name: 'title', content: data.title});
    this.meta.updateTag({name: 'description', content: `${this.stripHtmlTags(data.description.substr(0, 200))}...`});

    this.meta.updateTag({name: 'twitter:card', content: 'summary_large_image'});
    this.meta.updateTag({name: 'twitter:title', content: data.title});
    this.meta.updateTag({name: 'twitter:description', content: `${this.stripHtmlTags(data.description.substr(0, 200))}...`});
    this.meta.updateTag({name: 'twitter:image', content: data.photo});

    this.meta.updateTag({property: 'og:type', content: 'article'});
    this.meta.updateTag({property: 'og:title', content: data.title});
    this.meta.updateTag({property: 'og:description', content: `${this.stripHtmlTags(data.description.substr(0, 200))}...`});
    this.meta.updateTag({property: 'og:image', content: data.photo});
    this.meta.updateTag({property: 'og:url', content: `http://localhost:4200/${url}`});
  }

  private stripHtmlTags(str: string) {
    if ((str === null) || (str === '')) {
       return false;
    } else {
    str = str.toString();
    }
    return str.replace(/<[^>]*>/g, '');
  }
}
