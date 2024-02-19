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
import { CacheInterceptor } from './interceptors/cache.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    SearchUserComponentComponent,
    SearchRepoComponentComponent,
    PaginationComponent,
    NotfoundComponent, // not found page 
    ModalComponent, // modal component to show repository details
  ],
  imports: [
    BrowserModule, // core features
    HttpClientModule, // to hit http request
    FormsModule, // to use ngModel
    AppRoutingModule, // for routing
    ToastrModule.forRoot(),  // fo showing toaster 
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CacheInterceptor, // Interceptor for caching API response and using them
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})


export class AppModule { }
