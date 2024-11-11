package example.second_plane;

import beans.DataList;
import beans.RequestData;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import validator.Validator;


import java.time.LocalDateTime;


@WebServlet("/areaCheck")
public class AreaCheckServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) {

        Validator validator = new Validator();

        RequestData requestData = setDot(request);
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

    protected RequestData setDot(HttpServletRequest request) {
        String x = request.getParameter("x");
        String y = request.getParameter("y");
        String r = request.getParameter("r");
        String work_time = String.valueOf(LocalDateTime.now());
        String verdict = request.getParameter("verdict");
        return new RequestData(work_time,x, y, r,  verdict);
    }

}
