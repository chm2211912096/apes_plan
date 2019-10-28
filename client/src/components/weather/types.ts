export interface WeatherType {
	city: string,
	province: string,
	temperature: string,
	weather: string
}

export interface TimeType {
	year?: string,
	month: string,
	day: string,
	hour: string,
	minute: string
}

enum TimePeriod {
	morning = '上午',
	noon = '中午',
	afternoon = '下午',
	night = '晚上'
}

export enum WeatherBg {
	cloudy = 'cloudy',
	sunny = 'sunny',
	rainy = 'rainy',
	snowy = 'snowy',
	night = 'night'
}

export function getTimePeriod(hour: number): TimePeriod {
	if(hour >= 6 && hour <= 11) {
		return TimePeriod.morning;
	}
	if(hour > 11 && hour <= 14) {
		return TimePeriod.noon;
	}
	if(hour > 14 && hour <= 18) {
		return TimePeriod.afternoon;
	}
	return TimePeriod.night;
}

export interface StateType {
	weatherData: WeatherType,
	time: TimeType,
	timePeriod: TimePeriod,
	weatherBg: WeatherBg
}
