import React from 'react'

function TopButtons({setQuery}) {

const cities = [
    {
        id:1,
        title: 'Badulla'
    },
    {
        id:2,
        title: 'Kandy'
    },
    {
        id:3,
        title: 'Colombo'
    },
    {
        id:4,
        title: 'Anuradhapura'
    },
    {
        id:5,
        title: 'Jaffna'
    },
]

  return (
    <div className="flex items-center justify-around my-6 ">
        {cities.map((city) =>(
            <button key={city.id} className="text-white text-xl font-medium"
            onClick={() => setQuery({ q: city.title})}>
                {city.title}
            </button>
        ) )}
    </div>
  )
}

export default TopButtons