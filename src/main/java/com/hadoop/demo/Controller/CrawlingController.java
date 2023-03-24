package com.hadoop.demo.Controller;

import com.hadoop.demo.Model.CpuList;
import com.hadoop.demo.Service.CpuListService;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@CrossOrigin
@RestController
public class CrawlingController {

    @Autowired
    private CpuListService insertCpuList;

    @GetMapping("/cpu_list")
    public String getcpu_list() throws IOException {
        String url = "https://www.cpubenchmark.net/cpu_list.php";
        Document document = Jsoup.connect(url).get();
        // 데이터 추출
        for (int i = 1; i <= 50; i++) {
            Element row = document.select("tr#cpu" + i).first();
            if (row != null) {
                String cpu_name = row.select("td a").text();
                int cpu_mark = Integer.parseInt(row.select("td:eq(1)").text().replace(",", ""));
                int cpu_rank = Integer.parseInt(row.select("td:eq(2)").text());
                String cpuValueStr = row.select("td:eq(3)").text();
                if (!"NA".equals(cpuValueStr)) {
                    Double cpu_value = Double.parseDouble(cpuValueStr);
                    String priceStr = row.select("td:eq(4)").text();
                    Integer cpu_price = Integer.parseInt(priceStr.replaceAll("[^\\d]", ""));

                    // CpuList 모델 객체 생성
                    CpuList cpuList = CpuList.builder()
                            .cpu_name(cpu_name)
                            .cpu_mark(cpu_mark)
                            .cpu_rank(cpu_rank)
                            .cpu_value(cpu_value)
                            .cpu_price(cpu_price * 1000)
                            .build();
                    insertCpuList.save(cpuList);
                } else {
                    CpuList cpuList = CpuList.builder()
                            .cpu_name(cpu_name)
                            .cpu_mark(cpu_mark)
                            .cpu_rank(cpu_rank)
                            .build();
                    insertCpuList.save(cpuList);
                }

            }
        }
        List<CpuList> cpuList = insertCpuList.findAll();
        StringBuilder result = new StringBuilder();
        for (CpuList cpu : cpuList) {
            result.append("cpu: ").append(cpu.getCpu_name()).append("\n");
            result.append("cpu_mark: ").append(cpu.getCpu_mark()).append("\n");
            result.append("cpu_rank: ").append(cpu.getCpu_rank()).append("\n");
            if (cpu.getCpu_value() != 0) {
                result.append("cpu_value: ").append(cpu.getCpu_value());
            }
            result.append("\n");
            if (cpu.getCpu_price() != 0) {
                result.append("price: ").append(cpu.getCpu_price());
            }
            result.append("\n\n");
        }
        return result.toString();


    }
}
