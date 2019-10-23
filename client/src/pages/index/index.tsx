import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import Navigation from '../../components/navigation/index';

export default class Login extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<View className='container'>
				<Navigation title="首页" />
			</View>
		)
	}
}
