package beans;

import lombok.Getter;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;


@Getter
@Setter
public class RequestData implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;
    private String startTime;
    private String executionTime;
    private String x;
    private String y;
    private String r;
    private String verdict;


    public RequestData(String startTime, String executionTime, String x, String y, String r, String verdict) {
        this.startTime = startTime;
        this.executionTime = executionTime;
        this.x = x;
        this.y = y;
        this.r = r;
        this.verdict = verdict;
    }

    @Override
    public String toString() {
        return "RequestData{" +
                "startTime='" + startTime + '\'' +
                ", executionTime='" + executionTime + '\'' +
                ", x='" + x + '\'' +
                ", y='" + y + '\'' +
                ", r='" + r + '\'' +
                ", verdict='" + verdict + '\'' +
                '}';
    }
}
