import React from 'react'
import { iconUrlFromCode } from '../Services/weatherService'

function Forecast({title, items }) {
console.log(items);

  return (
    <div className='shadow-2xl p-5 mt-5 rounded-3xl shadow-slate-10 '>
        <div classname="flex items-center justify-start mt-6  ">
            <p className='text-white font-medium uppercase text-2xl'>{title}
            </p>
        </div>
        <hr className='my-2'/>

        <div className="flex flex-row items-center justify-between text-white ">
            {items.map((item) => (
                <div className='flex flex-col items-center justify-center mb-10'>
                <p className='font-light text-sm text-xl mt-10'>
                    {item.title}
                </p>
                <img src={iconUrlFromCode(item.icon)} alt='' className='w-30 my-1' />
                <p className='font-medium'>{`${item.temp.toFixed()}°`}</p>
                
            </div>
            ))}

            
        </div>
    </div>
  )
}

export default Forecast