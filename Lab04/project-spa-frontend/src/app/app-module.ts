import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { ProjectComponet } from './project/project.componet';
import { ProjectService } from './services/project.service';

@NgModule({
  declarations: [
    App,
    ProjectComponet
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    ProjectService
  ],
  bootstrap: [ProjectComponet]
})
export class AppModule { }
