package com.hadoop.demo.Controller;

import com.hadoop.demo.Model.CpuList;
import com.hadoop.demo.Service.CpuListService;
import com.hadoop.demo.Service.GpuListService;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin
public class ImgCrawlingController {

    @Autowired
    private CpuListService cpuListService;

    @Autowired
    private GpuListService gpuListService;

    @GetMapping("/cpu_img")
    public void updateGpuImageUrls() throws IOException {
        System.setProperty("webdriver.chrome.driver", "src/main/resources/chromedriver.exe");

        ChromeOptions options = new ChromeOptions();
        options.addArguments("--remote-allow-origins=*");
        WebDriver driver = new ChromeDriver(options);

        String url = "https://cpu.userbenchmark.com";
        // Google 검색 페이지 접속
        driver.get(url);

        for(int i=1; i<=29;i++){ //page count
            System.out.println("count :" + i);
            insertImg(driver);
        }

        driver.quit();

    }


    public void insertImg(WebDriver driver){
        List<CpuList> cpuList = cpuListService.findAll();
        for(int i=1; i<=50; i++){
            WebElement webElement = driver.findElement(By.xpath("//*[@id=\"tableDataForm:mhtddyntac\"]/table/tbody/tr[ " + i + "]/td[2]/div/div[1]/a/img"));
            String imageUrl = webElement.getAttribute("src");
            System.out.println(imageUrl);
            WebElement webElement2 = driver.findElement(By.xpath("//*[@id=\"tableDataForm:mhtddyntac\"]/table/tbody/tr[" + i + "]/td[2]/div/div[2]/span/a"));
            String cpuName = webElement2.getText();
            System.out.println(cpuName);
            for (CpuList cpu : cpuList){
                if(cpu.getCpuName().contains(cpuName)){
                    cpu.setCpuUrl(imageUrl);
                    cpuListService.save(cpu);
                }
            }
        }
        try {
            // 'Next »' 버튼을 클릭하여 다음 페이지로 이동
            WebElement nextButton = driver.findElement(By.linkText("Next »"));
            nextButton.click();
            Thread.sleep(4000);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/cpu_img2")
    public void insertLeftImg(){
        List<CpuList> cpuList = cpuListService.findAll();
        for(CpuList cpu : cpuList){
            if(cpu.getCpuUrl()==null){
                if(cpu.getCpuName().startsWith("Intel Xeon")){
                    cpu.setCpuUrl("https://www.userbenchmark.com/resources/img/generic/cpu/xeon.jpg");
                }
                else if(cpu.getCpuName().startsWith("Intel Pentium")){
                    cpu.setCpuUrl("https://www.userbenchmark.com/resources/img/generic/cpu/pentium.jpg");
                }
                else if(cpu.getCpuName().startsWith("Intel Core i3")){
                    cpu.setCpuUrl("https://www.userbenchmark.com/resources/img/generic/cpu/i3.jpg");
                }
                else if(cpu.getCpuName().startsWith("Intel Atom")){
                    cpu.setCpuUrl("https://www.userbenchmark.com/resources/img/generic/cpu/atom.jpg");
                }
                else if(cpu.getCpuName().startsWith("Intel Core i7")){
                    cpu.setCpuUrl("https://www.userbenchmark.com/resources/img/generic/cpu/i7.jpg");
                }
                else if(cpu.getCpuName().startsWith("Intel Core i5")){
                    cpu.setCpuUrl("https://www.userbenchmark.com/resources/img/generic/cpu/i5.jpg");
                }
                else if(cpu.getCpuName().startsWith("AMD Ryzen 7")){
                    cpu.setCpuUrl("https://www.userbenchmark.com/resources/img/generic/cpu/r7.jpg");
                }
                else if(cpu.getCpuName().startsWith("AMD Ryzen 5")){
                    cpu.setCpuUrl("https://www.userbenchmark.com/resources/img/generic/cpu/r5.jpg");
                }
                else if(cpu.getCpuName().startsWith("AMD Ryzen 3")){
                    cpu.setCpuUrl("https://www.userbenchmark.com/resources/img/generic/cpu/r3.jpg");
                }
                else if(cpu.getCpuName().startsWith("AMD Ryzen 9")){
                    cpu.setCpuUrl("https://www.userbenchmark.com/resources/img/generic/cpu/r9.jpg");
                }
                else if(cpu.getCpuName().startsWith("AMD Athlon")){
                    cpu.setCpuUrl("https://www.userbenchmark.com/resources/img/generic/cpu/athlon.jpg");
                }
                else if(cpu.getCpuName().startsWith("AMD Ryzen TR")){
                    cpu.setCpuUrl("https://www.userbenchmark.com/resources/img/generic/cpu/tr.jpg");
                }
                else if(cpu.getCpuName().startsWith("AMD Opteron")){
                    cpu.setCpuUrl("https://www.userbenchmark.com/resources/img/generic/cpu/amd.jpg");
                }
                else if(cpu.getCpuName().startsWith("AMD Ryzen Threadripper")){
                    cpu.setCpuUrl("https://www.userbenchmark.com/resources/img/generic/cpu/tr.jpg");
                }
                else if(cpu.getCpuName().startsWith("AMD EPYC")){
                    cpu.setCpuUrl("src/main/resources/amd_epyc_img.jpg");
                }
                else{
                    cpu.setCpuUrl("src/main/resources/no_img.jpg");
                }
                cpuListService.save(cpu);
            }
        }
    }


}
