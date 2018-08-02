import {Component, OnInit} from '@angular/core'
import {ApiService} from '../api.service'
import {Observable} from 'rxjs'

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	forecast: Observable<any>
	iconName: string = 'my_location'
	introTxt: string
	isReady: boolean = false
	lat: number
	lng: number
	locationState: string
	nav: any = navigator
	temperature: any
	unit: string = 'C'

	constructor(private api: ApiService) {}

	ngOnInit() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(position => {
				this.lat = position.coords.latitude
				this.lng = position.coords.longitude
				this.getForecast()
			})
		} else {
			alert('Geolocation might not be supported by this browser.')
		}

		this.handlePermission()
	}

	getForecast() {
		this.api.currentForecast(this.lat, this.lng).subscribe(data => {
			this.temperature = data.currently.temperature
			this.forecast = data.daily.data
			this.isReady = true
		})
	}

	convertTemperature(evt) {
		if (evt === 'F') {
			this.toFahrenheit()
		} else if (evt === 'C') {
			this.toCelsius()
		}
	}

	toCelsius() {
		this.temperature = (this.temperature - 32) / 1.8
	}

	toFahrenheit() {
		this.temperature = this.temperature * 1.8 + 32
	}

	weatherIcon(icon) {
		switch (icon) {
			case 'partly-cloudy-day':
				return 'wi wi-day-cloudy'
			case 'clear-day':
				return 'wi wi-day-sunny'
			case 'partly-cloudy-night':
				return 'wi wi-night-partly-cloudy'
			default:
				return `wi wi-night-partly-cloudy`
		}
	}

	handlePermission() {
		this.nav.permissions.query({name: 'geolocation'}).then(result => {
			if (result.state === 'prompt') {
				this.introTxt = 'Please allow us to use your location'
				navigator.geolocation.getCurrentPosition(
					this.getForecast,
					this.handleLocationError
				)
			} else if (result.state === 'granted') {
				this.permissionGranted()
			} else if (result.state === 'denied') {
				this.permissionDeclined()
			}
			result.onchange = () => {
				switch (result.state) {
					case 'denied':
						return this.permissionDeclined()
					case 'granted':
						return this.permissionGranted()
				}
			}
		})
	}

	permissionGranted() {
		this.introTxt = 'Hold on...'
		this.iconName = 'my_location'
	}

	permissionDeclined() {
		this.introTxt = `Sorry but we'll keep spinning this circle until your location has been permitted
				 🤷`
		this.iconName = 'location_disabled'
		this.locationState = 'denied'
	}

	handleLocationError(error) {
		switch (error.code) {
			case 3:
				// alert('Deal with timeout')
				console.log('Deal with timeout')
				break
			case 2:
				// alert('Device cannot get data')
				console.log('Device cannot get data')
				break
			case 1:
				// alert(`User said no ☹️`)
				console.log('User said no ☹️')
		}
	}
}
