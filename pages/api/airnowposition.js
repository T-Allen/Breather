// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

async function getAirData (longitude, latitude) {
  const url = `http://www.airnowapi.org/aq/observation/latLong/current/?format=application/json&latitude=${latitude}&longitude=${longitude}&API_KEY=${process.env.AIRNOW_TOKEN}`
  const response = await fetch(url)
  return response.json()
}

export default async (req, res) => {
  if (req.method !== 'POST') {
    res.status(500).json({message: 'Accepting POST requests only.'})
  } else {
    const {lng, lat} = req.body
    if (lat && lng) {
      console.log(req.body)
      try {
        const currentAirData = await getAirData(lng, lat)
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        if (currentAirData) {
          let particulateData = currentAirData.filter((record) => record['ParameterName'] == 'PM2.5')
          res.json(particulateData[0])
        } else {
          throw new Error({message: 'Could not get data from AirNow'})
        }
      } catch (e) {
        res.status(500).json({
          message: e.message ?? 'Unable to complete your request'
        })
      }
    } else {
      res.status(500).json({
        message: 'No coordinates specified.'
      })
    }
  }
}
