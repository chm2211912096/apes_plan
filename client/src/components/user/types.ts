export interface MenuType {
	id: number,
	name: string,
	icon?: string
}

export interface StateType {
	menus: MenuType[],
}
