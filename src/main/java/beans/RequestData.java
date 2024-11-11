package beans;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;


@Getter
@Setter

public class RequestData implements Serializable {
    private static final long serialVersionUID = 1L;

    private String executionTime;
    private String x;
    private String y;
    private String r;
    private String verdict;


    public RequestData(String executionTime, String x, String y, String r, String verdict) {
        this.executionTime = executionTime;
        this.x = x;
        this.y = y;
        this.r = r;
        this.verdict = verdict;
    }

    @Override
    public String toString() {
        return "RequestData{" +
                "executionTime='" + executionTime + '\'' +
                ", x='" + x + '\'' +
                ", y='" + y + '\'' +
                ", r='" + r + '\'' +
                ", verdict='" + verdict + '\'' +
                '}';
    }
}
