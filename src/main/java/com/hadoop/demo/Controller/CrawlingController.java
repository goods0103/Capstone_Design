package com.hadoop.demo.Controller;

import com.hadoop.demo.Model.*;
import com.hadoop.demo.Service.*;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static java.lang.Integer.parseInt;

@CrossOrigin
@RestController
public class CrawlingController {


//    @Autowired
//    private CpuListService insertCpuList;
//    @Autowired
//    private CpuDetailsService cpuDetailsService;
//
//    @Autowired
//    private GpuListService insertGpuList;
//    @Autowired
//    private GpuDetailsService gpuDetailsService;
//
//    @Autowired
//    private RamListService insertRamList;
//
//    @Autowired
//    private GameListService gameListService;
//
//    @Autowired
//    private GameFindExceptionService gameFindExceptionService;


//    @GetMapping("/cpu_info")
//    public String insertCpuInfoDB() throws IOException {
//        List<CpuList> cpuListAll = insertCpuList.findAll();
//        for(CpuList cpu : cpuListAll) {
//            if(cpuDetailsService.findByName(cpu.getCpuName()) != null)
//                continue;
//            String name = cpu.getCpuName().replace(" ", "+");
//            System.out.println(name);
//            String url = "https://www.cpubenchmark.net/cpu.php?cpu=" + name;
//            Document document = Jsoup.connect(url).get();
//
//            String classType = "", socket = "", clock = "", turbo = "", tdp = "", cache = "", otherName = "";
//            int core = 0, str = 0;
//            // 데이터 추출
//            Elements row = document.select("div.left-desc-cpu > p");
//            for (Element select : row) {
//                String s = select.text();
//                String[] split = s.split(": ");
//                if(split.length == 1)
//                    continue;
//                switch (split[0]) {
//                    case "Class":
//                        classType = split[1];
//                        break;
//                    case "Socket":
//                        socket = split[1];
//                        break;
//                    case "Clockspeed":
//                        clock = split[1];
//                        break;
//                    case "Turbo Speed":
//                        turbo = split[1];
//                        break;
//                    case "Cores":
//                    case "Total Cores":
//                        core = Integer.parseInt(split[1].split(" ")[0]);
//                        break;
//                    case "Typical TDP":
//                        tdp = split[1];
//                        break;
//                    case "Cache Size":
//                        cache = s.split("Size:")[1].trim();
//                        break;
//                    case "Other names":
//                        otherName = split[1];
//                        break;
//                }
//            }
//
//            Elements row2 = document.select("div.desc-foot > p");
//            for (Element select : row2) {
//                String s = select.text();
//                String[] split = s.split(": ");
//                if(split.length == 1)
//                    continue;
//                switch (split[0]) {
//                    case "Class":
//                        classType = split[1];
//                        break;
//                    case "Socket":
//                        socket = split[1];
//                        break;
//                    case "Clockspeed":
//                        clock = split[1];
//                        break;
//                    case "Turbo Speed":
//                        turbo = split[1];
//                        break;
//                    case "Cores":
//                    case "Total Cores":
//                        core = Integer.parseInt(split[1].split(" ")[0]);
//                        break;
//                    case "Typical TDP":
//                        tdp = split[1];
//                        break;
//                    case "Cache Size":
//                        cache = s.split("Size:")[1].trim();
//                        break;
//                    case "Other names":
//                        otherName = split[1];
//                        break;
//                }
//            }
//
//            Element row4 = document.select("div.right-desc").first();
//            str = Integer.parseInt(row4.text().split("Rating: ")[1].split(" Samples:")[0]);
//
//            // CpuDetails 모델 객체 생성
//            CpuDetails cpuDetails = CpuDetails.builder()
//                    .cpuName(cpu.getCpuName())
//                    .classType(classType)
//                    .socket(socket)
//                    .clock(clock)
//                    .turbo(turbo)
//                    .core(core)
//                    .tdp(tdp)
//                    .cache(cache)
//                    .otherName(otherName)
//                    .str(str)
//                    .build();
//            cpuDetailsService.save(cpuDetails);
//        }
//        return "success!!";
//
//    }
//
//    @GetMapping("/gpu_info")
//    public String insertGpuInfoDB() throws IOException {
//        List<GpuList> gpuListAll = insertGpuList.findAll();
//        for(GpuList gpu : gpuListAll) {
//            if(gpuDetailsService.findByName(gpu.getGpuName()) != null)
//                continue;
//            String name = gpu.getGpuName().replace(" ", "+");
//            int id = gpu.getGpuId();
//            System.out.println(name + "&id=" + id);
//            String url = "https://www.videocardbenchmark.net/gpu.php?gpu=" + name + "&id=" + id;
//            Document document = Jsoup.connect(url).get();
//
//            String memorySize = "", coreClock = "", memoryClock = "", category = "", tdp = "", otherName = "";
//
//            // 데이터 추출
//            Elements row = document.select("div.desc-body > em > p");
//            for (Element select : row) {
//                String s = select.text();
//                String[] split = s.split(": ");
//                if(split.length == 1)
//                    continue;
//                switch (split[0]) {
//                    case "Max Memory Size":
//                        memorySize = split[1];
//                        break;
//                    case "Core Clock(s)":
//                        coreClock = split[1];
//                        break;
//                    case "Memory Clock(s)":
//                        memoryClock = split[1];
//                        break;
//                    case "Videocard Category":
//                        category = split[1];
//                        break;
//                    case "Max TDP":
//                        tdp = split[1];
//                        break;
//                    case "Other names":
//                        otherName = split[1];
//                        break;
//                }
//            }
//
//            Elements row2 = document.select("div.desc-foot > p");
//            for (Element select : row2) {
//                String s = select.text();
//                String[] split = s.split(": ");
//                if(split.length == 1)
//                    continue;
//                switch (split[0]) {
//                    case "Max Memory Size":
//                        memorySize = split[1];
//                        break;
//                    case "Core Clock(s)":
//                        coreClock = split[1];
//                        break;
//                    case "Memory Clock(s)":
//                        memoryClock = split[1];
//                        break;
//                    case "Videocard Category":
//                        category = split[1];
//                        break;
//                    case "Max TDP":
//                        tdp = split[1];
//                        break;
//                    case "Other names":
//                        otherName = split[1];
//                        break;
//                }
//            }
//
//            // CpuDetails 모델 객체 생성
//            GpuDetails gpuDetails = GpuDetails.builder()
//                    .gpuName(gpu.getGpuName())
//                    .memoryClock(memorySize)
//                    .coreClock(coreClock)
//                    .memorySize(memoryClock)
//                    .category(category)
//                    .tdp(tdp)
//                    .otherName(otherName)
//                    .build();
//            gpuDetailsService.save(gpuDetails);
//        }
//        return "success!!";
//
//    }

//    @GetMapping("/game_info")
//    public void getGameInfo() throws IOException {  //게임 리스트와 id, img 크롤링
//
//        int pageCount = 5; // 5 페이지까지만 크롤링하도록 설정
//
//        for (int page = 1; page <= pageCount; page++) {
//            String url = "https://store.steampowered.com/search/?filter=topsellers&page=" + page;
//            Document document = Jsoup.connect(url).get();
//            Elements links = document.select("a[href]");
//
//            for (Element link : links) {
//                String url2 = link.attr("href");
//                if (url2.contains("https://store.steampowered.com/app")) {
//                    int gameId = Integer.parseInt(url2.split("/")[4]);
//                    String gameName = url2.split("/")[5].split("\\?")[0];
//                    String imgUrl = link.select("div.search_capsule img[src]").attr("src");
//                    //System.out.println(gameId + " : " + gameName + " : " + imgUrl);
//
//                    GameList gameList = GameList.builder()
//                            .gameId(gameId)
//                            .gameName(gameName)
//                            .gameImg(imgUrl)
//                            .build();
//                    gameListService.save(gameList);
//                }
//            }
//        }
//    }
//
//    @GetMapping("game_min")
//    public void getMinimumGameRequirement() throws IOException{  // 게임의 최소사양 gpu, cpu, ram 크롤링
//
//        List<GameList> gameLists = gameListService.findAll();
//        for(GameList gamelist : gameLists) {
//            String url = "https://store.steampowered.com/app/" + gamelist.getGameId() + "/" + gamelist.getGameName() + "/";
//            System.out.println("url " + url);
//            Document doc = Jsoup.connect(url).get();
//            if(doc!=null){
//                Element ageGateElement = doc.selectFirst("div.agegate_birthday_desc");
//                if(ageGateElement != null && ageGateElement.text().equals("Please enter your birth date to continue:")) {
//                    gameFindExceptionService.search(gamelist, url);
//                }
//                else{
//                    Element reqElement = doc.select(".sysreq_contents > .game_area_sys_req_full, .sysreq_contents > .game_area_sys_req.active").first();
//
//                    Element cpuElement = reqElement.select("li strong:contains(Processor)").first();
//                    //cpu 예외처리
//                    String cpu = "";
//                    if (cpuElement != null) {
//                        cpu = cpuElement.parent().text().replaceAll("[™®]", "");
//                    }
//
//                    //구분자 split
//                    String[] cpuSplit = null;
//                    if (cpu.contains("|")) {
//                        cpuSplit = cpu.split("\\|");
//                    } else if (cpu.contains("/")) {
//                        cpuSplit = cpu.split("/");
//                    } else if (cpu.contains(",")) {
//                        cpuSplit = cpu.split(",");
//                    } else if (cpu.contains(";")) {
//                        cpuSplit = cpu.split(";");
//                    } else if (cpu.contains("、")) {
//                        cpuSplit = cpu.split("、");
//                    } else if (cpu.contains(" or ")) {
//                        cpuSplit = cpu.split(" or ");
//                    }else {
//                        cpuSplit = new String[]{cpu};
//                    }
//
//                    String cpu1 = "";
//                    String cpu2 = "";
//                    if (cpuSplit != null && cpuSplit.length > 0) {
//
//                        //필요없는 문자열 삭제
//                        String first = cpuSplit[0].trim().replaceAll("(Processor: )|Processor:|\\*With video card: |\\*" +
//                                "Without video card: |\\(TM\\)|\\(R\\)", "");
//                        //System.out.println("first :" + first);
//                        if (first.trim().toLowerCase().startsWith("intel") || first.trim().toLowerCase().startsWith("amd")) {
//                            if (cpuSplit.length == 1 && first.length() >= 30) {
//                                //Intel 과 AMD만 취급 2개만.
//                                int intel_index = first.indexOf("Intel");
//                                int amd_index = first.indexOf("AMD");
//                                if (intel_index >= 0 && amd_index >= 0) {
//                                    if (intel_index < amd_index) {
//                                        cpu1 = first.substring(intel_index, amd_index).trim();
//                                        cpu2 = first.substring(amd_index).trim();
//                                    } else {
//                                        cpu1 = first.substring(amd_index, intel_index).trim();
//                                        cpu2 = first.substring(intel_index).trim();
//                                    }
//                                } else if (intel_index >= 0) {
//                                    String[] cpuSplit2 = first.split("Intel");
//                                    cpu1 = "Intel" + cpuSplit2[1].trim();
//                                    cpu2 = "Intel" + cpuSplit2[2].trim();
//                                } else if (amd_index >= 0) {
//                                    String[] cpuSplit3 = first.split("AMD");
//                                    cpu1 = "AMD" + cpuSplit3[1].trim();
//                                    cpu2 = "AMD" + cpuSplit3[2].trim();
//                                }
//                            }
//                            else if(cpuSplit.length==1){
//                                cpu1 = first.trim();
//                            }
//                            else{
//                                cpu1 = first.trim();
//                            }
//                        }
//                        if (cpuSplit.length > 1) {
//                            String second = cpuSplit[1].trim().replace("Processor: ", "");;
//                            //System.out.println("second :" + second);
//                            if (second.trim().toLowerCase().startsWith("intel") || second.trim().toLowerCase().startsWith("amd")) {
//                                cpu2 = second;
//                            }
//                        }
//
//                        //cpu 마무리.
//                        if(cpu1.length()>5){
//                            cpu1 = cpu1.trim().toLowerCase().replaceAll("(,|\\s+(or\\s+)?(greater|over|Equivalent|better))+$", "");
//                            if(cpu1.equalsIgnoreCase("AMD at 2.8 GHz") || cpu1.equalsIgnoreCase("Intel or AMD") ||
//                                    cpu1.equalsIgnoreCase("AMD equivalent") || cpu1.equalsIgnoreCase("amd cpu with sse2")){
//                                cpu1 = "";
//                            }
//                            else if (cpu1.contains(" or ")) {
//                                String[] cpuArray = cpu1.split(" or ");
//                                cpu1 = cpuArray[0].trim();
//                            }
//                            else if(cpu1.endsWith(")") || cpu1.endsWith("(")){ // 짝이 맞지않는 괄호 삭제
//                                int openCount = 0, closeCount = 0;
//
//                                for (int i = 0; i < cpu1.length(); i++) {
//                                    char ch = cpu1.charAt(i);
//                                    if (ch == '(') {
//                                        openCount++;
//                                    } else if (ch == ')') {
//                                        if (openCount > 0) {
//                                            openCount--;
//                                        } else {
//                                            // 짝이 맞지 않은 닫는 괄호를 발견한 경우 해당 괄호를 삭제합니다.
//                                            cpu1 = cpu1.substring(0, i) + cpu1.substring(i + 1);
//                                            closeCount++;
//                                            i--;
//                                        }
//                                    }
//                                }
//
//                                // 여는 괄호의 개수가 더 많은 경우 짝이 맞지 않은 여는 괄호를 삭제합니다.
//                                if (openCount > closeCount) {
//                                    cpu1 = cpu1.replaceAll("\\(", "");
//                                }
//                            }
//                        }
//                        else{
//                            cpu1 = "";
//                        }
//
//                        if(cpu2.length()>5){
//                            cpu2 = cpu2.trim().toLowerCase().replaceAll("(,|\\s+(or\\s+)?(greater|over|Equivalent|better))+$", "");
//                            if(cpu2.equalsIgnoreCase("AMD at 2.8 GHz") || cpu2.equalsIgnoreCase("Intel or AMD") ||
//                                    cpu2.equalsIgnoreCase("AMD equivalent") || cpu2.equalsIgnoreCase("amd cpu with sse2")){
//                                cpu2 = "";
//                            }
//                            else if (cpu2.contains(" or ")) {
//                                String[] cpuArray = cpu2.split(" or ");
//                                cpu2 = cpuArray[0].trim();
//                            }
//                            else if(cpu2.endsWith(")") || cpu2.endsWith("(")){ // 짝이 맞지않는 괄호 삭제
//                                int openCount = 0, closeCount = 0;
//
//                                for (int i = 0; i < cpu2.length(); i++) {
//                                    char ch = cpu2.charAt(i);
//                                    if (ch == '(') {
//                                        openCount++;
//                                    } else if (ch == ')') {
//                                        if (openCount > 0) {
//                                            openCount--;
//                                        } else {
//                                            // 짝이 맞지 않은 닫는 괄호를 발견한 경우 해당 괄호를 삭제합니다.
//                                            cpu2 = cpu2.substring(0, i) + cpu2.substring(i + 1);
//                                            closeCount++;
//                                            i--;
//                                        }
//                                    }
//                                }
//
//                                // 여는 괄호의 개수가 더 많은 경우 짝이 맞지 않은 여는 괄호를 삭제합니다.
//                                if (openCount > closeCount) {
//                                    cpu2 = cpu2.replaceAll("\\(", "");
//                                }
//                            }
//                        }
//                        else{
//                            cpu2 = "";
//                        }
//
//                    }
//
//                    Element gpuElement = reqElement.select("li strong:contains(Graphics), li strong:contains(Video), li strong:contains(Video Card)").first();
//
//                    //gpu 예외처리
//                    String gpu = "";
//                    if (gpuElement != null) {
//                        gpu = gpuElement.parent().text().replaceAll("[™®]", "");
//                    }
//
//                    //구분자 split
//                    String[] gpuSplit = null;
//                    if (gpu.contains("|")) {
//                        gpuSplit = gpu.split("\\|");
//                    } else if (gpu.contains("/")) {
//                        gpuSplit = gpu.split("/");
//                    } else if (gpu.contains(",")) {
//                        gpuSplit = gpu.split(",");
//                    } else if (gpu.contains(";")) {
//                        gpuSplit = gpu.split(";");
//                    } else if (gpu.contains("、")) {
//                        gpuSplit = gpu.split("、");
//                    } else if (gpu.contains(" or ")) {
//                        gpuSplit = gpu.split(" or ");
//                    }else {
//                        gpuSplit = new String[]{gpu};
//                    }
//
//                    String gpu1 = "";
//                    String gpu2 = "";
//                    if (gpuSplit != null && gpuSplit.length > 0) {
//
//                        //필요없는 문자열 삭제
//                        String first = gpuSplit[0].trim().replaceAll("(Graphics: )|Graphics:|\\*With video card: |\\*" +
//                                "Without video card: |\\(TM\\)|\\(R\\)|Video Card: |Video: ", "");
//                        //System.out.println("first :" + first);
//                        if (first.trim().toLowerCase().contains("intel") || first.trim().toLowerCase().contains("geforce") || first.trim().toLowerCase().contains("radeon")) {
//                            if (gpuSplit.length == 1 && first.length() >= 35) {
//                                int geforce_index = first.indexOf("GeForce");
//                                int radeon_index = first.indexOf("Radeon");
//                                int intel_index = first.indexOf("Intel");
//                                int[] indices = {geforce_index, radeon_index, intel_index};
//                                Arrays.sort(indices);
//
//                                if (geforce_index >= 0 && radeon_index >= 0) {
//                                    if (geforce_index < radeon_index) {
//                                        gpu1 = first.substring(geforce_index, radeon_index).trim();
//                                        gpu2 = first.substring(radeon_index).trim();
//                                    } else {
//                                        gpu1 = first.substring(radeon_index, geforce_index).trim();
//                                        gpu2 = first.substring(geforce_index).trim();
//                                    }
//                                } else if (geforce_index >= 0 && intel_index >= 0) {
//                                    if (geforce_index < intel_index) {
//                                        gpu1 = first.substring(geforce_index, intel_index).trim();
//                                        gpu2 = first.substring(intel_index).trim();
//                                    } else {
//                                        gpu1 = first.substring(intel_index, geforce_index).trim();
//                                        gpu2 = first.substring(geforce_index).trim();
//                                    }
//                                } else if (radeon_index >= 0 && intel_index >= 0) {
//                                    if (radeon_index < intel_index) {
//                                        gpu1 = first.substring(radeon_index, intel_index).trim();
//                                        gpu2 = first.substring(intel_index).trim();
//                                    } else {
//                                        gpu1 = first.substring(intel_index, radeon_index).trim();
//                                        gpu2 = first.substring(radeon_index).trim();
//                                    }
//                                } else if (geforce_index >= 0) {
//                                    String[] gpuSplit1 = first.split("GeForce");
//                                    gpu1 = "GeForce " + gpuSplit1[0].trim();
//                                    gpu2 = "GeForce " + gpuSplit1[1].trim();
//                                } else if (radeon_index >= 0) {
//                                    String[] gpuSplit2 = first.split("Radeon");
//                                    gpu1 = "Radeon " + gpuSplit2[0].trim();
//                                    gpu2 = "Radeon " + gpuSplit2[1].trim();
//                                } else if (intel_index >= 0) {
//                                    String[] gpuSplit3 = first.split("Intel");
//                                    gpu1 = "Intel " + gpuSplit3[0].trim();
//                                    gpu2 = "Intel " + gpuSplit3[1].trim();
//                                }
//
//                            } else if (gpuSplit.length == 1) {
//                                String[] brands = {"geforce", "radeon", "intel"};
//                                int find_index = -1;
//                                for (int i = 0; i < brands.length; i++) {
//                                    if (first.toLowerCase().contains(brands[i])) {
//                                        find_index = first.toLowerCase().indexOf(brands[i]);
//                                        break;
//                                    }
//                                }
//                                gpu1 = find_index >= 0 ? first.substring(find_index) : "";
//                            } else { //legnth가 2이고 길이가 짧을떄
//                                String[] brands = {"geforce", "radeon", "intel"};
//                                int find_index = -1;
//                                for (int i = 0; i < brands.length; i++) {
//                                    if (first.toLowerCase().contains(brands[i])) {
//                                        find_index = first.toLowerCase().indexOf(brands[i]);
//                                        break;
//                                    }
//                                }
//                                gpu1 = find_index >= 0 ? first.substring(find_index) : "";
//                            }
//                        }
//                        if (gpuSplit.length > 1) {
//                            String second = gpuSplit[1].trim();
//                            //System.out.println("second :" + second);
//                            if (gpu1.equals("")) {
//                                if (second.length() >= 35) {
//                                    int geforce_index = second.indexOf("GeForce");
//                                    int radeon_index = second.indexOf("Radeon");
//                                    int intel_index = second.indexOf("Intel");
//                                    int[] indices = {geforce_index, radeon_index, intel_index};
//                                    Arrays.sort(indices);
//
//                                    if (geforce_index >= 0 && radeon_index >= 0) {
//                                        if (geforce_index < radeon_index) {
//                                            gpu1 = second.substring(geforce_index, radeon_index).trim();
//                                            gpu2 = second.substring(radeon_index).trim();
//                                        } else {
//                                            gpu1 = second.substring(radeon_index, geforce_index).trim();
//                                            gpu2 = second.substring(geforce_index).trim();
//                                        }
//                                    } else if (geforce_index >= 0 && intel_index >= 0) {
//                                        if (geforce_index < intel_index) {
//                                            gpu1 = second.substring(geforce_index, intel_index).trim();
//                                            gpu2 = second.substring(intel_index).trim();
//                                        } else {
//                                            gpu1 = second.substring(intel_index, geforce_index).trim();
//                                            gpu2 = second.substring(geforce_index).trim();
//                                        }
//                                    } else if (radeon_index >= 0 && intel_index >= 0) {
//                                        if (radeon_index < intel_index) {
//                                            gpu1 = second.substring(radeon_index, intel_index).trim();
//                                            gpu2 = second.substring(intel_index).trim();
//                                        } else {
//                                            gpu1 = second.substring(intel_index, radeon_index).trim();
//                                            gpu2 = second.substring(radeon_index).trim();
//                                        }
//                                    } else if (geforce_index >= 0) {
//                                        String[] gpuSplit1 = second.split("GeForce");
//                                        gpu1 = "GeForce " + gpuSplit1[0].trim();
//                                        gpu2 = "GeForce " + gpuSplit1[1].trim();
//                                    } else if (radeon_index >= 0) {
//                                        String[] gpuSplit2 = second.split("Radeon");
//                                        gpu1 = "Radeon " + gpuSplit2[0].trim();
//                                        gpu2 = "Radeon " + gpuSplit2[1].trim();
//                                    } else if (intel_index >= 0) {
//                                        String[] gpuSplit3 = second.split("Intel");
//                                        gpu1 = "Intel " + gpuSplit3[0].trim();
//                                        gpu2 = "Intel " + gpuSplit3[1].trim();
//                                    }
//                                }
//                                else{
//                                    String[] brands = {"geforce", "radeon", "intel"};
//                                    int find_index = -1;
//                                    for (int i = 0; i < brands.length; i++) {
//                                        if (second.toLowerCase().contains(brands[i])) {
//                                            find_index = second.toLowerCase().indexOf(brands[i]);
//                                            break;
//                                        }
//                                    }
//                                    gpu2 = find_index >= 0 ? second.toLowerCase().substring(find_index) : "";
//                                }
//                            } else { //legnth가 2이고 길이가 짧을떄
//                                String[] brands = {"geforce", "radeon", "intel"};
//                                int find_index = -1;
//                                for (int i = 0; i < brands.length; i++) {
//                                    if (second.toLowerCase().contains(brands[i])) {
//                                        find_index = second.toLowerCase().indexOf(brands[i]);
//                                        break;
//                                    }
//                                }
//                                gpu2 = find_index >= 0 ? second.toLowerCase().substring(find_index) : "";
//                            }
//                        }
//
//                        //gpu 마무리.
//                        if(gpu1.length()>5){
//                            gpu1 = gpu1.trim().toLowerCase()
//                                    .replaceAll("(,|\\s+(or\\s+)?(greater|over|equivalent|better))+$", "")
//                                    .replaceAll(",\\s*amd\\b|\\bon board gpu\\b", "");
//                            if(gpu1.equalsIgnoreCase("geforce gtx 1050ti (legacy gpu: geforce gtx 960)")){
//                                gpu1 = "geforce gtx 1050ti";
//                            }
//                            else if(gpu1.equalsIgnoreCase("geforce4")){
//                                gpu1 = "";
//                            }
//                            else if (gpu1.contains(" or ")) {
//                                String[] gpuArray = gpu1.split(" or ");
//                                gpu1 = gpuArray[0].trim();
//                            }
//                            else if (gpu1.contains(". ")) {
//                                String[] gpuArray = gpu1.split("\\. ");
//                                gpu1 = gpuArray[0].trim();
//                            }
//                            else if (gpu1.contains("directx")) {
//                                String[] gpuArray = gpu1.split("directx");
//                                gpu1 = gpuArray[0].trim().replace(" -", "");
//                            }
//                            else if(gpu1.endsWith(")") || gpu1.endsWith("(")){ // 짝이 맞지않는 괄호 삭제
//                                int openCount = 0, closeCount = 0;
//
//                                for (int i = 0; i < gpu1.length(); i++) {
//                                    char ch = gpu1.charAt(i);
//                                    if (ch == '(') {
//                                        openCount++;
//                                    } else if (ch == ')') {
//                                        if (openCount > 0) {
//                                            openCount--;
//                                        } else {
//                                            // 짝이 맞지 않은 닫는 괄호를 발견한 경우 해당 괄호를 삭제합니다.
//                                            gpu1 = gpu1.substring(0, i) + gpu1.substring(i + 1);
//                                            closeCount++;
//                                            i--;
//                                        }
//                                    }
//                                }
//
//                                // 여는 괄호의 개수가 더 많은 경우 짝이 맞지 않은 여는 괄호를 삭제합니다.
//                                if (openCount > closeCount) {
//                                    gpu1 = gpu1.replaceAll("\\(", "");
//                                }
//                            }
//                        }
//                        else{
//                            gpu1 = "";
//                        }
//
//                        if(gpu2.length()>5){
//                            gpu2 = gpu2.trim().toLowerCase()
//                                    .replaceAll("(,|\\s+(or\\s+)?(greater|over|equivalent|better))+$", "")
//                                    .replaceAll(",\\s*amd\\b|\\bon board gpu\\b", "");
//                            if(gpu2.equalsIgnoreCase("geforce gtx 1050ti (legacy gpu: geforce gtx 960)")){
//                                gpu2 = "geforce gtx 1050ti";
//                            }
//                            else if(gpu2.equalsIgnoreCase("geforce4")){
//                                gpu2 = "";
//                            }
//                            else if (gpu2.contains(" or ")) {
//                                String[] gpuArray = gpu2.split(" or ");
//                                gpu2 = gpuArray[0].trim();
//                            }
//                            else if (gpu2.contains(". ")) {
//                                String[] gpuArray = gpu2.split("\\. ");
//                                gpu2 = gpuArray[0].trim();
//                            }
//                            else if (gpu2.contains("directx")) {
//                                String[] gpuArray = gpu2.split("directx");
//                                gpu2 = gpuArray[0].trim().replace(" -", "");
//
//                            }
//                            if(gpu2.endsWith(")") || gpu2.endsWith("(")){ // 짝이 맞지않는 괄호 삭제
//                                int openCount = 0, closeCount = 0;
//
//                                for (int i = 0; i < gpu2.length(); i++) {
//                                    char ch = gpu2.charAt(i);
//                                    if (ch == '(') {
//                                        openCount++;
//                                    } else if (ch == ')') {
//                                        if (openCount > 0) {
//                                            openCount--;
//                                        } else {
//                                            // 짝이 맞지 않은 닫는 괄호를 발견한 경우 해당 괄호를 삭제합니다.
//                                            gpu2 = gpu2.substring(0, i) + gpu2.substring(i + 1);
//                                            closeCount++;
//                                            i--;
//                                        }
//                                    }
//                                }
//
//                                // 여는 괄호의 개수가 더 많은 경우 짝이 맞지 않은 여는 괄호를 삭제합니다.
//                                if (openCount > closeCount) {
//                                    gpu2 = gpu2.replaceAll("\\(", "");
//                                }
//                            }
//                        }
//                        else{
//                            gpu2 = "";
//                        }
//
//                    }
//
//
//                    Element ramElement = reqElement.select("li strong:contains(Memory)").first();
//
//                    //Ram 예외처리
//                    String ram = "";
//                    if (ramElement != null) {
//                        String ramText = ramElement.parent().text().toLowerCase();
//                        if (ramText.contains("gb")) {
//                            ram = ramText.replaceAll("[^\\d.]", "");
//                        } else if (ramText.contains("mb")) {
//                            float ramInMB = Float.parseFloat(ramText.replaceAll("[^\\d.]", ""));
//                            ram = String.valueOf(Math.round(ramInMB / 1024));
//                        }
//                    }
//                    int ram1;
//                    if (ram.equals("")) {
//                        ram1 = 0; // 빈 문자열이나 null인 경우 0으로 설정
//                    } else {
//                        if(ram.contains(".")){
//                            String[] ramArray = ram.split("\\.");
//                            ram = ramArray[0];
//                            ram1 = Integer.parseInt(ram); // 정수로 변환
//                        }
//                        else{
//                            ram1 = Integer.parseInt(ram); // 정수로 변환
//                        }
//                    }
//
////                    System.out.println("gpu1:" + gpu1);
////                    System.out.println("gpu2:" + gpu2);
////                    System.out.println("cpu1:" + cpu1);
////                    System.out.println("cpu2:" + cpu2);
////                    System.out.println("ram:" + ram);
//                    GameList gameList = GameList.builder()
//                            .gameId(gamelist.getGameId())
//                            .gameImg(gamelist.getGameImg())
//                            .gameName(gamelist.getGameName())
//                            .minimumGameCpu1(cpu1)
//                            .minimumGameCpu2(cpu2)
//                            .minimumGameGpu1(gpu1)
//                            .minimumGameGpu2(gpu2)
//                            .minimumGameRam(ram1)
//                            .build();
//                    gameListService.save(gameList);
//                }
//            }
//        }
//    }
//
//    @GetMapping("/cpu_list")
//    public String getCpuList() throws IOException {
//        String url = "https://www.cpubenchmark.net/cpu_list.php";
//        Document document = Jsoup.connect(url).get();
//        // 데이터 추출
//        for (int i = 1; i <= 5300; i++) {
//            Element row = document.select("tr#cpu" + i).first();
//            int cpuId = i;
//            if (row != null) {
//                String cpuName = row.select("td a").text();
//                int cpuMark = Integer.parseInt(row.select("td:eq(1)").text().replace(",", ""));
//                int cpuRank = Integer.parseInt(row.select("td:eq(2)").text());
//                String cpuValueStr = row.select("td:eq(3)").text();
//                if (cpuRank <= 1500) {
//                    if (!"NA".equals(cpuValueStr)) {
//                        double cpuValue = Double.parseDouble(cpuValueStr.replace(",", ""));
//                        String priceStr = row.select("td:eq(4)").text();
//                        int cpuPrice = (int) Double.parseDouble(priceStr.replaceAll("[^\\d]", "")) * 12;
//
//                        // CpuList 모델 객체 생성
//                        CpuList cpuList = CpuList.builder()
//                                .cpuId(cpuId)
//                                .cpuName(cpuName)
//                                .cpuMark(cpuMark)
//                                .cpuRank(cpuRank)
//                                .cpuValue(cpuValue)
//                                .cpuPrice(cpuPrice)
//                                .build();
//                        insertCpuList.save(cpuList);
//                    } else {
//                        CpuList cpuList = CpuList.builder()
//                                .cpuId(cpuId)
//                                .cpuName(cpuName)
//                                .cpuMark(cpuMark)
//                                .cpuRank(cpuRank)
//                                .build();
//                        insertCpuList.save(cpuList);
//                    }
//                }
//
//            }
//        }
//        return "success!!";
//
//    }
//
//    @GetMapping("/ram_list")
//    public String getRamList() throws IOException {
//        String url = "https://www.memorybenchmark.net/ram_list-ddr4.php";
//        Document document = Jsoup.connect(url).get();
//        Element tbody = document.select("tbody").first();
//        Elements rows = tbody.select("tr");
//
//        // id 범위 지정
//        int start = 1;
//        int end = 23000;
//        String ramType = "ddr4";
//
//        for (Element row : rows) {
//            Element link = row.select("td:first-child a").first();
//            String href = link.attr("href");
//            int ramId = Integer.parseInt(href.split("&id=")[1]);
//
//            if (ramId >= start && ramId <= end) {
//                String ramName = link.text();
//                int ramLatency = Integer.parseInt(row.select("td:nth-child(2)").text());
//                double ramRead = Double.parseDouble(row.select("td:nth-child(3)").text());
//                double ramWrite = Double.parseDouble(row.select("td:nth-child(4)").text());
//
//                int ramSize = 0;
//                Pattern pattern = Pattern.compile("(\\d+)\\s*(GB)");
//                Matcher matcher = pattern.matcher(ramName);
//                if (matcher.find()) {
//                    ramSize = Integer.parseInt(matcher.group(1));
//
//                    ramName = ramName.replaceAll("\\d+\\s*(GB)", "").trim();
//
//                    //System.out.println(ramId + " || " + ramName + " || " + ramLatency + " || " + ramRead + " || " + ramWrite);
//
//                    if (ramLatency <= 70 && !ramName.equals("OM Nanotech Pvt.Ltd V1D4L2G82G83200") && !ramName.equals("OM Nanotech Pvt.Ltd V1D4S2G82G83200")) {
//                        RamList ramList = RamList.builder()
//                                .ramId(ramId)
//                                .ramName(ramName)
//                                .ramType(ramType)
//                                .ramSize(ramSize)
//                                .ramLatency(ramLatency)
//                                .ramRead(ramRead)
//                                .ramWrite(ramWrite)
//                                .build();
//                        insertRamList.save(ramList);
//                    }
//                }
//            }
//        }
//        return "success!!";
//    }
//
//    @GetMapping("/ram_list2")
//    public String getRamList2() throws IOException {
//        String url = "https://www.memorybenchmark.net/ram_list.php";
//        Document document = Jsoup.connect(url).get();
//        Element tbody = document.select("tbody").first();
//        Elements rows = tbody.select("tr");
//
//        // id 범위 지정
//        int start = 1;
//        int end = 23000;
//        String ramType = "ddr5";
//
//        for (Element row : rows) {
//            Element link = row.select("td:first-child a").first();
//            String href = link.attr("href");
//            int ramId = Integer.parseInt(href.split("&id=")[1]);
//
//            if (ramId >= start && ramId <= end) {
//                String ramName = link.text();
//                int ramLatency = Integer.parseInt(row.select("td:nth-child(2)").text());
//                double ramRead = Double.parseDouble(row.select("td:nth-child(3)").text());
//                double ramWrite = Double.parseDouble(row.select("td:nth-child(4)").text());
//
//                int ramSize = 0;
//                Pattern pattern = Pattern.compile("(\\d+)\\s*(GB)");
//                Matcher matcher = pattern.matcher(ramName);
//                if (matcher.find()) {
//                    ramSize = Integer.parseInt(matcher.group(1));
//
//                    ramName = ramName.replaceAll("\\d+\\s*(GB)", "").trim();
//
//                    //System.out.println(ramId + " || " + ramName + " || " + ramLatency + " || " + ramRead + " || " + ramWrite);
//
//                    if (ramLatency <= 70) {
//                        RamList ramList = RamList.builder()
//                                .ramId(ramId)
//                                .ramName(ramName)
//                                .ramType(ramType)
//                                .ramSize(ramSize)
//                                .ramLatency(ramLatency)
//                                .ramRead(ramRead)
//                                .ramWrite(ramWrite)
//                                .build();
//                        insertRamList.save(ramList);
//                    }
//                }
//            }
//        }
//        return "success!!";
//    }
//
//    @GetMapping("/gpu_list")
//    public String getGpuList() throws IOException {
//        String url = "https://www.videocardbenchmark.net/gpu_list.php";
//        Document document = Jsoup.connect(url).get();
//        // 데이터 추출
//        for (int i = 1; i <= 4785; i++) {
//            Element row = document.select("tr#gpu" + i).first();
//            int gpuId = i;
//            if (row != null) {
//                String gpuName = row.select("td:eq(0)").text();
//                int gpuMark = Integer.parseInt(row.select("td:eq(1)").text().replace(",", ""));
//
//                int gpuRank = Integer.parseInt(row.select("td:eq(2)").text());
//                String gpuValueStr = row.select("td:eq(3)").text();
//                if(gpuRank<=1500){
//                    if (!gpuValueStr.equals("NA")) {
//                        double gpuValue = Double.parseDouble(gpuValueStr.replace(",", ""));
//                        String priceStr = row.select("td:eq(4)").text();
//                        int gpuPrice = (int) Double.parseDouble(priceStr.replaceAll("[^\\d]", "")) * 12;
//
//                        // GpuList 모델 객체 생성
//                        GpuList gpuList = GpuList.builder()
//                                .gpuId(gpuId)
//                                .gpuName(gpuName)
//                                .gpuMark(gpuMark)
//                                .gpuRank(gpuRank)
//                                .gpuValue(gpuValue)
//                                .gpuPrice(gpuPrice)
//                                .build();
//                        insertGpuList.save(gpuList);
//                    } else {
//                        GpuList gpuList = GpuList.builder()
//                                .gpuId(gpuId)
//                                .gpuName(gpuName)
//                                .gpuMark(gpuMark)
//                                .gpuRank(gpuRank)
//                                .build();
//                        insertGpuList.save(gpuList);
//                    }
//                }
//
//            }
//        }
//        return "success!!";
//    }

//    @GetMapping("/gpu_list2")
//    public void updateGpuImageUrls() throws IOException, InterruptedException {
//        List<GpuList> gpuList = insertGpuList.findAll(); // DB에서 저장한 GPU 목록 가져오기
//
//        ChromeOptions options = new ChromeOptions();
//        options.addArguments("--headless", "--disable-gpu", "--no-sandbox", "--disable-dev-shm-usage");
//        options.setCapability("acceptInsecureCerts", true);
//        options.setCapability(CapabilityType.ACCEPT_SSL_CERTS, true);
//        // 웹 드라이버 실행
//        ChromeDriverService driverService = new ChromeDriverService.Builder()
//                .usingDriverExecutable(new File("src/main/resources/chromedriver.exe"))
//                .withWhitelistedIps("0.0.0.0/0") // 모든 IP 주소를 허용합니다.
//                .build();
//        WebDriver driver = new ChromeDriver(driverService);
//
//        try {
//            // GPU UserBenchmark 사이트 접속
//            driver.get("https://gpu.userbenchmark.com/");
//            // 검색 결과가 로딩될 때까지 대기
////        WebDriverWait wait = new WebDriverWait(driver, 10);
////        wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector(".search-results")));
//
//            // 검색 결과에서 이미지 태그 추출
//            List<WebElement> images = driver.findElements(By.cssSelector(".search-results img"));
//
//            // 추출한 이미지 태그를 순회하며 이미지 URL 저장
//            for (WebElement image : images) {
//                String imageUrl = image.getAttribute("src");
//                String imageName = imageUrl.substring(imageUrl.lastIndexOf("/") + 1, imageUrl.lastIndexOf("."));
//                System.out.println(imageName);
//                for(GpuList gpu : gpuList) {
//                    if(gpu.getGpuName().contains(imageName)){
//                        gpu.setGpuUrl(imageUrl);
//                        insertGpuList.save(gpu);
//                    }
//                }
//            }
//        } finally {
//            // 웹 드라이버 종료
//            driver.quit();
//        }
//    }




//    @GetMapping("/gpu_list2")
//    public void updateGpuImageUrls() throws IOException {
//        List<GpuList> gpuList = insertGpuList.findAll(); // DB에서 저장한 GPU 목록 가져오기
//
//        String url = "https://gpu.userbenchmark.com/";
//        Document doc = Jsoup.connect(url).get();
//
//        Elements images = doc.select("img[src]");
//
//        for (Element image : images) {
//            String imageUrl = image.attr("src");
//            String imageName = imageUrl.substring(imageUrl.lastIndexOf("/") + 1, imageUrl.lastIndexOf("."));
//            System.out.println(imageName);
//            for(GpuList gpu : gpuList) {
//                if(gpu.getGpuName().contains(imageName)){
//                    gpu.setGpuUrl(imageUrl);
//                    insertGpuList.save(gpu);
//                }
//            }
//        }
//
//    }

//    @GetMapping("/gpu_list2")
//    public void updateGpuImageUrls() throws IOException {
//        List<GpuList> gpuList = insertGpuList.findAll(); // DB에서 저장한 GPU 목록 가져오기
//
//        for (GpuList gpu : gpuList) {
//            String query = gpu.getGpuName(); // 검색할 쿼리
//            String imageUrl = getImageUrlFromGoogle(query); // 구글에서 이미지 URL 가져오기
//            gpu.setGpuUrl(imageUrl); // GPU 객체에 이미지 URL 저장
//            insertGpuList.save(gpu); // DB에 저장
//        }
//    }
//
//    private String getImageUrlFromGoogle(String query) throws IOException {
//        String url = "https://www.google.com/search?q=" + query + "&tbm=isch";
//        Document document = Jsoup.connect(url).get();
//        Elements images = document.select("img[src~=(?i)\\.(png|jpe?g|gif)]");
//        if (images.size() > 0) {
//            Element image = images.get(0);
//            String imageUrl = image.absUrl("src");
//            return imageUrl;
//        } else {
//            return null;
//        }
//    }

}


