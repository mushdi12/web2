const canvas = document.getElementById('coordinatePlane');
const ctx = canvas.getContext('2d');
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const scale = 28;
let selectedX = null;
let selectedY = null;
let selectedR = null;

window.onload = function () {
    paint(1)
}

function drawAxes() {
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(canvas.width, centerY);
    ctx.strokeStyle = "black";
    ctx.stroke();

    ctx.moveTo(canvas.width - 10, centerY - 5);
    ctx.lineTo(canvas.width, centerY);
    ctx.lineTo(canvas.width - 10, centerY + 5);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, canvas.height);
    ctx.strokeStyle = "black";
    ctx.stroke();

    ctx.moveTo(centerX - 5, 10);
    ctx.lineTo(centerX, 0);
    ctx.lineTo(centerX + 5, 10);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();

    ctx.font = "12px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("X", canvas.width - 14, centerY + 19);
    ctx.fillText("Y", centerX + 10, 14);
}

function drawCircle(R) {
    ctx.fillStyle = "rgba(66,170,255,0.34)";
    // Четверть круга
    ctx.beginPath();
    ctx.arc(centerX, centerY, R  * scale, -Math.PI , -1 * Math.PI/2);
    ctx.lineTo(centerX, centerY);
    ctx.fill();
    ctx.closePath();
}

function drawTriangle(R) {
    ctx.fillStyle = "rgba(66,170,255,0.34)";
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX, centerY + R/2  * scale);
    ctx.lineTo(centerX + R/2  * scale, centerY);
    ctx.lineTo(centerX, centerY);
    ctx.fill();
    ctx.closePath();
}

function drawSquare(R) {
    ctx.fillStyle = "rgba(66,170,255,0.34)";
    // Квадрат
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX, centerY + R * scale);
    ctx.lineTo(centerX - R/2  * scale, centerY + R * scale);
    ctx.lineTo(centerX - R/2  * scale, centerY);
    ctx.lineTo(centerX, centerY);
    ctx.fill();
    ctx.closePath();
}

function drawPoint(x, y) {
    ctx.fillStyle = "#000dff";
    // Точка
    ctx.beginPath();
    ctx.arc(centerX + x * scale, centerY - y * scale, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
}

function setX(value) {
    selectedX = value;

    const buttons = document.querySelectorAll('.color-button');
    buttons.forEach(button => {
        button.classList.remove('active');
    });

    event.target.classList.add('active');
}

canvas.addEventListener('click', function(event) {
    const rect = canvas.getBoundingClientRect();
    const xCanvas = (event.clientX - rect.left - centerX) / scale;
    const yCanvas = (centerY - (event.clientY - rect.top)) / scale;

    selectedX = xCanvas.toFixed(2);
    selectedY = yCanvas.toFixed(2)
    selectedR = document.getElementById("rSelect").value;

    if (selectedX < -3 || selectedX > 5) {
        alert("X должен быть в пределах от -3 до 5");
        return;
    }

    if (selectedY < -5 || selectedY > 5) {
        alert("Y должен быть в пределах от -5 до 5");
        return;
    }
    sendHTTP(selectedX, selectedY, selectedR)
    drawPoint(selectedX, selectedY);
});

document.getElementById("rSelect").addEventListener("change", function() {
    selectedR = this.value;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    paint(selectedR);

});


function submitForm() {

    selectedY = document.getElementById("yInput").value;
    selectedR = document.getElementById("rSelect").value;

    if (selectedX < -3 || selectedX > 5) {
        alert("X должен быть в пределах от -3 до 5");
        return;
    }

    if (selectedY < -5 || selectedY > 5) {
        alert("Y должен быть в пределах от -5 до 5");
        return;
    }

    selectedX = parseFloat(selectedX).toFixed(2);
    selectedY = parseFloat(selectedY).toFixed(2);

    if (selectedX !== null && selectedY !== null && selectedR !== "") {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        sendHTTP(selectedX, selectedY, selectedR);
        paint(selectedR);
        drawPoint(selectedX, selectedY);
    } else {
        alert("Please fill all fields correctly");
    }
}

function sendHTTP(x, y, r) {
    let currentTime = new Date();

    let time = currentTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });

    let milliseconds = currentTime.getMilliseconds();
    let nanoSeconds = currentTime.getMilliseconds() * 1000000;
    let nanoSecondsStr = nanoSeconds.toString().padStart(9, '0');


    let timeWithNanoSeconds = `${time}.${nanoSecondsStr}`;
    $.ajax({
        type: "POST",
        url: "controller",
        data: { x: x, y: y, r: r, start_time: timeWithNanoSeconds, verdict: "Miss"},
        success: function() {
            console.log("Данные пришли")
        },
        error: function(xhr, status, error) {
            console.error("Ошибка при отправке данных:", error);
            // Можно добавить оповещение об ошибке
            alert("Ошибка при отправке данных");
        }
    });
}

function goTable(count) {
    window.location.href = `controller?count=${count}`;
}

function paint(r){

    drawSquare(r);
    drawCircle(r);
    drawTriangle(r);
    drawAxes();

}



