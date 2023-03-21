package com.hadoop.demo;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Repository;

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
        List<String> list = new ArrayList<>();
        for(int j=1; j<100; j++) {
            Elements selects = document.select("#cpu" + j + " > td");
            //select 메서드 안에 css selector를 작성하여 Elements를 가져올 수 있다.
            int flag = 1;

            for (Element select : selects) {
                if(select.text().equals("")) {
                    flag = 0;
                    System.out.print("None");
                    break;
                }
                System.out.print(select.text());
//            String [] str = select.text().split(" ");
//            String firstWord = str[0].substring(0,str[0].length()-1);
//            //System.out.println(firstWord);
//            String text = "";
//            for(int i=0; i<str.length; i++){
//                //text = text.concat(str[i] + " ");
//                System.out.println(str[i]);
//            }
//            switch (firstWord) {
//                case "Processor":
//                    System.out.println(text);
//                    String intel = text.split(" / ")[0];
//                    String amd = text.split(" / ")[1];
//                    System.out.println(intel + amd);
//                    break;
//                case "Memory":
//                    System.out.println(str[1]);
//                    break;
//                case "Graphics":
//                    //System.out.println(text);
//                    String nvi = text.split(" / ")[0];
//                    String amd2 = text.split(" / ")[1];
//                    System.out.println(nvi + amd2);
//                    break;
//            }
                //html(), text(), children(), append().... 등 다양한 메서드 사용 가능
                //https://jsoup.org/apidocs/org/jsoup/nodes/Element.html 참고
            }
            if(flag == 1) System.out.println();

        }
        return list;
    }

}