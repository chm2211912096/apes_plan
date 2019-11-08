export interface LocationType {
	latitude: number,
	longitude: number,
	speed?: number,
	accuracy?: number,
	verticalAccuracy?: number,
	horizontalAccuracy?: number
}

export interface TouchType {
	x: number,
	y: number
}

export interface StateType {
	translateAnimateData: Object[],
	scaleAnimateData: Object[],
	widthAnimateData: Object[],
	menuCoverAnimateData: Object[][],
	showMenu: boolean
}
