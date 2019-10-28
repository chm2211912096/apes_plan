import Taro, {Component} from "@tarojs/taro";
import moment from 'moment';
import {Text, View} from "@tarojs/components";
import {AMapWX} from '../../libs/map';
import config from '../../config/index';
import {getTimePeriod, StateType, WeatherBg} from "./types";
import './index.less';
import {formatMonthToEn, padString} from '../../utils/util';

const AMap = new AMapWX({key: config.map_key});
const oDate = moment();

export default class Weather extends Component {
	constructor(props) {
		super(props);
	}
	state: StateType = {
		weatherData: {
			city: '朝阳',
			province: '北京',
			temperature: '18',
			weather: '晴'
		},
		time: {
			year: oDate.year().toString(),
			month: padString(oDate.month() + 1, 2, '0', true),
			day: padString(oDate.date(), 2, '0', true),
			hour: padString(oDate.hour(), 2, '0', true),
			minute: padString(oDate.minute(), 2, '0', true)
		},
		timePeriod: getTimePeriod(oDate.hour()),
		weatherBg: WeatherBg.sunny
	};
	componentWillMount() {
		let that = this;
		AMap.getWeather({
			success({liveData}) {
				that.setWeatherBg(liveData.weather);
				that.setState({
					weatherData: liveData
				})
			}
		});
		this.timeIncrement();
	}
	componentDidHide() {
		if(this['timeTimer']) {
			clearTimeout(this['timeTimer']);
		}
	}
	timeIncrement() {
		let oDate = moment();
		this.setState({
			time: {
				year: oDate.year().toString(),
				month: padString(oDate.month() + 1, 2, '0', true),
				day: padString(oDate.date(), 2, '0', true),
				hour: padString(oDate.hour(), 2, '0', true),
				minute: padString(oDate.minute(), 2, '0', true)
			},
			timePeriod: getTimePeriod(oDate.hour())
		});
		
		this['timeTimer'] = setTimeout(() => {
			this.timeIncrement();
		}, 20000);
	}
	setWeatherBg(weather: string) {
		let hour = oDate.hour();
		let weatherBg: WeatherBg = WeatherBg.cloudy;
		
		if(weather.includes('晴')) {
			weatherBg = hour > 18 && hour <= 6 ? WeatherBg.night : WeatherBg.sunny;
		}
		if(weather.includes('雨')) {
			weatherBg = WeatherBg.rainy;
		}
		if(weather.includes('雪')) {
			weatherBg = WeatherBg.snowy;
		}
		this.setState({
			weatherBg: weatherBg
		})
	}
	render() {
		let {city, province, temperature, weather} = this.state.weatherData;
		let {time, timePeriod, weatherBg} = this.state;
		return (
			<View className={"weather position-relative " + weatherBg}>
				<View className="weather-bg position-absolute" />
				<View className="content position-relative">
					<View className="time d-flex align-items-end">
						<Text>{time.hour}</Text>
						<Text className="colon">:</Text>
						<Text>{time.minute}</Text>
						<Text className="period">{timePeriod + '好!'}</Text>
					</View>
					<View className="date">
						<Text>{time.day}</Text>
						<Text className="month">{formatMonthToEn(time.month)}</Text>
					</View>
					<View className="position-absolute weather-cover">
						<View className="weather-content d-flex align-items-center justify-content-between">
							<View className="d-flex align-items-center">
								<Text className="iconfont icon-location" />
								<Text className="province">{province}</Text>
								<Text>{city}</Text>
							</View>
							<View className="d-flex align-items-center">
								<Text className="temp">{temperature + '℃'}</Text>
								<Text>{weather}</Text>
							</View>
						</View>
					</View>
				</View>
			</View>
		)
	}
}
