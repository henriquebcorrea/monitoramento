import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { KanbanBoardComponent } from './kanban-board/kanban-board.component';
import { BoardSettingsComponent } from './board-settings/board-settings.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'board', component: KanbanBoardComponent, canActivate: [] },
  { path: 'board/:id', component: KanbanBoardComponent, canActivate: [] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    KanbanBoardComponent,
    BoardSettingsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
