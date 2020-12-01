import useSWR from 'swr'
import { useContext } from 'react'
import  { fetchHelper } from '../pages/_app'
import { PositionContext } from '../pages/index'

const BaseCard = ({aqi, aqiCategory, title, updated}) =>
<div className='align-center bg-salmon grid grid-cols-4 p-6 overflow-hidden relative rounded-lg shadow-lg text-xs text-white self-center'>
    <div className="col-span-1 self-center">
        <strong className='text-3xl'>{aqi}</strong>
    </div>
    <p className='text-lg uppercase self-center'>{aqiCategory}</p>
    <div className='blend-overlay col-span-2 text-center self-center'>
        <h2 className='text-lg'>{title}</h2>
        <span>{updated}</span>
    </div>
</div>

const SkeletonLoader = () => 
<div className="rounded-lg p-6 space-between 
w-full shadow-lg">
    <div className="animate-pulse flex justify-around w-full">
        <div className="w-">
            <div className="h-3 bg-gray-400"></div>
            <div className="mt-3"/>
            <div className="h-3 bg-gray-400"></div>
        </div>
        <div className="mx-3 h-2 self-center w-full">
            <div className="h-full w-full bg-gray-400"></div>
        </div>
        <div className="h-full w-full">
            <div className="h-6 w-1/4 bg-gray-400 self-center"></div>
            <div className="mt-3"/>
            <div className="h-3 w-1/3 bg-gray-400 self-center"></div>
        </div>
    </div>
</div>

 
const CurrentPositionCard = () => {
    const { currentPosition } = useContext(PositionContext)
    const { data, error } = useSWR(currentPosition ? ['/api/mapbox', currentPosition] : null, fetchHelper, { revalidateOnFocus: false })
    if (error) return <div className='p-6 text-lg'>failed to load</div> 
    if (!data || !data['features'].length) return <SkeletonLoader />
    return (
        <BaseCard 
            title={data['features'][0]['place_name']}
            aqi={''}
            aqiCategory={''}
            updated={''}
        />
    )
}

const RemotePositionCard = () => {
    const { currentPosition, currentData } = useContext(PositionContext)
    console.log(currentData())
    // const { data, error } = useSWR(currentPosition ? ['/api/proximity', currentPosition, currentData] : null, fetchHelper)
    // if (error) return <div className='p-6 text-lg'>failed to load</div> 
    // if (!data || !currentPosition) return <SkeletonLoader />
    return (
        <BaseCard 
            title={'City'}
            aqi={'AQI'}
            aqiCategory={'299'}
            updated={'2PM PST'}
        />
    )
}



const Waves = (props) =>
<svg width='100%' height='100%' viewBox='0 0 100 100' fill='none' xmlns='http://www.w3.org/2000/svg'>
<g>
<path fillRule='evenodd' clipRule='evenodd' d='M-50 116.464L-30.7447 102.6C-11.4894 88.7363 27.0212 61.0087 65.5318 54.0768C104.042 47.1449 142.553 61.0087 181.064 56.3874C219.574 51.7661 258.085 28.6598 296.595 30.9704C335.106 33.281 373.616 61.0087 392.872 74.8725L412.127 88.7363V116.464H392.872C373.616 116.464 335.106 116.464 296.595 116.464C258.085 116.464 219.574 116.464 181.064 116.464C142.553 116.464 104.042 116.464 65.5318 116.464C27.0212 116.464 -11.4894 116.464 -30.7447 116.464H-50Z' fill='#FF4343' fillOpacity='0.5'></path>
<path fillRule='evenodd' clipRule='evenodd' d='M-50 74.7105L-30.7447 65.468C-11.4894 56.2255 27.0212 37.7404 65.5318 28.4978C104.042 19.2553 142.553 19.2553 181.064 28.4978C219.574 37.7404 258.085 56.2255 296.595 72.3999C335.106 88.5744 373.616 102.438 392.872 109.37L412.127 116.302V116.302H392.872C373.616 116.302 335.106 116.302 296.595 116.302C258.085 116.302 219.574 116.302 181.064 116.302C142.553 116.302 104.042 116.302 65.5318 116.302C27.0212 116.302 -11.4894 116.302 -30.7447 116.302H-50V74.7105Z' fill='#FF4343' fillOpacity='0.6'/>
<path fillRule='evenodd' clipRule='evenodd' d='M-50 47.172L-30.7447 56.4146C-11.4894 65.6571 27.0212 84.1422 65.5318 72.589C104.042 61.0359 142.553 19.4444 181.064 5.58061C219.574 -8.2832 258.085 5.58061 296.595 26.3763C335.106 47.172 373.616 74.8997 392.872 88.7635L412.127 102.627V116.491H392.872C373.616 116.491 335.106 116.491 296.595 116.491C258.085 116.491 219.574 116.491 181.064 116.491C142.553 116.491 104.042 116.491 65.5318 116.491C27.0212 116.491 -11.4894 116.491 -30.7447 116.491H-50V47.172Z' fill='#FF4343' fillOpacity='0.3'/>
</g>
</svg>

export {
    CurrentPositionCard,
    RemotePositionCard
}