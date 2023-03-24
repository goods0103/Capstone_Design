package com.hadoop.demo;

import com.hadoop.demo.Model.CPUList;
import com.hadoop.demo.Service.CPUListService;
import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;


public class CrawlingPassmark {

    /**
     * 조회할 URL셋팅 및 Document 객체 로드하기
     */
    private final String url;

    public CrawlingPassmark(String url) {
        this.url = url;
    }

    public void process() {
        Connection conn = Jsoup.connect(url);
        //Jsoup 커넥션 생성

        Document document = null;
        try {
            document = conn.get();
            //url의 내용을 HTML Document 객체로 가져온다.
            //https://jsoup.org/apidocs/org/jsoup/nodes/Document.html 참고
        } catch (IOException e) {
            e.printStackTrace();
        }

        List<String> list = getDataList(document);
    }


    /**
     * data가져오기
     */
    private List<String> getDataList(Document document) {

        CPUListService cpuListService = new CPUListService();
        CPUList data = new CPUList();

        List<String> list = new ArrayList<>();
        for(int j=1; j<10; j++) {
            Elements selects = document.select("#cpu" + j + "> td");
            //select 메서드 안에 css selector를 작성하여 Elements를 가져올 수 있다.
            int flag = 0;

            for (Element select : selects) {
                System.out.println(select.text());
                switch (flag) {
                    case 0:
                        data.setCpu_name(select.text());
                        break;
                    case 1:
                        int mark = Integer.parseInt(select.text().replace(",", ""));
                        data.setCpu_mark(mark);
                        break;
                    case 2:
                        data.setCpu_rank(Integer.parseInt(select.text()));
                        break;
                    case 3:
                        if(select.text().equals("NA")){
                            data.setCpu_value(0);
                            break;
                        }
                        data.setCpu_value(Double.parseDouble(select.text()));
                        break;
                    case 4:
                        if(select.text().equals("NA")){
                            data.setCpu_price(0);
                            break;
                        }
                        int price = (int) Double.parseDouble(select.text().replaceAll("[$*]", ""));
                        data.setCpu_price(price * 1200);
                        break;
                }
//                if(select.text().equals("NA")) {
//                    continue;
//                }
//                if (flag == 1){
//                    int mark = Integer.parseInt(select.text().replace(",", ""));
//                    System.out.println(mark);
//                }
//                if(flag == 4){
//                    int price = (int) Double.parseDouble(select.text().replaceAll("[$*]", ""));
//                    System.out.println(price * 1200);
//                }
//                System.out.println(select.text());
                flag++;
            }
        }
        //cpuListService.save(data);
        return list;
    }

}