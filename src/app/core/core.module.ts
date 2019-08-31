import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from '../pages/home/home.component';
import { NavbarModule } from './components/navbar/navbar.module';
import { RootStoreModule } from '../store/root-store.module';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { SharedModule } from '../shared/shared.module';
import { DISQUS_SHORTNAME } from 'ngx-disqus';



@NgModule({
  declarations: [
    FooterComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    NavbarModule,
    RootStoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    SharedModule,
  ],
  exports: [
    NavbarModule,
  ],
  providers: [
    {provide: DISQUS_SHORTNAME, useValue: 'turbo-1'}
  ]
})
export class CoreModule { }
