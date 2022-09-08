// index = 11
// before = 6
// back = 5

export const isLageCard = (index, before, back) => {
	if (index === 0 || index === 5) return { back: 0, before: index, isLarge: true };
	let isLarge = false;
	// verifica si la diferencia es menor de 5 o de 1
	const restaBefore = before - back;
	let restaIndex = index - before;
	if (restaBefore === 5) {
		if (restaIndex === 1) {
			isLarge = true;
		}
	} else if (restaBefore === 1) {
		if (restaIndex === 5) {
			isLarge = true;
		}
	}
	if (isLarge) return { back: before, before: index, isLarge };
	return { back, before, isLarge };
};
