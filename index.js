var isHidden = true;


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

    console.log(rgbColor);

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
    liElement.setAttribute('id', 'newChosenColor');
    liElement.setAttribute('class', 'colorCircle');
    liElement.setAttribute('style', 'background-color');
    liElement.style.backgroundColor = newColor;
    ulElement.appendChild(liElement);

}