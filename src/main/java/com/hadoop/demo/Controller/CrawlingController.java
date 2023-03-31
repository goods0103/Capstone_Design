package com.hadoop.demo.Controller;

import com.hadoop.demo.Model.CpuList;
import com.hadoop.demo.Model.RamList;
import com.hadoop.demo.Model.GpuList;
import com.hadoop.demo.Service.CpuListService;
import com.hadoop.demo.Service.RamListService;
import com.hadoop.demo.Service.GpuListService;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@CrossOrigin
@RestController
public class CrawlingController {

    @Autowired
    private CpuListService insertCpuList;

    @Autowired
    private RamListService insertRamList;

    @Autowired
    private GpuListService insertGpuList;


    @GetMapping("/cpu_list")
    public String getcpu_list() throws IOException {
        String url = "https://www.cpubenchmark.net/cpu_list.php";
        Document document = Jsoup.connect(url).get();
        // 데이터 추출
        for (int i = 1; i <= 5300; i++) {
            Element row = document.select("tr#cpu" + i).first();
            int cpuId = i;
            if (row != null) {
                String cpuName = row.select("td a").text();
                int cpuMark = Integer.parseInt(row.select("td:eq(1)").text().replace(",", ""));

                int cpuRank = Integer.parseInt(row.select("td:eq(2)").text());
                String cpuValueStr = row.select("td:eq(3)").text();
                if (cpuRank <= 1500) {
                    if (!"NA".equals(cpuValueStr)) {
                        double cpuValue = Double.parseDouble(cpuValueStr.replace(",", ""));
                        String priceStr = row.select("td:eq(4)").text();
                        int cpuPrice = (int) Double.parseDouble(priceStr.replaceAll("[^\\d]", "")) * 12;

                        // CpuList 모델 객체 생성
                        CpuList cpuList = CpuList.builder()
                                .cpuId(cpuId)
                                .cpuName(cpuName)
                                .cpuMark(cpuMark)
                                .cpuRank(cpuRank)
                                .cpuValue(cpuValue)
                                .cpuPrice(cpuPrice)
                                .build();
                        insertCpuList.save(cpuList);
                    } else {
                        CpuList cpuList = CpuList.builder()
                                .cpuId(cpuId)
                                .cpuName(cpuName)
                                .cpuMark(cpuMark)
                                .cpuRank(cpuRank)
                                .build();
                        insertCpuList.save(cpuList);
                    }
                }

            }
        }
        return "success!!";

    }

    @GetMapping("/ram_list")
    public String getRamList() throws IOException {
        String url = "https://www.memorybenchmark.net/ram_list-ddr4.php";
        Document document = Jsoup.connect(url).get();
        Element tbody = document.select("tbody").first();
        Elements rows = tbody.select("tr");

        // id 범위 지정
        int start = 1;
        int end = 23000;
        String ramType = "ddr4";

        for (Element row : rows) {
            Element link = row.select("td:first-child a").first();
            String href = link.attr("href");
            int ramId = Integer.parseInt(href.split("&id=")[1]);

            if (ramId >= start && ramId <= end) {
                String ramName = link.text();
                int ramLatency = Integer.parseInt(row.select("td:nth-child(2)").text());
                double ramRead = Double.parseDouble(row.select("td:nth-child(3)").text());
                double ramWrite = Double.parseDouble(row.select("td:nth-child(4)").text());

                int ramSize = 0;
                Pattern pattern = Pattern.compile("(\\d+)\\s*(GB|MB|TB|KB)");
                Matcher matcher = pattern.matcher(ramName);
                if (matcher.find()) {
                    ramSize = Integer.parseInt(matcher.group(1));
                }
                ramName = ramName.replaceAll("\\d+\\s*(GB|MB|TB|KB)", "").trim();

                //System.out.println(ramId + " || " + ramName + " || " + ramLatency + " || " + ramRead + " || " + ramWrite);

                if(ramLatency<=70){
                    RamList ramList = RamList.builder()
                            .ramId(ramId)
                            .ramName(ramName)
                            .ramType(ramType)
                            .ramSize(ramSize)
                            .ramLatency(ramLatency)
                            .ramRead(ramRead)
                            .ramWrite(ramWrite)
                            .build();
                    insertRamList.save(ramList);
                }
            }
        }
        return "success!!";
    }

    @GetMapping("/gpu_list")
    public String getCpuImage() throws IOException {
        String url = "https://www.videocardbenchmark.net/gpu_list.php";
        Document document = Jsoup.connect(url).get();
        // 데이터 추출
        for (int i = 1; i <= 4785; i++) {
            Element row = document.select("tr#gpu" + i).first();
            int gpuId = i;
            if (row != null) {
                String gpuName = row.select("td:eq(0)").text();
                int gpuMark = Integer.parseInt(row.select("td:eq(1)").text().replace(",", ""));

                int gpuRank = Integer.parseInt(row.select("td:eq(2)").text());
                String gpuValueStr = row.select("td:eq(3)").text();
                if(gpuRank<=1500){
                    if (!gpuValueStr.equals("NA")) {
                        double gpuValue = Double.parseDouble(gpuValueStr.replace(",", ""));
                        String priceStr = row.select("td:eq(4)").text();
                        int gpuPrice = (int) Double.parseDouble(priceStr.replaceAll("[^\\d]", "")) * 12;

                        // GpuList 모델 객체 생성
                        GpuList gpuList = GpuList.builder()
                                .gpuId(gpuId)
                                .gpuName(gpuName)
                                .gpuMark(gpuMark)
                                .gpuRank(gpuRank)
                                .gpuValue(gpuValue)
                                .gpuPrice(gpuPrice)
                                .build();
                        insertGpuList.save(gpuList);
                    } else {
                        GpuList gpuList = GpuList.builder()
                                .gpuId(gpuId)
                                .gpuName(gpuName)
                                .gpuMark(gpuMark)
                                .gpuRank(gpuRank)
                                .build();
                        insertGpuList.save(gpuList);
                    }
                }

            }
        }
        return "success!!";
    }
}


