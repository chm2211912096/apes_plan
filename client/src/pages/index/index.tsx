import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import './index.less';
import config from '../../config/index';
import Navigation from '../../components/navigation/index';
import User from '../../components/user/index';
import {get as GetVariable} from '../../runtime/variable';
import {createAnimate} from '../../utils/animate';

export default class Index extends Component {
	constructor(props) {
		super(props);
	}
	state = {
		scrollTop: 0,
		translateAnimateData: [],
		scaleAnimateData: []
	};
	componentWillMount() {
		this['translateAnimate'] = createAnimate();
		this['scaleAnimate'] = createAnimate({
			delay: 100,
			transformOrigin: '50% 50% 0'
		});
	}
	hideUser() {
		const {screenWidth = 0} = GetVariable('systemInfo');
		this['translateAnimate'].translate(-1 * screenWidth * 0.85).step();
		this['scaleAnimate'].scale(1).step();
		this.setState({
			translateAnimateData: this['translateAnimate'].export(),
			scaleAnimateData: this['scaleAnimate'].export()
		})
	}
	showUser() {
		this['translateAnimate'].translate(0).step();
		this['scaleAnimate'].scale(.9).step();
		this.setState({
			translateAnimateData: this['translateAnimate'].export(),
			scaleAnimateData: this['scaleAnimate'].export()
		})
	}
	render() {
		let {scrollTop, translateAnimateData, scaleAnimateData} = this.state;
		
		return (
			<View className='container position-relative d-flex' animation={translateAnimateData}>
				<View className="content-left d-flex flex-column flex-shrink-0">
					<View className="user-cover">
						<User />
					</View>
				</View>
				<View className="content-right flex-shrink-0 d-flex align-items-end">
					<View className="main-content" animation={scaleAnimateData}>
						{
							scrollTop > 0 ? (
								<Navigation title={config.app_name} showPrev={false} />
							) : null
						}
					</View>
					<View className="next position-absolute" onClick={this.hideUser.bind(this)}>
						<Text>hide</Text>
					</View>
					<View className="prev position-absolute" onClick={this.showUser.bind(this)}>
						<Text>show</Text>
					</View>
				</View>
			</View>
		)
	}
}
