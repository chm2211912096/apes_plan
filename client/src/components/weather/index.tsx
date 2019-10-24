import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import {AMapWX} from '../../libs/map';
import config from '../../config/index';
import {StateType} from "./types";
import './index.less';

const AMap = new AMapWX({key: config.map_key});

export default class Weather extends Component {
	constructor(props) {
		super(props);
	}
	state: StateType = {
		weatherData: {
			city: '',
			province: '',
			temperature: '',
			weather: ''
		}
	};
	componentWillMount() {
		let that = this;
		AMap.getWeather({
			success({liveData}) {
				console.log(liveData);
				that.setState({
					weatherData: liveData
				})
			}
		})
	}
	render() {
		let {city, province, temperature, weather} = this.state.weatherData;
		return (
			<View className='weather d-flex align-items-center'>
				<View className="location d-flex flex-column">
					<Text className="province">{province}</Text>
					<Text className="city">{city}</Text>
				</View>
				<View className="climate d-flex align-items-center">
					<Text className="temp">{temperature}</Text>
					<Text className="clip">{weather}</Text>
				</View>
			</View>
		)
	}
}
