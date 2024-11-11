const canvas = document.getElementById('coordinatePlane');
const ctx = canvas.getContext('2d');
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const scale = 28;
const default_radius = 6;
let selectedX = null;  // Хранение выбранного X через кнопки
let selectedY = null;  // Хранение введенного Y
let selectedR = null;

window.onload = function () {
    drawSquare(default_radius);
    drawTriangle(default_radius);
    drawCircle(default_radius);
    drawAxes();
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

// Функция для установки значения X
function setX(value) {
    selectedX = value;

    // Обновляем все кнопки, чтобы они отобразили активное состояние
    const buttons = document.querySelectorAll('.color-button');
    buttons.forEach(button => {
        button.classList.remove('active'); // Убираем класс active
    });

    // Добавляем класс active для выбранной кнопки
    event.target.classList.add('active');
}
document.getElementById("yInput").addEventListener("input", function() {
    selectedY = this.value !== "" ? parseFloat(this.value) : null;
});

canvas.addEventListener('click', function(event) {
    // Получаем координаты клика относительно canvas
    const rect = canvas.getBoundingClientRect();
    const xCanvas = (event.clientX - rect.left - centerX) / scale;
    const yCanvas = (centerY - (event.clientY - rect.top)) / scale;

    // Если клик был на канвасе, передаем координаты
    selectedX = xCanvas.toFixed(2);
    selectedY = yCanvas.toFixed(2)
    let selectedR = document.getElementById("rSelect").value;
    sendHtml(selectedX, selectedY, selectedR)
});

function submitForm(xCanvas, yCanvas) {


    // Используем значение X, полученное через клика (если оно есть), или через кнопки
    let xValue = selectedX !== null ? selectedX : xCanvas;

    // Используем значение Y, полученное с канваса (если оно есть), или через поле ввода
    let yValue = selectedY !== null ? selectedY : yCanvas;

    // Получаем значение R из селектора
    let selectedR = document.getElementById("rSelect").value;

    // Проверка на допустимые значения X и Y
    if (xValue < -3 || xValue > 5) {
        alert("X должен быть в пределах от -3 до 5");
        return;
    }

    if (yValue < -5 || yValue > 5) {
        alert("Y должен быть в пределах от -5 до 5");
        return;
    }

    xValue = parseFloat(xValue).toFixed(2);
    yValue = parseFloat(yValue).toFixed(2);

    // Проверяем, что все значения заданы
    if (xValue !== null && yValue !== null && selectedR !== "") {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        sendHtml(xValue, yValue, selectedR);
        drawSquare(selectedR);
        drawCircle(selectedR);
        drawTriangle(selectedR);
        drawAxes();
        drawPoint(xValue, yValue);
    } else {
        alert("Please fill all fields correctly");
    }
}

function sendHtml(x, y, r) {
    let time = currentTime.toLocaleTimeString();
    $.ajax({
        type: "POST",
        url: "controller",
        data: { x: x, y: y, r: r, start_time: time, verdict: "Miss"},
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
function resetX() {
    // Сбрасываем значение X
    selectedX = null;

    // Убираем класс active у всех кнопок
    const buttons = document.querySelectorAll('.color-button');
    buttons.forEach(button => {
        button.classList.remove('active'); // Убираем класс active
    });
}


function goTable(count) {

    window.location.href = 'controller'+ encodeURIComponent(count);
}




