import Taro, { Component } from "@tarojs/taro";
import { View, Map, Text } from "@tarojs/components";
import './index.less';
import User from '../../components/user/index';
import {get as GetVariable} from '../../runtime/variable';
import {createAnimate} from '../../utils/animate';
import {StateType, TouchType} from "./types";

export default class Index extends Component {
	constructor(props) {
		super(props);
	}
	state: StateType = {
		translateAnimateData: [],
		scaleAnimateData: [],
		widthAnimateData: [],
		menuCoverAnimateData: [],
		showMenu: false
	};
	defaultTouch: TouchType = {
		x: 0,
		y: 0
	};
	menus: number[] = [1,2,3,4,5,6];
	componentWillMount() {
		this['translateAnimate'] = createAnimate();
		this['scaleAnimate'] = createAnimate({
			delay: 100
		});
		this['widthAnimate'] = createAnimate({
			transformOrigin: 'right'
		});
		this['menuCoverAnimate'] = new Array(this.menus.length).fill('').map(() => createAnimate({
			delay: 0
		}));
	}
	hideUser() {
		const {screenWidth = 0} = GetVariable('systemInfo');
		this['translateAnimate'].translate(-1 * screenWidth * 0.85).step();
		this['scaleAnimate'].scale(1).step();
		this['widthAnimate'].opacity(0).width(0).step();
		this.setState({
			translateAnimateData: this['translateAnimate'].export(),
			scaleAnimateData: this['scaleAnimate'].export(),
			widthAnimateData: this['widthAnimate'].export(),
		});
	}
	showUser() {
		const {screenWidth = 0} = GetVariable('systemInfo');
		this['translateAnimate'].translate(0).step();
		this['scaleAnimate'].scale(1, .9).step();
		this['widthAnimate'].opacity(1).width(screenWidth * 0.15).step();
		this.setState({
			translateAnimateData: this['translateAnimate'].export(),
			scaleAnimateData: this['scaleAnimate'].export(),
			widthAnimateData: this['widthAnimate'].export(),
		});
	}
	setDefaultTouch(e) {
		if(!this.defaultTouch.x && !this.defaultTouch.y) {
			this.defaultTouch = {
				x: e.changedTouches[0].clientX,
				y: e.changedTouches[0].clientY
			}
		}
	}
	containerTouchEnd(e) {
		const x: number = e.changedTouches[0].clientX;
		const y: number = e.changedTouches[0].clientY;
		const dx: number = this.defaultTouch.x;
		const dy: number = this.defaultTouch.y;
		this.defaultTouch = {x: 0, y: 0};
		if(!dx && !dy) {
			return;
		}
		if(Math.abs(y - dy) > 200 || Math.abs(x - dx) < 10) {
			return;
		}
		if(x < dx) {
			this.hideUser();
		} else {
			this.showUser();
		}
	}
	testShowMenu() {
		let {showMenu} = this.state;
		let deg = showMenu ? 0 : 180 / (this.menus.length - 1);
		let tx = showMenu ? 0 : -80;
		for (let i = 0; i < this.menus.length; i++) {
			this['menuCoverAnimate'][i].rotate(i * deg - 90).translateX(tx).step();
		}
		this.setState({
			menuCoverAnimateData: this['menuCoverAnimate'].map(i => i.export()),
			showMenu: !showMenu
		})
	}
	render() {
		let {translateAnimateData, scaleAnimateData, widthAnimateData, menuCoverAnimateData, showMenu} = this.state;
		
		return (
			<View
				className='container d-flex'
				animation={translateAnimateData}
				onTouchEnd={this.containerTouchEnd.bind(this)}
				onTouchMove={this.setDefaultTouch.bind(this)}
			>
				<View className="content-left d-flex flex-column flex-shrink-0">
					<View className="user-cover">
						<User />
					</View>
				</View>
				<View className="content-right flex-shrink-0 d-flex position-relative align-items-end">
					<View
						className="content-shadow position-absolute"
						animation={widthAnimateData}
					/>
					<View
						className="main-content position-relative"
						animation={scaleAnimateData}
					>
						<Map
							latitude={39.9219}
							longitude={116.44355}
							showLocation
							className="map"
						/>
						{
							showMenu ? <View className="map-blur position-absolute" /> : null
						}
						<View className="map-mask-cover position-absolute">
							<View className="map-mask position-relative">
								<View className="btn-animate position-absolute">
									{
										this.menus.map(i => {
											return (
												<View
													className="btn-cover position-absolute"
													animation={menuCoverAnimateData[i - 1]}
													key={i}
												>
													<Text
														className="btn"
													>{i}</Text>
												</View>
											);
										})
									}
								</View>
							</View>
						</View>
						<Text
							className="btn-fixed position-absolute"
							onClick={this.testShowMenu.bind(this)}
						>按钮</Text>
					</View>
				</View>
			</View>
		)
	}
}
