export default async (req, res) => {
    const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN
    const baseUrl = 'https://api.mapbox.com'

    if (req.method != 'POST') {
        res.status(500).json({message: 'Only accepting POST requests'})
    } else if (req.body.lat && req.body.lng) {
        const {lng, lat} = req.body
        try {
            const mapboxSearchResponse = await fetch(`${baseUrl}/geocoding/v5/mapbox.places/${lng},${lat}.json?types=place&access_token=${MAPBOX_TOKEN}`)
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.json(mapboxSearchResponse.body)
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.send(500).json({message: 'Invalid Request'})
    }
}