export {};

/*
    This file is used to store interfaces globally, so I don't have to rewrite them in each file.
 */
declare global {

    interface WeatherLocation{
        "lat": number,
        "lon": number
        "name": string,
        "country": string
        "popupInfo": any,
        "setPopup": any,
        "trigger": any,
        "setTrigger": any,
        "zip"?: any,
        "darkMode"?: boolean
    }

    interface CityWeather{
        "lat" : number,
        "lon" : number,
        "current": Current,
        "daily": Daily[],
        "timezone_offset": number
    }

    interface Current{
        "temp": number,
        "dt": number,
        "clouds": number,
        "humidity": number,
        "wind_speed" : number,
        "weather": Weather[]
    }

    interface Weather{
        "id": number,
        "main": string,
        "description": string,
        "icon": string
    }


    interface Daily{
        "temp" : Temp,
        "weather" : Weather[],
        "rain": number
    }

    interface Temp{
        "min" : number,
        "max" : number
    }
}