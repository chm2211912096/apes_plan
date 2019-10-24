import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import './index.less';
import Weather from '../weather/index';

export default class User extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<View className='user'>
				<Weather />
			</View>
		)
	}
}
