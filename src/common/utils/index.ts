export function formatLargeNum(number: number) {
	let formatter = Intl.NumberFormat("en", { notation: "compact" });
	return formatter.format(number);
}