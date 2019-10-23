import {ObjectType} from "./types";

const Variable: ObjectType = {
	statusBarHeight: 0
};

export const get = function (key: string): any {
	return Variable[key] || null;
};

export const set = function (key: string, value: any): void {
	Variable[key] = value;
};
