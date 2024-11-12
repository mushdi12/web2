<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Web. №2 | 338790</title>
    <link rel="stylesheet" href="styles.css">
</head>

<body>

<header>
    <div class="logo">ITMO</div>
    <div class="user-info">
        <a href="https://github.com/mushdi12/web2">source code</a>
        <span>Bragin Roman Andreevich</span>
        <span class="isu">408319</span>
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    </div>
</header>

<main>
    <div class="container">
        <section class="content">
            <h1>Interactive Coordinate Plane</h1>
            <h2>Instructions:</h2>
            <h3>
                <ul style="text-align: left; list-style-type: none; padding-left: 0; margin-bottom: 20px;">
                    <li style="margin-bottom: 10px;">Data is entered both through the fields and through the mouse.</li>
                    <li style="margin-bottom: 10px;">The data is rounded to 2 decimal places.</li>
                    <li style="margin-bottom: 10px;">The data is in the table tab.</li>
                    <li style="margin-bottom: 10px;">After changing the radius, the dots disappear with the images.</li>
                </ul>
            </h3>
            <ul></ul>
            <div class="task-card">
                <div class="canvas-container">
                    <canvas id="coordinatePlane" width="400" height="400"></canvas>

                    <div class="input-group">

                        <label>Change X:</label>
                        <div class="button-group">
                            <button type="button" onclick="setX(-3)" class="color-button">-3</button>
                            <button type="button" onclick="setX(-2)" class="color-button">-2</button>
                            <button type="button" onclick="setX(-1)" class="color-button">-1</button>
                            <button type="button" onclick="setX(0)" class="color-button">0</button>
                            <button type="button" onclick="setX(1)" class="color-button">1</button>
                            <button type="button" onclick="setX(2)" class="color-button">2</button>
                            <button type="button" onclick="setX(3)" class="color-button">3</button>
                            <button type="button" onclick="setX(4)" class="color-button">4</button>
                            <button type="button" onclick="setX(5)" class="color-button">5</button>
                        </div>

                        <label>Change Y:</label>
                        <label for="yInput"></label><input type="number" id="yInput" min="-5" max="5"
                                                           placeholder="-5 ... 5">

                        <label>Change R:</label>
                        <label for="rSelect"></label><select id="rSelect">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>

                        <div class="button-group">
                            <button type="button" class="submit-button" onclick="submitForm()">Submit</button>
                            <button type="button" class="submit-button" onclick="goTable(0)">Table</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</main>

<script src="scripts.js"></script>

</body>
</html>
