export function formatMonthToEn(month: number | string): string {
	month = Number(month);
	if(month < 1) {
		throw new Error('format month to en param should more than 0');
	}
	const monthEnList: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	return monthEnList[month - 1];
}

export function padString(targetString: any, len: number, char: string, start: boolean = false): string {
	let str = targetString.toString();
	
	if(start) {
		return str.padStart(len, char);
	} else {
		return str.padEnd(len, char);
	}
}
