import mapboxgl from 'mapbox-gl'
import { useState, useEffect, useRef, useContext } from 'react'
import { PositionContext } from '../pages'
import { fetchHelper } from '../pages/_app'

mapboxgl.accessToken = 'pk.eyJ1IjoidGFyYWxsZW4xOSIsImEiOiJja2Y3YmJ4YnAwMHI5MnBvNHo4OXY0MHdpIn0.uI474lmE9GSPV40dLURCBw'

function createMarker(text, categoryNumber) {
    var categoryColor = (catNum) => {
        switch (catNum) {
            case 1:
                return 'bg-lightGreen'
            case 2:
                return 'bg-yellow'
            case 3:
                return 'bg-orange'
            case 4:
                return 'bg-salmon'
            case 5:
                return 'bg-red'
            case 6:
                return 'bg-brown'
            case 7:
                return 'bg-black'
            default:
                return 'bg-gray-500'
        }
    }

    let el = document.createElement('div')
    el.className = `marker ${categoryColor(categoryNumber)} flex justify-center content-center font-bold rounded-full shadow-lg bg-opacity-50`
    
    let inner = document.createElement('div')
    inner.className = `leading-none ${categoryColor(categoryNumber)} inline-flex flex-col justify-center text-center w-8 h-8 bg m-3 rounded-full`
    el.appendChild(inner)

    if (text) {
        inner.innerHTML = text
    }

    return el
}

function createPositionMarker () {
    let el = document.createElement('div')
    el.className = `marker border-8 border-double border-gray-900 h-8 w-8 bg-white rounded-full`
    return el
}

function placeMarkers (data, map, prevMarkers) {
    const markers = []
    if (data) {
        if (prevMarkers) {
            for (const marker of prevMarkers) {
                marker.remove()
            }
        }

        for (const place of data) {
            let placeLat = place['Latitude']
            let placeLng = place['Longitude']
            let marker = createMarker(place['AQI'], place['Category'])
            markers.push(new mapboxgl.Marker(marker)
            .setLngLat([placeLng, placeLat])
            .addTo(map))
        }
    }
    return markers
}

export default function Map() {
    const [ map, setMap ] = useState(null)
    const { initialPosition, updatePosition, updateData } = useContext(PositionContext)
    const [{lng, lat, zoom}, setPosition] = useState({lng: initialPosition.lng, lat: initialPosition.lat, zoom: 8})
    const [markers, setMarkers] = useState([])
    const [mapData, setMapData] = useState(null)

    const mapContainer = useRef((element) => {
        mapContainer = element
    })

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/dark-v9',
            center: [lng, lat],
            zoom: 8
        })

        let positionMarker

        map.on('load', async function () {
            setMap(map)
            positionMarker = new mapboxgl.Marker(createPositionMarker())
            .setLngLat([lng, lat])
            .addTo(map)
            try {
                let data = await fetchHelper('/api/airnowbox', {lng, lat})
                setMarkers(markers => placeMarkers(data, map, markers))
                updateData(data)
            } catch (error) {
                console.log(error)
            }

            map.resize()
        })

        map.on('click', async function (e) {
            let {lng, lat} = e.lngLat
            if (positionMarker) {
                positionMarker.remove()
                positionMarker = new mapboxgl.Marker(createPositionMarker())
                .setLngLat([lng, lat])
                .addTo(map)
            }

            setPosition({
                lng: lng.toFixed(4),
                lat: lat.toFixed(4),
                zoom: map.getZoom().toFixed(2)
            })

            updatePosition({lng, lat})

            try {
                let data = await fetchHelper('/api/airnowbox', {lng, lat})
                setMarkers(markers => placeMarkers(data, map, markers))
                updateData(data)
            } catch (error) {
                console.log(error)
            }
        })
    }, [])
    return(
        <div className="relative h-full">
            <div ref={mapContainer} className="mapContainer h-full"/>
        </div>
    )
}