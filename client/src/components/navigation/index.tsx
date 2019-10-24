import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import './index.less';
import {get as GetVariable} from '../../runtime/variable';

interface NavigationOption {
	title?: string,
	showPrev?: boolean,
}

export default class Navigation extends Component<NavigationOption> {
	constructor(props) {
		super(props);
	}
	render() {
		const {height = 0} = GetVariable("systemInfo");
		const {title, showPrev = true} = this.props;
		
		return (
			<View className="navigation">
				<View className="status-bar" style={{height: height * 2 + 'rpx'}} />
				<View className="navigate-bar position-relative d-flex align-items-center justify-content-center">
					{
						showPrev ? (
							<View className="navigation-menu-cover d-flex align-items-center position-absolute">
								<Text
									className="iconfont d-flex align-items-center justify-content-center icon-zuo icon-prev flex-grow-1 flex-shrink-1"
								/>
								<Text
									className="flex-grow-1 flex-shrink-1 d-flex align-items-center justify-content-center iconfont icon-home"
								/>
							</View>
						) : null
					}
					<Text className="navigation-title">{ title }</Text>
				</View>
			</View>
		)
	}
}
