var isHidden = true;
var chosenColorfromPalete;

window.addEventListener('load', () => {
    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext('2d');

    canvas.height = window.innerHeight /2;
    canvas.width = window.innerWidth -200;

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // canvas.height = 150;
    // canvas.width = 300;


    let painting = false;

    function startPosition(e){
        painting = true;
        draw(e);
        e.preventDefault();
    }

    function finishPosition(){
        painting = false;
        ctx.beginPath();
    }

    function draw(e) {
        if(!painting) return;

        ctx.lineWidth = 3;
        ctx.strokeStyle = chosenColorfromPalete;
        ctx.lineCap = 'round';

        ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY);

    }

    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('touchstart', startPosition);

    canvas.addEventListener('mouseup', finishPosition);
    canvas.addEventListener('touchend', finishPosition);

    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('touchmove', draw);


    document.querySelector('#ulColorPalete').addEventListener('click', (event) => {
        // chosenColorfromPalete = event.target.style.backgroundColor;
        var computedStyle = getComputedStyle(event.target);
        chosenColorfromPalete = computedStyle.getPropertyValue('background-color');
    });

});



function getColorValuesById(elementId) {
    var input = document.getElementById(elementId);
    return input.value;
}


function getColorValuesAsRGB() {
    var red = getColorValuesById('redInput');
    var green = getColorValuesById('greenInput');
    var blue = getColorValuesById('blueInput');

    var rgbColor = 'rgb(' + red + ', ' + green + ', ' + blue + ')';

    document.getElementById('preview').style.backgroundColor = rgbColor;

    // console.log(rgbColor);

    return rgbColor;
}


function changePickerDivDisplay() {
    var changeDivDisplay = document.getElementById('pickerDiv');
    var btn = document.getElementById('openPickerButton');

    if (isHidden) {
        changeDivDisplay.style.visibility = 'visible';
        btn.innerHTML = '&#129412; Close Color Picker &#129412;';
    } else {
        changeDivDisplay.style.visibility = 'hidden';
        btn.innerHTML = '&#129412; Open Color Picker &#129412;';
    }
    isHidden = !isHidden;

}

function createColorFromRgbValue() {

    var newColor = document.getElementById('preview').style.backgroundColor;
    var ulElement = document.getElementById('ulColorPalete');
    var liElement = document.createElement('li');
    liElement.classList.add('colorCircle');
    liElement.style.backgroundColor = newColor;
    ulElement.appendChild(liElement);

}



