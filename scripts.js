const areaJanela = 2.4;
const areaPorta = 1.5;

const form = document.getElementById("form");

const heights = document.querySelectorAll(".height");
const lengths = document.querySelectorAll(".length");




const result1 = document.getElementById("result1");
const result2 = document.getElementById("result2");
const result3 = document.getElementById("result3");
const result4 = document.getElementById("result4");


//validando numeros apenas

heights.forEach(height => {
    height.addEventListener('input', () => {
        const numerosApenas = /\D+/g;
        height.value = height.value.replace(numerosApenas, '');
    });
});

lengths.forEach(length => {
    length.addEventListener('input', () => {
        const numerosApenas = /\D+/g;
        length.value = length.value.replace(numerosApenas, '');
    });
});


//evento de envio
form.onsubmit = (event) => {
    event.preventDefault();
    
}


function setupEventListeners() {
    const inputs = document.querySelectorAll(".length, .height, input[type='checkbox']");
    
    inputs.forEach(input => {
        input.addEventListener('input', calculateAllWallAreas);
    });

    inputs.forEach(input => {
        input.addEventListener('input', validateNumberInput);
    });
}

function validateNumberInput(event) {
    const input = event.target;
    const numerosApenas = /\D+/g;
    input.value = input.value.replace(numerosApenas, '');
}

function calculateAllWallAreas() {
    calculateWallArea("length1", "height1", "janela1", "porta1", "result1");
    calculateWallArea("length2", "height2", "janela2", "porta2", "result2");
    calculateWallArea("length3", "height3", "janela3", "porta3", "result3");
    calculateWallArea("length4", "height4", "janela4", "porta4", "result4");

    calculateTotalArea();
}

function calculateWallArea(lengthId, heightId, janelaId, portaId, resultId) {
    const length = parseFloat(document.getElementById(lengthId).value) || 0;
    const height = parseFloat(document.getElementById(heightId).value) || 0;

    let wallArea = length * height;

    const hasWindow = document.getElementById(janelaId).checked;
    const hasDoor = document.getElementById(portaId).checked;

    if (hasWindow) {
        wallArea -= areaJanela;
    }
    if (hasDoor) {
        wallArea -= areaPorta;
    }

    document.getElementById(resultId).textContent = "Area da parede: " + wallArea.toFixed(2) + " m²";
}

function calculateTotalArea() {
    let totalArea = 0;
    const results = document.querySelectorAll('.result');
    
    results.forEach(result => {
        const areaText = result.textContent.match(/[\d.]+/);
        const area = areaText ? parseFloat(areaText[0]) : 0;
        totalArea += area;
    });

    document.getElementById("metragemFinal").textContent = "Area total: " + totalArea.toFixed(2) + " m²";
    document.getElementById("litrosDeTinta").textContent = "Quantidade indicada de tinta: " + (totalArea / 10).toFixed(2) + " litros";
}

setupEventListeners();



// melhorar css
// aplicar a regra de negócio na litragem de tinta
//fazer o botão reset, funcionar