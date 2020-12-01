import GeoPoint from 'geopoint'

async function fetchBBoxData (minX, minY, maxX, maxY) {
  const url = `http://www.airnowapi.org/aq/data/?parameters=PM25&BBOX=${minX},${minY},${maxX},${maxY}&dataType=A&format=application/json&verbose=1&nowcastonly=1&includerawconcentrations=0&API_KEY=${process.env.AIRNOW_TOKEN}`
  const response = await fetch(url);
  return response.json();
}

export default async (req, res) => {
  if (req.method !== 'POST') {
    res.status(500).json({message: 'Accepting POST requests only.'})
  } else {
    const {lng, lat, distance} = req.body;
    if (lng && lat) {
      let point = new GeoPoint(parseFloat(lat), parseFloat(lng))
      let bbox = point.boundingCoordinates(distance ?? 500, null, true)
      let minX = bbox[0].longitude()
      let maxX = bbox[1].longitude()
      let minY = bbox[0].latitude()
      let maxY = bbox[1].latitude()

      try {
        const data = await fetchBBoxData(minX, minY, maxX, maxY);
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(data)
      } catch {
        res.status(500).json({
          message: 'Could not get air quality information.'
        })
      }
    } else {
      res.status(500).json({
        message: 'No coordinates specified.'
      })
    }
  }
}
