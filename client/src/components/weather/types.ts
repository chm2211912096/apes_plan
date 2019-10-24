export interface WeatherType {
	city: string,
	province: string,
	temperature: string,
	weather: string
}

export interface StateType {
	weatherData: WeatherType
}
