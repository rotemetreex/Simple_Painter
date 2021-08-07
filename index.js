var isHidden = true;
var brushChosenWidth = 3;
var chosenColorfromPalete;

var canvas;
var ctx;

var restoreArray = [];
var i = -1;

window.addEventListener('load', () => {
    canvas = document.querySelector('#canvas');
    ctx = canvas.getContext('2d');

    canvas.height = window.innerHeight /2;
    canvas.width = window.innerWidth -200;

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);


    let painting = false;

    function startPosition(e){
        painting = true;
        drawByMouse(e);
    };

    function startPositionForTouch(e){
        e.preventDefault();
        painting = true;
        drawByTouch(e);
    };

    function finishPosition(e){
        painting = false;
        ctx.closePath();
        ctx.beginPath();

        if(e.type != 'mouseout'){
            restoreArray.push(ctx.getImageData(0,0,canvas.width,canvas.height));
            i += 1;
        };
    };

    function drawByMouse(e) {
        if(!painting) return;

        ctx.lineWidth = brushChosenWidth;
        ctx.strokeStyle = chosenColorfromPalete;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY);
    };


    function drawByTouch(e) {
        if(!painting) return;

        ctx.lineWidth = brushChosenWidth;
        ctx.strokeStyle = chosenColorfromPalete;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        var touch = e.touches[0];
        var x = touch.clientX - canvas.offsetLeft;
        var y = touch.clientY;

        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    };

    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('touchstart', startPositionForTouch);

    canvas.addEventListener('mouseup', finishPosition);
    canvas.addEventListener('mouseout', finishPosition);
    canvas.addEventListener('touchend', finishPosition);
    canvas.addEventListener('touchcancle', finishPosition);

    canvas.addEventListener('mousemove', drawByMouse);
    canvas.addEventListener('touchmove', drawByTouch);


    document.querySelector('#ulColorPalete').addEventListener('click', (event) => {
        // chosenColorfromPalete = event.target.style.backgroundColor;
        var computedStyle = getComputedStyle(event.target);
        chosenColorfromPalete = computedStyle.getPropertyValue('background-color');
    });

});

function chooseBrushWidth(){
    brushChosenWidth = getColorValuesById('brushSize');
    // console.log(brushChosenWidth);
};


function getColorValuesById(elementId) {
    var input = document.getElementById(elementId);
    return input.value;
};


function getColorValuesAsRGB() {
    var red = getColorValuesById('redInput');
    var green = getColorValuesById('greenInput');
    var blue = getColorValuesById('blueInput');

    var rgbColor = 'rgb(' + red + ', ' + green + ', ' + blue + ')';

    document.getElementById('preview').style.backgroundColor = rgbColor;

    // console.log(rgbColor);

    return rgbColor;
};


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

};

function createColorFromRgbValue() {

    var newColor = document.getElementById('preview').style.backgroundColor;
    var ulElement = document.getElementById('ulColorPalete');
    var liElement = document.createElement('li');
    liElement.classList.add('colorCircle');
    liElement.style.backgroundColor = newColor;
    ulElement.appendChild(liElement);

};

function clearCanvas() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.fillRect(0,0,canvas.width, canvas.height);

    restoreArray = [];
    i = -1;
};

function undoLastStroke() {
    if (i <= 0) {
        clearCanvas();
    } else {
        restoreArray.pop();
        ctx.putImageData(restoreArray[i-1], 0, 0);
        i -= 1;
    };
};

