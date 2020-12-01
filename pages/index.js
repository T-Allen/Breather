import Head from 'next/head'
import { CurrentPositionCard, RemotePositionCard } from '../components/cards'
import { TextButton } from '../components/buttons'
import Map from '../components/map'
import React, {useEffect, useState} from 'react'
import { fetchHelper } from "./_app"
import useSWR from 'swr'

export const PositionContext = React.createContext({})
export const AirDataContext = React.createContext()


export default function Home() {
  const [permission, setPermission] = useState(false)
  const [prompt, locationPrompt] = useState(true)
  const [show, setShowDialog] = useState(true)
  const [initPosition, setInitPosition] = useState(null)
  const [currentPos, setCurrentPos] = useState(null)
  const [remoteCard, showRemoteCard] = useState(false)
  const [data, setData] = useState(null)
  
  useEffect(() => {
    if (typeof(document) !== undefined) {
      if (permission && !initPosition && navigator.geolocation) { 
        navigator.geolocation.getCurrentPosition((position) => {
          setInitPosition({
            lng: position.coords.longitude,
            lat: position.coords.latitude, 
          })
          setCurrentPos({
            lng: position.coords.longitude,
            lat: position.coords.latitude, 
          })
        }, (error) => {
          // Set Error State
        })
      }
    }
  })

  function handlePermission(e, accept = false) {
    e.preventDefault()
    if (accept) {
      setPermission(true)
    } else {
      //
    }

    locationPrompt(false)
    setTimeout(() => {
      setShowDialog(false)
    }, 500)
  }

  function toggleRemoteCard() {
    showRemoteCard(true)
  }

  function getData() {
    return data
  }

  return (
    <>
      <Head>
        <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css' rel='stylesheet' />
      </Head>
      <div className="container flex flex-col justify-center p-6 mx-auto lg:h-screen xl:w-9/12">
        <h1 className="mb-6">where is the air</h1>
        <div className={`${!prompt ? 'opacity-0 translate-y-1/2' : ''} ${!show ? 'hidden': 'block'} fixed bottom-0 mb-6 max-w-xs p-6 rounded-lg shadow-xl transition ease-out duration-500 opacity transform`}>
          <p className="mb-3 text-sm">This website requires location services. If you accept, location data including your precise latitude and longitude will be sent to AirNow to determine air quality at your location.</p>
          <div className="flex">
            <TextButton background="bg-gray-400 hover:bg-gray-500" text="No Thanks" click={(e) => handlePermission(e)} />
            <div className='mx-1'/>
            <TextButton background="bg-lightGreen hover:bg-green-500" text="Accept" click={(e) => handlePermission(e, true)}/>
          </div>
        </div>
        {(permission) &&
        <PositionContext.Provider value={{
          initialPosition: initPosition, 
          updatePosition: setCurrentPos,
          currentPosition: currentPos,
          currentData: getData, 
          updateData: setData
        }}>
        <div className="grid grid-rows-6 sm:grid-rows-3 lg:grid-rows-6 sm:grid-cols-2 gap-3 lg:gap-x-12 lg:h-page justify-self-center">
          <div className="row-span-3 lg:row-span-6 rounded-xl overflow-hidden shadow-2xl">
          {(initPosition) &&
            <Map />
          }
          </div>
          <CurrentPositionCard />
          {/* <RemotePositionCard /> */}
        </div> 
        </PositionContext.Provider>
        }
      </div>
    </>
  )
}
