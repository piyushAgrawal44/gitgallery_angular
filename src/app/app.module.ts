import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from  '@angular/common/http';
import { SearchUserComponentComponent } from './components/search-user-component/search-user-component.component';
import { SearchRepoComponentComponent } from './components/search-repo-component/search-repo-component.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { AppRoutingModule } from './app-routing.module';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ModalComponent } from './components/modal/modal.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CacheInterceptor } from './cache.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    SearchUserComponentComponent,
    SearchRepoComponentComponent,
    PaginationComponent,
    NotfoundComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CacheInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
