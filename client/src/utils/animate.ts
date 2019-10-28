import Taro from '@tarojs/taro';
const timingFunctionList = [
	'ease',
	'linear',
	'ease-in',
	'ease-in-out',
	'ease-out',
	'step-start',
	'step-end'
];

export interface AnimateOption {
	duration?: number,
	timingFunction?: string,
	delay?: number,
	transformOrigin?: string
}

const default_option: AnimateOption = {
	duration: 300,
	timingFunction: 'ease',
	delay: 100,
	transformOrigin: '50% 50% 0'
};

export const createAnimate = function (option: AnimateOption = default_option) {
	if(option.timingFunction && !timingFunctionList.includes(option.timingFunction)) {
		throw new Error('timingFunction should one of: ease | linear | ease-in | ease-in-out | ease-out | step-start | step-end');
	}
	
	return Taro.createAnimation(Object.assign({}, default_option, option));
};
