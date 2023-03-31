package com.hadoop.demo.Controller;

import com.hadoop.demo.Model.CpuList;
import com.hadoop.demo.Model.GpuList;
import com.hadoop.demo.Service.CpuListService;
import com.hadoop.demo.Service.GpuListService;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@CrossOrigin
@RestController
public class CrawlingController {

    @Autowired
    private CpuListService insertCpuList;

    @Autowired
    private GpuListService insertGpuList;

    @GetMapping("/cpu_list")
    public String getCpuList() throws IOException {
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
                if(cpuRank<=1500){
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
