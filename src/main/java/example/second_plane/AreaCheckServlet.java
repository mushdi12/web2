package example.second_plane;

import beans.DataList;
import beans.RequestData;
import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import validator.Validator;


import java.io.IOException;
import java.time.Duration;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;


@WebServlet("/areaCheck")
public class AreaCheckServlet extends HttpServlet {

    int page_number = 0;

    protected void doPost(HttpServletRequest request, HttpServletResponse response) {
        LocalTime now = LocalTime.now();
        Validator validator = new Validator();

        RequestData requestData = setDot(request,now);
        System.out.println(requestData);

        HttpSession session = request.getSession();
        DataList bean = (DataList) session.getAttribute("bean");

        if (bean == null) {
            bean = new DataList();
            session.setAttribute("bean", bean);
        }



        if (validator.validate(requestData)) {
            requestData.setVerdict(validator.getVerdict(requestData));
            bean.addData(requestData);
        } else {
            System.out.println("Invalid Coordinates Exception : the server received invalid data");

        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        int count = Integer.parseInt(request.getParameter("count"));
        if (count == 1) {
            clearList(request);
        }
        page_number+=count;
        System.out.println(count);
        System.out.println(page_number);
        if (page_number < 0) {
            page_number = 0;
        } 
        HttpSession session = request.getSession();
        session.setAttribute("count",page_number);
        RequestDispatcher dispatcher = request.getRequestDispatcher("table.jsp");
        dispatcher.include(request, response);

    }

    protected RequestData setDot(HttpServletRequest request,LocalTime now) {
        String x = request.getParameter("x");
        String y = request.getParameter("y");
        String r = request.getParameter("r");
        String time = request.getParameter("start_time");
        String verdict = request.getParameter("verdict");
        String work_time = getBetween(time,now);
        return new RequestData(time,work_time,x, y, r,  verdict);
    }

    private String getBetween(String time, LocalTime end) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm:ss.SSSSSSSSS");
        LocalTime start = LocalTime.parse(time, formatter);
        Duration duration = Duration.between(start, end);
        long milliseconds = duration.toMillis();
        return String.valueOf(milliseconds);

    }

    private void clearList(HttpServletRequest request) {
        HttpSession session = request.getSession();
        DataList bean = (DataList) session.getAttribute("bean");
        bean.clearData();
    }

}
