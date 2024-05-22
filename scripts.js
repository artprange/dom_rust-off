document.addEventListener("DOMContentLoaded", function () {
	const areaJanela = 2.4;
	const areaPorta = 1.5;
	const alturaPorta = 1.9; // Door height in meters

	const form = document.getElementById("form");
	const heights = document.querySelectorAll(".height");
	const lengths = document.querySelectorAll(".length");
	const doors = document.querySelectorAll(".porta");
	const windows = document.querySelectorAll(".janela");

	// inputs will receive numbers, only
	const validateNumberInput = (input) => {
		input.addEventListener("input", (event) => {
			const numerosApenas = /\D+/g;
			event.target.value = event.target.value.replace(numerosApenas, "");
		});
	};

	heights.forEach(validateNumberInput);
	lengths.forEach(validateNumberInput);
	doors.forEach(validateNumberInput);
	windows.forEach(validateNumberInput);

	// calculating the wall area
	const calculateWallArea = (
		length,
		height,
		numDoors,
		numWindows,
		wallNumber
	) => {
		// Ensure that the height of the wall is at least 30 centimeters taller than the total height of the doors, only if there are doors present
		if (numDoors > 0 && height <= alturaPorta + 0.3) {
			alert(
				`A altura da parede ${wallNumber} deve ser pelo menos 30 centímetros maior do que a altura das portas.`
			);
			return 0; // Return 0 as the wall area to prevent further calculations
		}

		let wallArea = length * height;

		// calculating the sum of doors and windows - if any
		const totalDoorArea = numDoors * areaPorta;
		const totalWindowArea = numWindows * areaJanela;
		const totalDoorWindowArea = totalDoorArea + totalWindowArea;

		// inserting the business rules: the area of the windows + doors shouldn't be greater than 50% of the wall area
		if (totalDoorWindowArea >= 0.5 * wallArea) {
			alert(
				`A área das portas e janelas na parede ${wallNumber} excede 50% da área da parede.`
			);
			return 0; // Return 0 as the wall area to prevent further calculations
		}

		// subtracting the area of windows + walls from the wall area
		wallArea -= totalDoorWindowArea;

		// checking if the wall area is inside the boundaries
		wallArea = Math.max(1, Math.min(wallArea, 50));

		// Check if the wall area exceeds 50 sq meters
		if (wallArea === 50 && wallArea !== length * height) {
			alert(
				`A área da parede ${wallNumber} ultrapassa o limite de 50 metros quadrados. Será considerado o limite máximo.`
			);
		}

		return wallArea;
	};

	// submission handler
	const handleSubmit = (event) => {
		event.preventDefault();

		// gathering all the inputs
		const wallInputs = [];
		for (let i = 1; i <= 4; i++) {
			const length = parseFloat(document.getElementById(`length${i}`).value);
			const height = parseFloat(document.getElementById(`height${i}`).value);
			const numDoors =
				parseFloat(document.getElementById(`porta${i}`).value) || 0;
			const numWindows =
				parseFloat(document.getElementById(`janela${i}`).value) || 0;

			wallInputs.push({ length, height, numDoors, numWindows });
		}

		// calculating all the areas and the amount of paint
		let totalArea = 0;
		wallInputs.forEach((wall, index) => {
			totalArea += calculateWallArea(
				wall.length,
				wall.height,
				wall.numDoors,
				wall.numWindows,
				index + 1
			);
		});

		const paintNeeded = totalArea / 5; //

		// Calculate the number of paint cans needed based on the paintNeeded
		const paintCanSizes = [0.5, 2.5, 3.6, 18]; // Paint can sizes in liters
		let minCansNeeded = Infinity;
		let minCanSize = 0;
		paintCanSizes.forEach((size) => {
			const cansNeeded = Math.ceil(paintNeeded / size);
			if (cansNeeded < minCansNeeded) {
				minCansNeeded = cansNeeded;
				minCanSize = size;
			}
		});

		// Adjust the minimum number of cans needed to ensure it's a valid size
		let adjustedMinCansNeeded = minCansNeeded;
		let adjustedMinCanSize = minCanSize;
		for (
			let i = paintCanSizes.indexOf(minCanSize) + 1;
			i < paintCanSizes.length;
			i++
		) {
			if (paintNeeded <= paintCanSizes[i]) {
				adjustedMinCansNeeded = 1;
				adjustedMinCanSize = paintCanSizes[i];
				break;
			}
		}

		// displaying on the DOM the amount of paint and sq meters
		const metragemFinal = document.getElementById("metragemFinal");
		const litrosDeTinta = document.getElementById("litrosDeTinta");
		const qtdLatas = document.getElementById("qtdLatas");

		metragemFinal.textContent = `Área total: ${totalArea.toFixed(
			2
		)} metros quadrados`;
		litrosDeTinta.textContent = `Quantidade indicada de tinta: ${paintNeeded.toFixed(
			2
		)} litros`;

		// Display the minimum amount of paint cans required with their size
		qtdLatas.innerHTML = `<h3>Quantidade mínima de latas de tinta necessárias:</h3>`;
		qtdLatas.innerHTML += `<p>${adjustedMinCanSize} L: ${adjustedMinCansNeeded} latas</p>`;

		// making the result visible
		metragemFinal.style.display = "block";
		litrosDeTinta.style.display = "block";
		qtdLatas.style.display = "block";
	};

	// submit handler
	form.addEventListener("submit", handleSubmit);

	// reset handler
	const handleReset = () => {
		const inputs = document.querySelectorAll('input[type="text"]');
		inputs.forEach((input) => (input.value = ""));

		document.getElementById("metragemFinal").textContent = "";
		document.getElementById("litrosDeTinta").textContent = "";
		document.getElementById("qtdLatas").textContent = "";
	};

	// adding the reset button
	const resetButton = document.querySelector(".reset-btn");
	resetButton.addEventListener("click", handleReset);
});
