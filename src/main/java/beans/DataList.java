package beans;


import lombok.Getter;

import java.io.Serializable;
import java.util.concurrent.CopyOnWriteArrayList;

@Getter
public class DataList implements Serializable {
    public final CopyOnWriteArrayList<RequestData> dataList = new CopyOnWriteArrayList<>();

    public void addData(RequestData data) {
        dataList.add(data);
    }

}
