export {};


declare global {

    interface WeatherLocation{
        "lat": number,
        "lon": number
        "name": string,
        "country": string
    }

    interface SpecificWeather{
        "weather": Object[],
        "temp": number,
        "min": number,
        "max": number,
        "wind": number,
        "precipitation": number,
        "humidity": number
    }

    interface CityWeather{
        "current": Current,
        "daily": Daily[],
        "minutely": Minutely,
        "timezone_offset": number
    }

    interface Current{
        "temp": number,
        "dt": number,
        "feels_like": number,
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

    interface Minutely{
        "precipitation" : number
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