import GeoPoint from 'geopoint'


function sortByDistance (position, locations) {
    const {lng, lat} = position;
    console.log(lng, lat)
}

export default async (req, res) => {
    if (req.method !== 'POST') {
      res.status(500).json({message: 'Accepting POST requests only.'})
    } else {
      const {lng, lat, data} = req.body
      if (lat && lng && data) {
        sortByDistance({lng, lat}, data)
        res.json({message: 'Closest Location'})
      } else {
        res.status(500).json({
          message: 'No coordinates specified.'
        })
      }
    }
  }