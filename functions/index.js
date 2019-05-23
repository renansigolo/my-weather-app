const functions = require('firebase-functions')
const http = require('requestify')
const cors = require('cors')({origin: true})
// const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);

exports.darkSkyProxy = functions.https.onRequest((req, res) => {
	// Wrap request with cors
	cors(req, res, () => {
		// Get the url params
		const lat = req.query.lat
		const lng = req.query.lng

		const url = formatUrl(lat, lng)

		// Send request to DarkSky
		return http
			.get(url)
			.then(response => {
				return res.status(200).send(response.getBody())
			})
			.catch(err => {
				return res.status(400).send(err)
			})
	})
})

/// Helper to format the request URL
function formatUrl(lat, lng) {
	// const apiKey = firebaseConfig.darksky.key
	// console.log(apiKey)
	return `https://api.darksky.net/forecast/a2ff65ae8d6595bd01f771eb709e80c4/${lat},${lng}?units=si`
}
