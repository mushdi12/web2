<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="beans.DataList" %>
<%@ page import="beans.RequestData" %>
<%@ page import="java.util.concurrent.CopyOnWriteArrayList" %>
<%@ page import="java.util.List" %>
<!DOCTYPE html>

<html lang="ru">

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Web.2 | 338790</title>
    <link rel="stylesheet" href="styles.css">
</head>

<body>

<header>
    <div class="logo">ITMO</div>
    <div class="user-info">
        <a href="https://github.com/mushdi12/web2">source code</a>
        <span>Bragin Roman Andreevich</span>
        <span class="isu">408319</span>
    </div>
</header>

<main>
    <div class="container">
        <section class="content">
            <h1>Results Table</h1>
            <%
                DataList data = (DataList) request.getSession().getAttribute("bean");
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
                    <%
                        CopyOnWriteArrayList<RequestData> dataList = data.getDataList();
                        int startIndex = (int) session.getAttribute("count");
                        List<RequestData> subList;
                        int count = 5;


                        subList = dataList.stream()
                                .skip(startIndex)
                                .limit(count)
                                .toList();


                        if (!subList.isEmpty()) { %>
                    <% for (RequestData requestData : subList) { %>
                    <tr>
                        <td><% String startTime =requestData.getStartTime(); %>
                            <%= startTime.substring(0, startTime.length() - 10) %>
                        </td>
                        <td><%= requestData.getExecutionTime() + " mlsec" %>
                        </td>
                        <td><%= requestData.getX() %>
                        </td>
                        <td><%= requestData.getY() %>
                        </td>
                        <td><%= requestData.getR() %>
                        </td>
                        <td><%= requestData.getVerdict() %>
                        </td>
                    </tr>
                    <% } %>
                    <% } %>
                    <% } %>

                    </tbody>

                </table>

                <div class="button-group">
                    <button type="button" onclick="goTable(-5)" class="submit-button"> <</button>
                    <button onclick="window.location.href='index.jsp';" class="submit-button">Back</button>
                    <!-- <button onclick="history.back();" class="submit-button"Back</button> -->
                    <button type="button" onclick="goTable(1)" class="submit-button">Clear</button>
                    <button type="button" onclick="goTable(+5)" class="submit-button"> ></button>
                </div>

            </div>


        </section>
    </div>
</main>
<script src="scripts.js"></script>
</body>
</html>
