import React from 'react'
import { UilTemperature, UilSun, UilSunset, UilWind, UilTear} from '@iconscout/react-unicons'
import { formatToLocalTime, iconUrlFromCode } from '../Services/weatherService'

function TemperatureAndDetails({weather: {
    details, icon, temp, temp_min, temp_max, sunrise, sunset, speed, humidity, feels_like, timezone,
},
}) {
  return (
    <div>
        <div className="flex items-center justify-center py-6 text-4xl text-cyan-300 ">
            <p>{details}</p>
        </div>

        <div className='flex flex-row items-center justify-between text-white py-3 '>
            <img src={iconUrlFromCode(icon)} alt='' className="w-32"/>
            <p className="text-5xl"> {`${temp.toFixed()}°`}</p>
            <div className='flex flex-col space-y-2 '>
                <div className='flex font-light text-sm items-center justify-center text-xl '>
                    <UilTemperature size={18} className="mr-1"/>
                    Real fell:
                    <span className="font-medium ml-1">{`${feels_like.toFixed()}°`}</span>
                </div>

                <div className='flex font-light text-sm items-center justify-center text-xl'>
                    <UilTear size={18} className="mr-1"/>
                    Humidity: 
                    <span className="font-medium ml-1">{`${humidity.toFixed()}%`}</span>
                </div>

                <div className='flex font-light text-sm items-center justify-center text-xl'>
                    <UilWind size={18} className="mr-1"/>
                    Wind Speed:
                    <span className="font-medium ml-1">{`${speed.toFixed()}kmph`}</span>
                </div>
            </div>
        </div>
        <div className='flex flex-row items-center justify-center space-x-5 text-white text-lg py-5 '>

            <UilSun/>
            <p className="font-light" >Rise: <span className='font-medium ml-1'>{formatToLocalTime(sunrise, timezone, "hh:mm a")}</span></p>
            <p className='font-Light'></p>

            <UilSunset/>
            <p className="font-light" >Set: <span className='font-medium ml-1'>{formatToLocalTime(sunset, timezone, "hh:mm a")}</span></p>
            <p className='font-Light'></p>

            <UilSun/>
            <p className="font-light" >High: <span className='font-medium ml-1'>{`${temp_max.toFixed()}`}</span></p>
            <p className='font-Light'></p>

            <UilSun/>
            <p className="font-light " >Low: <span className='font-medium ml-1'>{`${temp_min.toFixed()}`}</span></p>
            <p className='font-Light'></p>
        </div>
    </div>
  )
}

export default TemperatureAndDetails