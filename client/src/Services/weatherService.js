import { DateTime } from "luxon"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const API_KEY = "dad9daf8458b749c882670f8627b8c8d";
const BASE_URL = "https://api.openweathermap.org/data/2.5"


//https://api.openweathermap.org/data/2.5/weather?q=tokyo&appid=dad9daf8458b749c882670f8627b8c8d
//https://api.openweathermap.org/data/2.5/onecall?lat=52.5244&lon=13.4105&exclude=current,minutely,alerts&appid=3312d16bafa36c1cb03098f40f388379&units=metric
//https://api.openweathermap.org/data/2.5/onecall?lat=48.8534&lon=2.3488&exclude=current,minutely,alerts&appid=3312d16bafa36c1cb03098f40f388379&units=metric
//https://api.openweathermap.org/data/2.5/onecall?lat=48.8534&lon=2.3488&exclude=current,minutely,alerts&appid=dad9daf8458b749c882670f8627b8c8d

const getWeatherData = (infoType, searchParams) => {
    const url = new URL(BASE_URL + "/" + infoType);
    url.search = new URLSearchParams({...searchParams, appid:API_KEY});

    return fetch(url)
        .then((res) => res.json())
        
};

const formatCurrentWeather = (data) => {

    const {
        coord: {lat, lon},
        main: {temp, feels_like, temp_min, temp_max, humidity},
        name,
        dt,
        sys: {country, sunrise, sunset},
        weather,
        wind: {speed}
    } = data

    const {main: details, icon} = weather[0]
    console.log(data)
    return {lat, lon, temp, feels_like, temp_min, temp_max, humidity, name, dt, country, sunrise, sunset, details, icon, speed,};
}; 

const formatForecastWeather = (data) => {
    
    let { timezone, daily, hourly} = data;
    daily = daily.slice(1,6).map(d => {
        return {
            title: formatToLocalTime(d.dt, timezone, 'ccc'),
            temp: d.temp.day,
            icon: d.weather[0].icon
        };
    });

    hourly = hourly.slice(1,6).map(d => {
        return {
            title: formatToLocalTime(d.dt, timezone, "hh:mm a"),
            temp: d.temp,
            icon: d.weather[0].icon,
        };
    });
    console.log()
    return { timezone, daily, hourly};
}

const getFormattedWeatherData = async (searchParams) => {
    const formattedCurrentWeather = await getWeatherData('weather', searchParams).then(formatCurrentWeather);

    const {lat, lon} = formattedCurrentWeather;
    console.log(formattedCurrentWeather)
    const formattedForecastWeather = await getWeatherData("onecall", 
    {
        lat,
        lon,
        exclude: "current,minutely,alerts",
        units: searchParams.units,
    }).then(formatForecastWeather)
    console.log(formattedForecastWeather)
    return {...formattedCurrentWeather, ...formattedForecastWeather};
};

const formatToLocalTime = (secs, zone, format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a") => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrlFromCode = (code) =>
    `http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;

export { formatToLocalTime, iconUrlFromCode}