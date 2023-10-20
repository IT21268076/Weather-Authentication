import React, { useState } from 'react'
import { UilSearch, UilLocationPinAlt } from '@iconscout/react-unicons'
import { toast } from 'react-toastify';

function Inputs({setQuery, units, setUnits}) {
    const [city, setCity] = useState("");

    const handleSearchClick = () => {
        const lettersOnly = /^[A-Za-z\s]+$/;

        if (!city.match(lettersOnly)) {
            toast.error('Please enter valid destination');
        } else if (city.trim() === '') {
            toast.error('Please enter a city name');
        } else {
            setQuery({ q: city });
        }

    }

    const handleLocationClick = () => {
        if (navigator.geolocation) {
            toast.info('Fetching users location.')
            navigator.geolocation.getCurrentPosition((position) => {
                toast.success("Location fetched!");
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;
                console.log(position)

                setQuery({
                    lat,
                    lon,
                });
            });
        }
    }

const handleUnitsChange = (e) => {
    const selectedUnit = e.currentTarget.name;
    if(units !== selectedUnit) setUnits(selectedUnit);
};

  return (
    <div className='flex flex-row justify-center my-6'>

        <div className='flex flex-row w-3/4 items-center justify-center space-x-4 ml-10'>

            <input 
                value={city}
                onChange={(e) => setCity(e.currentTarget.value)}
                type='text'
                placeholder="Search for city" 
                required
                className="text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase"
            />
            <UilSearch 
                size={25}
                className="text-white cursor-pointer transition ease-out hover:scale-125"
                onClick={handleSearchClick}
            />
            <UilLocationPinAlt 
                size={25}
                className="text-white cursor-pointer transition ease-out hover:scale-125 "
                onClick={handleLocationClick}
            /> 
            
        </div>

        <div className='flex flex-row w-1/4 items-center justify-center'>
            <button name='metric' className='text-xl text-white font-Light transition ease-out hover:scale-125' 
            onClick={handleUnitsChange}>°C</button>
            <p className='text-xl text-white mx-1'>|</p>
            <button name="imperial" className="text-xl text-white font-light transition ease-out hover:scale-125" onClick={handleUnitsChange}>°F</button>
        </div>

    </div>
  )
}

export default Inputs