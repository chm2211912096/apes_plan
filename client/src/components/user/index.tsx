import Taro, { Component } from "@tarojs/taro";
import { View, Text, Button } from "@tarojs/components";
import './index.less';
import Weather from '../weather/index';
import {StateType} from "./types";

export default class User extends Component {
	constructor(props) {
		super(props);
	}
	state: StateType = {
		menus: [
			{
				id: 0,
				name: 'GitHub',
				icon: 'icon-github'
			},
			{
				id: 1,
				name: '收藏',
				icon: 'icon-collect'
			},
			{
				id: 2,
				name: '历史',
				icon: 'icon-history'
			},
			{
				id: 3,
				name: '赞助',
				icon: 'icon-help'
			},
		],
	};
	login() {
	
	}
	render() {
		let {menus} = this.state;
		return (
			<View className='user d-flex flex-column justify-content-between'>
				<View className="user-weather flex-grow-0 flex-shrink-0">
					<Weather />
				</View>
				<View className="user-menu flex-grow-1 flex-shrink-1">
					{
						menus.map(item => {
							return (
								<View
									className="menu-item d-flex align-items-center justify-content-between"
									key={item.id}
								>
									<View className="d-flex align-items-center">
										<Text className={"iconfont " + item.icon} />
										<Text className="name">{item.name}</Text>
									</View>
									<Text className="iconfont icon-you" />
								</View>
							)
						})
					}
					<View className="login">
						<Button className="login-btn d-flex align-items-center justify-content-center">授权登录</Button>
					</View>
				</View>
				<View className="suggest d-flex align-items-center justify-content-center flex-grow-0 flex-shrink-0">
					<Text>意见反馈</Text>
					<Text className="grep">|</Text>
					<Text>联系我们</Text>
				</View>
			</View>
		)
	}
}
