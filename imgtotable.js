// Converts a given image into a table where each cell is a pixel in the image
// it lags a bunch and the table ends up looking like a low res version of the image

var img = new Image();
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var imgData;
var colorData = [];
var table;

canvas.style.display = 'none';

img.onload = function() {
    canvas.width = img.width;
    canvas.height = img.height

    ctx.drawImage(img, 0, 0);

    imgData = ctx.getImageData(0, 0, img.width, img.height);

    // convert imgData to rgba values
    for (let y = 0; y < imgData.height; y++) {
        colorData.push([]);
        let col = 0;
        for (let x = y * imgData.width * 4; x < y * imgData.width * 4 + imgData.width * 4; x+=4) {
            colorData[y][col++] = 'rgba(' + imgData.data[x] + ',' + imgData.data[x + 1] + ',' +
             imgData.data[x + 2] + ',' + imgData.data[x + 3] / 255 + ')';
        }
    }

    createTable();
}

function createTable() {
    var body = document.body;
    
    if (table != null) {
        body.removeChild(table);    
    }
    
    table = document.createElement('table');
    table.style.borderCollapse = 'collapse';

    for(let i = 0; i < img.height; i++){
        let row = table.insertRow();
        for(let j = 0; j < img.width; j++){
            let cell = row.insertCell();
            cell.appendChild(document.createTextNode(''));
            cell.style.backgroundColor = colorData[i][j];
        }
    }

    body.appendChild(table);
}

function readImg(file) {
    var reader = new FileReader();

    reader.onload = function() {
        img.src = reader.result; // load local image data url
    }

    reader.readAsDataURL(file.target.files[0]);
}
