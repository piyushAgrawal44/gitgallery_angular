import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from  '@angular/common/http';
import { SearchUserComponentComponent } from './components/search-user-component/search-user-component.component';
import { SearchRepoComponentComponent } from './components/search-repo-component/search-repo-component.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchUserComponentComponent,
    SearchRepoComponentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
