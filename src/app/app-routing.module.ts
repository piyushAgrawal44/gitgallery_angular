import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchUserComponentComponent } from './components/search-user-component/search-user-component.component';
import { SearchRepoComponentComponent } from './components/search-repo-component/search-repo-component.component';
import { NotfoundComponent } from './components/notfound/notfound.component';

const routes: Routes = [
  { path: 'search/repo', component: SearchRepoComponentComponent ,pathMatch: 'full'},
  { path: '', component: SearchUserComponentComponent,pathMatch: 'full' },
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
