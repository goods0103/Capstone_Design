package com.hadoop.demo.Controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import static java.lang.Thread.sleep;


@CrossOrigin
@RestController
public class BottleNeckController {

//    @Autowired
//    private BottleNeckService bottleNeckService;
//
//    @Autowired
//    private BottleNeck2Service bottleNeck2Service;
//
//    @GetMapping("/setBottleNeck")
//    public void setBottleNeckList() {
//        List<BottleNeck> bottleNeckList = bottleNeckService.findAll();
//        double value = 99.9;
//        for(BottleNeck bottleNeck1 : bottleNeckList) {
//
//
//                BottleNeck2 bottleNeck = BottleNeck2.builder()
//                        .cpuInfo(bottleNeck1.getCpuInfo())
//                        .gpuInfo(bottleNeck1.getGpuInfo())
//                        .cpuBottleNeckValue(value)
//                        .gpuBottleNeckValue(value)
//                        .build();
//                bottleNeck2Service.save(bottleNeck);
//
//        }
//    }

//    // bottleneck 레코드 만들기
//    @GetMapping("/setBottleNeck")
//    public void setBottleNeckList() {
//        List<PopularList> popularLists = popularListService.findAll();
//        for(PopularList popularList : popularLists) {
//            String cpu = popularList.getCpuName().replace("?", " ");
//            for(PopularList popularList1 : popularLists) {
//                if(popularList1.getGpuName() == null)
//                    break;
//                String gpu = popularList1.getGpuName();
//                Double value = 0.0;
//
//                BottleNeck bottleNeck = BottleNeck.builder()
//                        .cpuInfo(cpu)
//                        .gpuInfo(gpu)
//                        .bottleNeckValue(value)
//                        .build();
//                bottleNeckService.save(bottleNeck);
//            }
//        }
//    }

//    @Value("${webdriver.chrome.driver}")
//    private String chromeDriverPath;
//
//    @GetMapping("/search")
//    public List<String> getBottleNeck() throws InterruptedException {
//        List<String> bottleList = new ArrayList<>();
//        List<String> selectCpuList = new ArrayList<>();
//        List<String> selectGpuList = new ArrayList<>();
//
//        System.setProperty("webdriver.chrome.driver", chromeDriverPath);
//        ChromeOptions options = new ChromeOptions();
////        options.setExperimentalOption("debuggerAddress", "127.0.0.1:12000");
//        options.addArguments("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36");
//        options.addArguments("--remote-allow-origins=*");
//
//        WebDriver driver = new ChromeDriver(options);
//
//        driver.get("https://pc-builds.com/bottleneck-calculator/");
//
//        // 현재 윈도우 핸들 가져오기
////        String mainWindowHandle = driver.getWindowHandle();
////
////        System.out.println(mainWindowHandle);
////        System.out.println(driver.getWindowHandles());
////        // 팝업창 핸들 가져오기
////        Set<String> handles = driver.getWindowHandles();
////        handles.remove(mainWindowHandle);
////        String popupWindowHandle = handles.iterator().next();
////        System.out.println(popupWindowHandle);
////
////        // 팝업창으로 이동
////        driver.switchTo().window(popupWindowHandle);
////        System.out.println(driver.getWindowHandle());
//
//        sleep(3000);
//        // 팝업창에서 동작 수행
//        WebElement elementPop = driver.findElement(By.cssSelector("button.css-47sehv"));
//        elementPop.click();
////
////        // 원래 윈도우로 이동
////        driver.switchTo().window(mainWindowHandle);
//
//        sleep(1000);
//        WebElement elementResolution = driver.findElement(By.xpath("//*[@id=\"card_resolution\"]/div/div[1]/div[2]/select"));
//        Select selectResolution = new Select(elementResolution);
//        selectResolution.selectByIndex(15);
//
//        for(int i=1; i<5; i++) {
//
//            System.out.println(i);
//
//            sleep(1000);
//            WebElement elementCpu = driver.findElement(By.xpath("//*[@id=\"card_cpu\"]/div/div[2]/div[2]/select"));
//            Select selectCpu = new Select(elementCpu);
//            selectCpu.selectByIndex(i);
//            selectCpuList.add(selectCpu.getFirstSelectedOption().getText());
//
//            sleep(1000);
//            WebElement elementGpu = driver.findElement(By.xpath("//*[@id=\"card_gpu\"]/div/div[1]/div[2]/select"));
//            Select selectGpu = new Select(elementGpu);
//            selectGpu.selectByIndex(i);
//            selectGpuList.add(selectGpu.getFirstSelectedOption().getText());
//            sleep(1000);
//
//            //sleep(1000);
//
//            System.out.println("now!");
//            sleep(1000);
////        WebElement element = driver.findElement(By.cssSelector("button"));
////        element.click();
//
//            System.out.println(driver.getCurrentUrl());
//            bottleList.add(driver.getCurrentUrl());
//
//            driver.navigate().back();
//
//            System.out.println(driver.getCurrentUrl());
//        }
//
//        System.out.println(bottleList);
//        System.out.println(selectCpuList);
//        System.out.println(selectGpuList);
//
////        sleep(10000);
////        WebElement elementCheck = driver.findElement(By.xpath("//*[@id=\"cf-stage\"]/div[6]/label/input"));
////        elementCheck.click();
////        //#cf-stage > div.ctp-checkbox-container > label > input[type=checkbox]
////
////        sleep(10000);
////        WebElement elementBottle = driver.findElement(By.xpath("//*[@id=\"result\"]/div/div[1]/p[2]"));
////        System.out.println(elementBottle.getText());
//
//        driver.quit();
//        return bottleList;
//    }
}
