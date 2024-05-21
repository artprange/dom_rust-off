document.addEventListener('DOMContentLoaded', function() {
    const areaJanela = 2.4;
    const areaPorta = 1.5;

    const form = document.getElementById("form");
    const heights = document.querySelectorAll(".height");
    const lengths = document.querySelectorAll(".length");
    const doors = document.querySelectorAll(".porta");
    const windows = document.querySelectorAll(".janela");

    // Validating only numbers in inputs
    const validateNumberInput = (input) => {
        input.addEventListener('input', (event) => {
            const numerosApenas = /\D+/g;
            event.target.value = event.target.value.replace(numerosApenas, '');
        });
    };

    heights.forEach(validateNumberInput);
    lengths.forEach(validateNumberInput);
    doors.forEach(validateNumberInput);
    windows.forEach(validateNumberInput);

    // Function to calculate the area of a single wall
    const calculateWallArea = (length, height, numDoors, numWindows, wallNumber) => {
        // Calculate the area of the wall
        let wallArea = length * height;

        // Calculate the total area of doors and windows
        const totalDoorArea = numDoors * areaPorta;
        const totalWindowArea = numWindows * areaJanela;
        const totalDoorWindowArea = totalDoorArea + totalWindowArea;

        // Ensure that the total area of doors and windows is not more than 50% of the wall area
        if (totalDoorWindowArea >= 0.5 * wallArea) {
            alert(`A área das portas e janelas na parede ${wallNumber} excede 50% da área da parede.`);
            return 0; // Return 0 as the wall area to prevent further calculations
        }

        // Subtract the area of doors and windows from the wall area
        wallArea -= totalDoorWindowArea;

        // Ensure that the wall area is within the constraints (1 sq meter <= wall area <= 50 sq meters)
        wallArea = Math.max(1, Math.min(wallArea, 50));

        // Check if the wall area exceeds 50 sq meters
        if (wallArea === 50 && wallArea !== (length * height)) {
            alert(`A área da parede ${wallNumber} ultrapassa o limite de 50 metros quadrados. Será considerado o limite máximo.`);
        }

        return wallArea;
    };

    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();

        // Get all the input values for each wall
        const wallInputs = [];
        for (let i = 1; i <= 4; i++) {
            const length = parseFloat(document.getElementById(`length${i}`).value);
            const height = parseFloat(document.getElementById(`height${i}`).value);
            const numDoors = parseFloat(document.getElementById(`porta${i}`).value) || 0;
            const numWindows = parseFloat(document.getElementById(`janela${i}`).value) || 0;

            wallInputs.push({ length, height, numDoors, numWindows });
        }

        // Calculate the total area and total paint needed
        let totalArea = 0;
        wallInputs.forEach((wall, index) => {
            totalArea += calculateWallArea(wall.length, wall.height, wall.numDoors, wall.numWindows, index + 1);
        });

        const paintNeeded = totalArea / 5; // 1 liter covers 5 sq meters

        // Display the total area and calculated amount of paint on the webpage
        const metragemFinal = document.getElementById("metragemFinal");
        const litrosDeTinta = document.getElementById("litrosDeTinta");

        metragemFinal.textContent = `Área total: ${totalArea.toFixed(2)} metros quadrados`;
        litrosDeTinta.textContent = `Quantidade indicada de tinta: ${paintNeeded.toFixed(2)} litros`;

        // Make the result section visible
        metragemFinal.style.display = 'block';
        litrosDeTinta.style.display = 'block';
    };

    // Attach the form submission event listener
    form.addEventListener("submit", handleSubmit);

    // Function to handle reset button click
    const handleReset = () => {
        // Clear all input fields
        const inputs = document.querySelectorAll('input[type="text"]');
        inputs.forEach(input => input.value = '');

        // Clear the result display
        document.getElementById("metragemFinal").textContent = '';
        document.getElementById("litrosDeTinta").textContent = '';
    };

    // Attach the reset button click event listener
    const resetButton = document.querySelector('.reset-btn');
    resetButton.addEventListener('click', handleReset);
});
