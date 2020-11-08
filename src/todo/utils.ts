export const ordinal = (number: number) => {
	switch (number) {
		case 1:
		case 21:
			return number + "st"
		case 2:
		case 22:
			return number + "nd"
		case 3:
		case 23:
			return number + "rd"
		default:
			return number + "th"
	}
}

export const uuid = () => {
	let result = ""
	const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
	for (let i = 0; i < 7; i++) {
		result += chars.charAt(Math.floor(Math.random() * chars.length))
	}
	return result
}
