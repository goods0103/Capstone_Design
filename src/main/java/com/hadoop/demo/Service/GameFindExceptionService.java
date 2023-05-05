//package com.hadoop.demo.Service;
//
//import com.hadoop.demo.Model.GameList;
//import org.jsoup.Jsoup;
//import org.jsoup.nodes.Document;
//import org.jsoup.nodes.Element;
//import org.jsoup.select.Elements;
//import org.openqa.selenium.By;
//import org.openqa.selenium.WebDriver;
//import org.openqa.selenium.WebElement;
//import org.openqa.selenium.chrome.ChromeDriver;
//import org.openqa.selenium.chrome.ChromeOptions;
//import org.openqa.selenium.support.ui.ExpectedConditions;
//import org.openqa.selenium.support.ui.WebDriverWait;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.time.Duration;
//import java.util.Arrays;
//
//@Service
//public class GameFindExceptionService {
//
//    @Autowired
//    GameListService gameListService;
//
//    public void search(GameList gamelist, String url) {
//        System.setProperty("webdriver.chrome.driver", "src/main/resources/chromedriver.exe");
//
//        ChromeOptions options = new ChromeOptions();
//        options.addArguments("--remote-allow-origins=*");
//        WebDriver driver = new ChromeDriver(options);
//
//        // Google 검색 페이지 접속
//        driver.get(url);
//
//
//
//
//        WebElement year = driver.findElement(By.id("ageYear"));
//        year.sendKeys("1995");
//
//        // View Page 버튼 클릭
//        WebElement viewPageButton = driver.findElement(By.id("view_product_page_btn"));
//        viewPageButton.click();
//
//        // 웹 요소 로드 대기 (10초)
//        Duration duration = Duration.ofSeconds(5);
//        WebDriverWait wait = new WebDriverWait(driver, duration);
//
//        // 새로고침
//        driver.navigate().refresh();
//
//        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//h2[contains(text(),'System Requirements')]")));
//
//        String pageSource = driver.getPageSource();
//        //driver.quit();
//
//        Document pageDoc = Jsoup.parse(pageSource);
//        Element reqElement = pageDoc.select(".sysreq_contents > .game_area_sys_req_full, .sysreq_contents > .game_area_sys_req.active").first();
//
//        Element cpuElement = reqElement.select("li strong:contains(Processor)").last();
//
//        //cpu 예외처리
//        String cpu = "";
//        if (cpuElement != null) {
//            cpu = cpuElement.parent().text().replaceAll("[™®]", "");
//        }
//
//        //구분자 split
//        String[] cpuSplit = null;
//        if (cpu.contains("|")) {
//            cpuSplit = cpu.split("\\|");
//        } else if (cpu.contains("/")) {
//            cpuSplit = cpu.split("/");
//        } else if (cpu.contains(",")) {
//            cpuSplit = cpu.split(",");
//        } else if (cpu.contains(";")) {
//            cpuSplit = cpu.split(";");
//        } else if (cpu.contains("、")) {
//            cpuSplit = cpu.split("、");
//        } else if (cpu.contains(" or ")) {
//            cpuSplit = cpu.split(" or ");
//        }else {
//            cpuSplit = new String[]{cpu};
//        }
//
//        String cpu1 = "";
//        String cpu2 = "";
//        if (cpuSplit != null && cpuSplit.length > 0) {
//
//            //필요없는 문자열 삭제
//            String first = cpuSplit[0].trim().replaceAll("(Processor: )|Processor:|\\*With video card: |\\*" +
//                    "Without video card: |\\(TM\\)|\\(R\\)", "");
//            //System.out.println("first :" + first);
//            if (first.trim().toLowerCase().startsWith("intel") || first.trim().toLowerCase().startsWith("amd")) {
//                if (cpuSplit.length == 1 && first.length() >= 50) {
//                    //Intel 과 AMD만 취급 2개만.
//                    int intel_index = first.indexOf("Intel");
//                    int amd_index = first.indexOf("AMD");
//                    if (intel_index >= 0 && amd_index >= 0) {
//                        if (intel_index < amd_index) {
//                            cpu1 = first.substring(intel_index, amd_index).trim();
//                            cpu2 = first.substring(amd_index).trim();
//                        } else {
//                            cpu1 = first.substring(amd_index, intel_index).trim();
//                            cpu2 = first.substring(intel_index).trim();
//                        }
//                    } else if (intel_index >= 0) {
//                        String[] cpuSplit2 = first.split("Intel");
//                        cpu1 = "Intel " + cpuSplit2[1].trim();
//                        cpu2 = "Intel " + cpuSplit2[2].trim();
//                    } else if (amd_index >= 0) {
//                        String[] cpuSplit3 = first.split("AMD");
//                        cpu1 = "AMD " + cpuSplit3[1].trim();
//                        cpu2 = "AMD " + cpuSplit3[2].trim();
//                    }
//                }
//                else if(cpuSplit.length==1){
//                    cpu1 = first.trim();
//                }
//                else{
//                    cpu1 = first.trim();
//                }
//            }
//            if (cpuSplit.length > 1) {
//                String second = cpuSplit[1].trim().replace("Processor: ", "");;
//                //System.out.println("second :" + second);
//                if (second.trim().toLowerCase().startsWith("intel") || second.trim().toLowerCase().startsWith("amd")) {
//                    cpu2 = second;
//                }
//            }
//
//            //cpu 마무리.
//            if(cpu1.length()>5){
//                cpu1 = cpu1.trim().toLowerCase().replaceAll("(,|\\s+(or\\s+)?(greater|over|Equivalent|better))+$", "");
//                if(cpu1.equalsIgnoreCase("AMD at 2.8 GHz") || cpu1.equalsIgnoreCase("Intel or AMD") ||
//                        cpu1.equalsIgnoreCase("AMD equivalent") || cpu1.equalsIgnoreCase("amd cpu with sse2")){
//                    cpu1 = "";
//                }
//                else if (cpu1.contains(" or ")) {
//                    String[] cpuArray = cpu1.split(" or ");
//                    cpu1 = cpuArray[0].trim();
//                }
//                else if(cpu1.endsWith(")") || cpu1.endsWith("(")){ // 짝이 맞지않는 괄호 삭제
//                    int openCount = 0, closeCount = 0;
//
//                    for (int i = 0; i < cpu1.length(); i++) {
//                        char ch = cpu1.charAt(i);
//                        if (ch == '(') {
//                            openCount++;
//                        } else if (ch == ')') {
//                            if (openCount > 0) {
//                                openCount--;
//                            } else {
//                                // 짝이 맞지 않은 닫는 괄호를 발견한 경우 해당 괄호를 삭제합니다.
//                                cpu1 = cpu1.substring(0, i) + cpu1.substring(i + 1);
//                                closeCount++;
//                                i--;
//                            }
//                        }
//                    }
//
//                    // 여는 괄호의 개수가 더 많은 경우 짝이 맞지 않은 여는 괄호를 삭제합니다.
//                    if (openCount > closeCount) {
//                        cpu1 = cpu1.replaceAll("\\(", "");
//                    }
//                }
//            }
//            else{
//                cpu1 = "";
//            }
//
//            if(cpu2.length()>5){
//                cpu2 = cpu2.trim().toLowerCase().replaceAll("(,|\\s+(or\\s+)?(greater|over|Equivalent|better))+$", "");
//                if(cpu2.equalsIgnoreCase("AMD at 2.8 GHz") || cpu2.equalsIgnoreCase("Intel or AMD") ||
//                        cpu2.equalsIgnoreCase("AMD equivalent") || cpu2.equalsIgnoreCase("amd cpu with sse2")){
//                    cpu2 = "";
//                }
//                else if (cpu2.contains(" or ")) {
//                    String[] cpuArray = cpu2.split(" or ");
//                    cpu2 = cpuArray[0].trim();
//                }
//                else if(cpu2.endsWith(")") || cpu2.endsWith("(")){ // 짝이 맞지않는 괄호 삭제
//                    int openCount = 0, closeCount = 0;
//
//                    for (int i = 0; i < cpu2.length(); i++) {
//                        char ch = cpu2.charAt(i);
//                        if (ch == '(') {
//                            openCount++;
//                        } else if (ch == ')') {
//                            if (openCount > 0) {
//                                openCount--;
//                            } else {
//                                // 짝이 맞지 않은 닫는 괄호를 발견한 경우 해당 괄호를 삭제합니다.
//                                cpu2 = cpu2.substring(0, i) + cpu2.substring(i + 1);
//                                closeCount++;
//                                i--;
//                            }
//                        }
//                    }
//
//                    // 여는 괄호의 개수가 더 많은 경우 짝이 맞지 않은 여는 괄호를 삭제합니다.
//                    if (openCount > closeCount) {
//                        cpu2 = cpu2.replaceAll("\\(", "");
//                    }
//                }
//            }
//            else{
//                cpu2 = "";
//            }
//        }
//
//        Element gpuElement = reqElement.select("li strong:contains(Graphics), li strong:contains(Video), li strong:contains(Video Card)").last();
//
//        //gpu 예외처리
//        String gpu = "";
//        if (gpuElement != null) {
//            gpu = gpuElement.parent().text().replaceAll("[™®]", "");
//        }
//
//        //구분자 split
//        String[] gpuSplit = null;
//        if (gpu.contains("|")) {
//            gpuSplit = gpu.split("\\|");
//        } else if (gpu.contains("/")) {
//            gpuSplit = gpu.split("/");
//        } else if (gpu.contains(",")) {
//            gpuSplit = gpu.split(",");
//        } else if (gpu.contains(";")) {
//            gpuSplit = gpu.split(";");
//        } else if (gpu.contains("、")) {
//            gpuSplit = gpu.split("、");
//        } else if (gpu.contains(" or ")) {
//            gpuSplit = gpu.split(" or ");
//        }else {
//            gpuSplit = new String[]{gpu};
//        }
//
//        String gpu1 = "";
//        String gpu2 = "";
//        if (gpuSplit != null && gpuSplit.length > 0) {
//
//            //필요없는 문자열 삭제
//            String first = gpuSplit[0].trim().replaceAll("(Graphics: )|Graphics:|\\*With video card: |\\*" +
//                    "Without video card: |\\(TM\\)|\\(R\\)|Video Card: |Video: ", "");
//            //System.out.println("first :" + first);
//            if (first.trim().toLowerCase().contains("intel") || first.trim().toLowerCase().contains("geforce") || first.trim().toLowerCase().contains("radeon")) {
//                if (gpuSplit.length == 1 && first.length() >= 35) {
//                    int geforce_index = first.indexOf("GeForce");
//                    int radeon_index = first.indexOf("Radeon");
//                    int intel_index = first.indexOf("Intel");
//                    int[] indices = {geforce_index, radeon_index, intel_index};
//                    Arrays.sort(indices);
//
//                    if (geforce_index >= 0 && radeon_index >= 0) {
//                        if (geforce_index < radeon_index) {
//                            gpu1 = first.substring(geforce_index, radeon_index).trim();
//                            gpu2 = first.substring(radeon_index).trim();
//                        } else {
//                            gpu1 = first.substring(radeon_index, geforce_index).trim();
//                            gpu2 = first.substring(geforce_index).trim();
//                        }
//                    } else if (geforce_index >= 0 && intel_index >= 0) {
//                        if (geforce_index < intel_index) {
//                            gpu1 = first.substring(geforce_index, intel_index).trim();
//                            gpu2 = first.substring(intel_index).trim();
//                        } else {
//                            gpu1 = first.substring(intel_index, geforce_index).trim();
//                            gpu2 = first.substring(geforce_index).trim();
//                        }
//                    } else if (radeon_index >= 0 && intel_index >= 0) {
//                        if (radeon_index < intel_index) {
//                            gpu1 = first.substring(radeon_index, intel_index).trim();
//                            gpu2 = first.substring(intel_index).trim();
//                        } else {
//                            gpu1 = first.substring(intel_index, radeon_index).trim();
//                            gpu2 = first.substring(radeon_index).trim();
//                        }
//                    } else if (geforce_index >= 0) {
//                        String[] gpuSplit1 = first.split("GeForce");
//                        gpu1 = "GeForce " + gpuSplit1[0].trim();
//                        gpu2 = "GeForce " + gpuSplit1[1].trim();
//                    } else if (radeon_index >= 0) {
//                        String[] gpuSplit2 = first.split("Radeon");
//                        gpu1 = "Radeon " + gpuSplit2[0].trim();
//                        gpu2 = "Radeon " + gpuSplit2[1].trim();
//                    } else if (intel_index >= 0) {
//                        String[] gpuSplit3 = first.split("Intel");
//                        gpu1 = "Intel " + gpuSplit3[0].trim();
//                        gpu2 = "Intel " + gpuSplit3[1].trim();
//                    }
//
//                } else if (gpuSplit.length == 1) {
//                    String[] brands = {"geforce", "radeon", "intel"};
//                    int find_index = -1;
//                    for (int i = 0; i < brands.length; i++) {
//                        if (first.toLowerCase().contains(brands[i])) {
//                            find_index = first.toLowerCase().indexOf(brands[i]);
//                            break;
//                        }
//                    }
//                    gpu1 = find_index >= 0 ? first.substring(find_index) : "";
//                } else { //legnth가 2이고 길이가 짧을떄
//                    String[] brands = {"geforce", "radeon", "intel"};
//                    int find_index = -1;
//                    for (int i = 0; i < brands.length; i++) {
//                        if (first.toLowerCase().contains(brands[i])) {
//                            find_index = first.toLowerCase().indexOf(brands[i]);
//                            break;
//                        }
//                    }
//                    gpu1 = find_index >= 0 ? first.substring(find_index) : "";
//                }
//            }
//            if (gpuSplit.length > 1) {
//                String second = gpuSplit[1].trim();
//                //System.out.println("second :" + second);
//                if (gpu1.equals("")) {
//                    if (second.length() >= 35) {
//                        int geforce_index = second.indexOf("GeForce");
//                        int radeon_index = second.indexOf("Radeon");
//                        int intel_index = second.indexOf("Intel");
//                        int[] indices = {geforce_index, radeon_index, intel_index};
//                        Arrays.sort(indices);
//
//                        if (geforce_index >= 0 && radeon_index >= 0) {
//                            if (geforce_index < radeon_index) {
//                                gpu1 = second.substring(geforce_index, radeon_index).trim();
//                                gpu2 = second.substring(radeon_index).trim();
//                            } else {
//                                gpu1 = second.substring(radeon_index, geforce_index).trim();
//                                gpu2 = second.substring(geforce_index).trim();
//                            }
//                        } else if (geforce_index >= 0 && intel_index >= 0) {
//                            if (geforce_index < intel_index) {
//                                gpu1 = second.substring(geforce_index, intel_index).trim();
//                                gpu2 = second.substring(intel_index).trim();
//                            } else {
//                                gpu1 = second.substring(intel_index, geforce_index).trim();
//                                gpu2 = second.substring(geforce_index).trim();
//                            }
//                        } else if (radeon_index >= 0 && intel_index >= 0) {
//                            if (radeon_index < intel_index) {
//                                gpu1 = second.substring(radeon_index, intel_index).trim();
//                                gpu2 = second.substring(intel_index).trim();
//                            } else {
//                                gpu1 = second.substring(intel_index, radeon_index).trim();
//                                gpu2 = second.substring(radeon_index).trim();
//                            }
//                        } else if (geforce_index >= 0) {
//                            String[] gpuSplit1 = second.split("GeForce");
//                            gpu1 = "GeForce " + gpuSplit1[0].trim();
//                            gpu2 = "GeForce " + gpuSplit1[1].trim();
//                        } else if (radeon_index >= 0) {
//                            String[] gpuSplit2 = second.split("Radeon");
//                            gpu1 = "Radeon " + gpuSplit2[0].trim();
//                            gpu2 = "Radeon " + gpuSplit2[1].trim();
//                        } else if (intel_index >= 0) {
//                            String[] gpuSplit3 = second.split("Intel");
//                            gpu1 = "Intel " + gpuSplit3[0].trim();
//                            gpu2 = "Intel " + gpuSplit3[1].trim();
//                        }
//                    }
//                    else{
//                        String[] brands = {"geforce", "radeon", "intel"};
//                        int find_index = -1;
//                        for (int i = 0; i < brands.length; i++) {
//                            if (second.toLowerCase().contains(brands[i])) {
//                                find_index = second.toLowerCase().indexOf(brands[i]);
//                                break;
//                            }
//                        }
//                        gpu2 = find_index >= 0 ? second.toLowerCase().substring(find_index) : "";
//                    }
//                } else { //legnth가 2이고 길이가 짧을떄
//                    String[] brands = {"geforce", "radeon", "intel"};
//                    int find_index = -1;
//                    for (int i = 0; i < brands.length; i++) {
//                        if (second.toLowerCase().contains(brands[i])) {
//                            find_index = second.toLowerCase().indexOf(brands[i]);
//                            break;
//                        }
//                    }
//                    gpu2 = find_index >= 0 ? second.toLowerCase().substring(find_index) : "";
//                }
//            }
//
//            //gpu 마무리.
//            if(gpu1.length()>5){
//                gpu1 = gpu1.trim().toLowerCase()
//                        .replaceAll("(,|\\s+(or\\s+)?(greater|over|equivalent|better))+$", "")
//                        .replaceAll(",\\s*amd\\b|\\bon board gpu\\b", "");
//                if(gpu1.equalsIgnoreCase("geforce gtx 1050ti (legacy gpu: geforce gtx 960)")){
//                    gpu1 = "geforce gtx 1050ti";
//                }
//                else if(gpu1.equalsIgnoreCase("geforce4")){
//                    gpu1 = "";
//                }
//                else if (gpu1.contains(" or ")) {
//                    String[] gpuArray = gpu1.split(" or ");
//                    gpu1 = gpuArray[0].trim();
//                }
//                else if (gpu1.contains(". ")) {
//                    String[] gpuArray = gpu1.split("\\. ");
//                    gpu1 = gpuArray[0].trim();
//                }
//                else if (gpu1.contains("directx")) {
//                    String[] gpuArray = gpu1.split("directx");
//                    gpu1 = gpuArray[0].trim().replace(" -", "");
//                }
//                if(gpu1.endsWith(")") || gpu1.endsWith("(")){ // 짝이 맞지않는 괄호 삭제
//                    int openCount = 0, closeCount = 0;
//
//                    for (int i = 0; i < gpu1.length(); i++) {
//                        char ch = gpu1.charAt(i);
//                        if (ch == '(') {
//                            openCount++;
//                        } else if (ch == ')') {
//                            if (openCount > 0) {
//                                openCount--;
//                            } else {
//                                // 짝이 맞지 않은 닫는 괄호를 발견한 경우 해당 괄호를 삭제합니다.
//                                gpu1 = gpu1.substring(0, i) + gpu1.substring(i + 1);
//                                closeCount++;
//                                i--;
//                            }
//                        }
//                    }
//
//                    // 여는 괄호의 개수가 더 많은 경우 짝이 맞지 않은 여는 괄호를 삭제합니다.
//                    if (openCount > closeCount) {
//                        gpu1 = gpu1.replaceAll("\\(", "");
//                    }
//                }
//            }
//            else{
//                gpu1 = "";
//            }
//
//            if(gpu2.length()>5){
//                gpu2 = gpu2.trim().toLowerCase()
//                        .replaceAll("(,|\\s+(or\\s+)?(greater|over|equivalent|better))+$", "")
//                        .replaceAll(",\\s*amd\\b|\\bon board gpu\\b|、", "");
//                if(gpu2.equalsIgnoreCase("geforce gtx 1050ti (legacy gpu: geforce gtx 960)")){
//                    gpu2 = "geforce gtx 1050ti";
//                }
//                else if(gpu2.equalsIgnoreCase("geforce4")){
//                    gpu2 = "";
//                }
//                else if (gpu2.contains(" or ")) {
//                    String[] gpuArray = gpu2.split(" or ");
//                    gpu2 = gpuArray[0].trim();
//                }
//                else if (gpu2.contains(". ")) {
//                    String[] gpuArray = gpu2.split("\\. ");
//                    gpu2 = gpuArray[0].trim();
//                }
//                else if (gpu2.contains("directx")) {
//                    String[] gpuArray = gpu2.split("directx");
//                    gpu2 = gpuArray[0].trim().replace(" -", "");
//                }
//                else if(gpu2.endsWith(")") || gpu2.endsWith("(")){ // 짝이 맞지않는 괄호 삭제
//                    int openCount = 0, closeCount = 0;
//
//                    for (int i = 0; i < gpu2.length(); i++) {
//                        char ch = gpu2.charAt(i);
//                        if (ch == '(') {
//                            openCount++;
//                        } else if (ch == ')') {
//                            if (openCount > 0) {
//                                openCount--;
//                            } else {
//                                // 짝이 맞지 않은 닫는 괄호를 발견한 경우 해당 괄호를 삭제합니다.
//                                gpu2 = gpu2.substring(0, i) + gpu2.substring(i + 1);
//                                closeCount++;
//                                i--;
//                            }
//                        }
//                    }
//
//                    // 여는 괄호의 개수가 더 많은 경우 짝이 맞지 않은 여는 괄호를 삭제합니다.
//                    if (openCount > closeCount) {
//                        gpu2 = gpu2.replaceAll("\\(", "");
//                    }
//                }
//            }
//            else{
//                gpu2 = "";
//            }
//
//        }
//
//        Element ramElement = reqElement.select("li strong:contains(Memory)").last();
//
//        //Ram 예외처리
//        String ram = "";
//        if (ramElement != null) {
//            String ramText = ramElement.parent().text();
//            if (ramText.contains("GB RAM")) {
//                ram = ramText.replaceAll("[^\\d.]", "");
//            } else if (ramText.contains("MB RAM")) {
//                float ramInMB = Float.parseFloat(ramText.replaceAll("[^\\d.]", ""));
//                ram = String.valueOf(Math.round(ramInMB / 1024)) + " GB";
//            }
//        }
//        int ram1;
//        if (ram.equals("")) {
//            ram1 = 0; // 빈 문자열이나 null인 경우 0으로 설정
//        } else {
//            if(ram.contains(".")){
//                String[] ramArray = ram.split("\\.");
//                ram = ramArray[0];
//                ram1 = Integer.parseInt(ram); // 정수로 변환
//            }
//            else{
//                ram1 = Integer.parseInt(ram); // 정수로 변환
//            }
//        }
//
////        System.out.println("gpu1:" + gpu1);
////        System.out.println("gpu2:" + gpu2);
////        System.out.println("cpu1:" + cpu1);
////        System.out.println("cpu2:" + cpu2);
////        System.out.println("ram:" + ram);
//        GameList gameList = GameList.builder()
//                .gameId2(gamelist.getGameId2())
//                .gameId(gamelist.getGameId())
//                .gameName(gamelist.getGameName())
//                .gameImg(gamelist.getGameImg())
//                .recommendedGameCpu1(cpu1)
//                .recommendedGameCpu2(cpu2)
//                .recommendedGameGpu1(gpu1)
//                .recommendedGameGpu2(gpu2)
//                .recommendedGameRam(ram1)
//                .minimumGameCpu1(gamelist.getMinimumGameCpu1())
//                .minimumGameCpu2(gamelist.getMinimumGameCpu2())
//                .minimumGameGpu1(gamelist.getMinimumGameGpu1())
//                .minimumGameGpu2(gamelist.getMinimumGameGpu2())
//                .minimumGameRam(gamelist.getMinimumGameRam())
//                .build();
//        gameListService.save(gameList);
//    }
//}

