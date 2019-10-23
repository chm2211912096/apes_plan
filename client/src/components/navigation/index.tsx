import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import './index.less';
import '../../assets/icon/iconfont.css';
import {get as GetVariable} from '../../runtime/variable';

interface NavigationOption {
	title: string,
	showPrev?: boolean,
}

export default class Navigation extends Component<NavigationOption> {
	constructor(props) {
		super(props);
	}
	render() {
		const height = GetVariable("statusBarHeight");
		const {title, showPrev} = this.props;
		
		return (
			<View className="navigation d-flex align-items-center">
				<View className="status-bar" style={{height: height * 2 + 'rpx'}} />
				<View className="navigate-bar d-flex align-items-center">
					{
						showPrev ? (
							<Text className="iconfont iconzuo icon-prev" />
						) : null
					}
					<Text>{ title }</Text>
				</View>
			</View>
		)
	}
}
