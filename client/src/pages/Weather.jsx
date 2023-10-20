import UilReact from '@iconscout/react-unicons/icons/uil-react'
import '../App.css'
import TopButtons from '../Components/TopButtons';
import Inputs from '../Components/Inputs';
import TimeAndLocation from '../Components/TimeAndLocation';
import TemperatureAndDetails from '../Components/TemperatureAndDetails';
import Forecast from '../Components/Forecast';
import getFormattedWeatherData from '../Services/weatherService';
import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

function Weather() {

  const [query, setQuery] = useState({q: 'Galle'})
  const [units, setUnits] = useState('metric')
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const message = query.q ? query.q : 'current location.';
        toast.info("Fetching weather for " + message);
  
        const data = await getFormattedWeatherData({ ...query, units });
        
        if (data) {
          toast.success(
            `Successfully fetched weather for ${data.name}, ${data.country}.`
          );
          setWeather(data);
        } else {
          toast.error('An error occurred while fetching weather data.');
        }
      } catch (error) {
        console.error(error);
        toast.error('An error occurred while fetching weather data.');
      }
    };
  
    fetchWeather();
  }, [query, units]);
  

  const formatBackground = () => {
    if (!weather) return 'from-cyan-700 to-blue-700'
    const threshold = units === 'metric' ? 27: 60;
    if (weather.temp <= threshold) 
    return 'from-gray-800 to-blue-600'

    return 'from-yellow-600 to-orange-900'
  }
 
  return (

    <div id='back'>
      <div class="topnav">
        <a class="active" href="#home">Home</a>
        
        <a href="https://github.com/IT21268076">Contact</a>
        <a href="https://github.com/IT21268076">About</a>
      </div>

      <div className={`mx-auto w-11/12 h-fit mt-4 px-32 bg-gradient-to-br from-gray-800 to-blue-700 h-fit shadow-xl shadow-gray-700 rounded-3xl ${formatBackground()}`}>
      <div className="flex">
        <div className="w-1/2 mr-20 mt-10  ">
        
          <TopButtons setQuery={setQuery} />
          <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />
        
          {weather && (
          <div className='py-10 shadow-2xl px-10 mt-10 -mx-7 rounded-3xl' >
            &nbsp;
            <TimeAndLocation weather={weather} />
            &nbsp;
            <TemperatureAndDetails weather={weather} />
          </div>
          )}
        </div>

        <div className="w-1/2 ml-10 py-20 px-2 text-2xl">
          {weather && (
          <div >
            <Forecast title="hourly forecast" items={weather.hourly} />
            &nbsp;
            <Forecast title="daily forecast" items={weather.daily} />
          </div>
         )}
        </div>
      </div>

      <ToastContainer autoClose={5000} theme='colored' newestOnTop={true} />
    </div>

</div>



  );
}

export default Weather;
