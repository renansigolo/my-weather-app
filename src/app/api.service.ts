import {Injectable} from '@angular/core'
import {HttpClient, HttpParams} from '@angular/common/http'
import {Observable} from 'rxjs'
// import {environment} from '../environments/environment'

@Injectable({
	providedIn: 'root'
})
export class ApiService {
	readonly ROOT_URL =
		'https://us-central1-my-weather-js.cloudfunctions.net/darkSkyProxy'

	constructor(public http: HttpClient) {}

	// getCurrentWeather(): Observable<any> {
	// 	// const endpointApi: string = `${environment.api.url}weather?lat=${lat}&lon=${lon}&appid=${environment.api.key}`
	// 	// const endpointApi: string = `${environment.api.url}weather?lat=-33.8675162&lon=151.20591009999998&appid=${environment.api.key}`
	//
	// 	return this.http.get<any>(endpointApi, this.httpOptions)
	// }

	// getForecast(lat, lon): Observable<any> {
	// 	const endpointApi: string = `${
	// 		environment.api.url
	// 	}forecast?lat=${lat}&lon=${lon}&appid=${environment.api.key}`
	//
	// 	return this.http.get<any>(endpointApi, this.httpOptions)
	// }

	currentForecast(lat: number, lng: number): Observable<any> {
		let params = new HttpParams()
		params = params.set('lat', lat.toString())
		params = params.set('lng', lng.toString())

		return this.http.get(this.ROOT_URL, {params})
	}
}
