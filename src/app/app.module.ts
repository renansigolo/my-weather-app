import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'
import {HttpClientModule} from '@angular/common/http'

import {AppRoutingModule} from './app-routing.module'
import {AppComponent} from './app.component'
import {HomeComponent} from './home/home.component'

import {ApiService} from './api.service'

import {BrowserAnimationsModule} from '@angular/platform-browser/animations'

import {MatButtonToggleModule} from '@angular/material/button-toggle'
import {MatCardModule} from '@angular/material/card'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import {MatButtonModule} from '@angular/material/button'

@NgModule({
	declarations: [AppComponent, HomeComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		BrowserAnimationsModule,
		MatButtonToggleModule,
		MatProgressSpinnerModule,
		MatCardModule,
		MatButtonModule
	],
	providers: [ApiService],
	bootstrap: [AppComponent]
})
export class AppModule {}
