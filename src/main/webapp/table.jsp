<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="beans.DataList" %>
<%@ page import="beans.RequestData" %>
<%@ page import="java.time.LocalDateTime" %>
<%@ page import="java.util.Date" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Results of the check</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
<header>
    <div class="logo">ITMO</div>
    <div class="user-info">
        <span>Bragin Roman Andreevich</span>
        <span class="isu">408319</span>
    </div>
</header>

<main>
    <div class="container">
        <section class="content">
            <h1>Results Table</h1>
            <h2>Check results for point inclusion in the area</h2>
            <% DataList data = (DataList) request.getSession().getAttribute("bean");
                if (data != null) {
            %>
            <div class="task-card">
                <table class="styled-table">
                    <thead>
                    <tr>
                        <th>Request Time</th>
                        <th>Execute Time</th>
                        <th>X</th>
                        <th>Y</th>
                        <th>R</th>
                        <th>Result</th>
                    </tr>
                    </thead>
                    <tbody>
                    <% for (RequestData requestData : data.getDataList()) { %>
                    <tr>
                        <td><%= new Date().toString() %></td>
                        <td><%= requestData.getExecutionTime() %></td>
                        <td><%= requestData.getX() %></td>
                        <td><%= requestData.getY() %></td>
                        <td><%= requestData.getR() %></td>
                        <td><%= requestData.getVerdict() %></td>
                    </tr>
                    <% } %>
                    </tbody>

                </table>
                <% }  %>
                <button onclick="history.back();" class="back-button">Back</button>
                
            </div>

        </section>
    </div>
</main>
</body>
</html>
