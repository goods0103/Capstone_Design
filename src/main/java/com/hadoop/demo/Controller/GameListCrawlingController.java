package com.hadoop.demo.Controller;

import com.hadoop.demo.Model.GameList;
import com.hadoop.demo.Model.GameListOrigin;
import com.hadoop.demo.Service.GameListOriginService;
import com.hadoop.demo.Service.GameListService;
import com.hadoop.demo.Service.GameOriginFindExceptionService;
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
public class GameListCrawlingController {

    @Autowired
    private GameListService gameListService;
    @Autowired
    private GameListOriginService gameListOriginService;
    @Autowired
    private GameOriginFindExceptionService gameOriginFindExceptionService;

//    @GetMapping("/gameOrigin")
//    public void setGameOrigin() throws IOException { // game origin 제작사, 배급사, 출시일, 이미지 가져오기
//
//        List<GameListOrigin> gameLists = gameListOriginService.findAll();
//
//        for (GameListOrigin gameList : gameLists) {
//            if (gameList.getGameOriginId() >= 445) {
//                String url = "https://store.steampowered.com/app/" + gameList.getGameId() + "/" + gameList.getGameName() + "/";
//                System.out.println("url " + url);
//                Document doc = Jsoup.connect(url).get();
//                if (doc != null) {
//                    Element ageGateElement = doc.selectFirst("div.agegate_birthday_desc");
//                    if (ageGateElement != null && ageGateElement.text().equals("Please enter your birth date to continue:")) {
//                        gameOriginFindExceptionService.search2(gameList, url);
//                    } else {
//                        Element reqElement = doc.select("#game_highlights > div.rightcol").first();
//
//                        String imgUrl = reqElement.select("#gameHeaderImageCtn > img[src]").attr("src");
//
//                        Element dateElement = reqElement.select("div > div.glance_ctn_responsive_left > div.release_date > div.date").first();
//                        String releaseDate = dateElement.text();
//
//                        Element developerElement = reqElement.select("#developers_list").first();
//                        String developer = developerElement.text();
//
//                        Element publisherElement = reqElement.select("div > div.glance_ctn_responsive_left > div:nth-child(4) > div.summary.column").first();
//                        String publisher = publisherElement.text();
//
//
//                        GameListOrigin gameList2 = GameListOrigin.builder()
//                                .gameOriginId(gameList.getGameOriginId())
//                                .gameId(gameList.getGameId())
//                                .gameName(gameList.getGameName())
//                                .minimumGameCpu(gameList.getMinimumGameCpu())
//                                .minimumGameGpu(gameList.getMinimumGameGpu())
//                                .minimumGameRam(gameList.getMinimumGameRam())
//                                .recommendedGameCpu(gameList.getRecommendedGameCpu())
//                                .recommendedGameGpu(gameList.getRecommendedGameGpu())
//                                .recommendedGameRam(gameList.getRecommendedGameRam())
//                                .developer(developer)
//                                .publisher(publisher)
//                                .releaseDate(releaseDate)
//                                .img(imgUrl)
//                                .build();
//                        gameListOriginService.save(gameList2);
//                    }
//
//                }
//            }
//        }
//    }

//    @GetMapping("/game_info2")
//    public void getGameInfo2() throws IOException {  //게임 리스트와 id, img 크롤링
//
//        int pageCount = 20; // 5 페이지까지만 크롤링하도록 설정
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
//                    //String imgUrl = link.select("div.search_capsule img[src]").attr("src");
//                    //System.out.println(gameId + " : " + gameName + " : " + imgUrl);
//
//                    GameListOrigin gameList = GameListOrigin.builder()
//                            .gameId(gameId)
//                            .gameName(gameName)
//                            .build();
//                    gameListOriginService.save(gameList);
//                }
//            }
//        }
//    }
//
//    @GetMapping("/game_insert")
//    public void setGameListOrigin() throws IOException {
//        List<GameList> gameLists = gameListService.findAll();
//
//        for(GameList gameList : gameLists) {
//            GameListOrigin gameListOrigin = GameListOrigin.builder()
//                    .gameId(gameList.getGameId())
//                    .gameName(gameList.getGameName())
//                    .build();
//            gameListOriginService.save(gameListOrigin);
//        }
//
//    }
//    @GetMapping("game_list")
//    public void getMinimumGameRequirement() throws IOException {  // 게임의 전체 사양 gpu, cpu, ram 크롤링
//
//        List<GameListOrigin> gameLists = gameListOriginService.findAll();
//        for(GameListOrigin gameList : gameLists) {
//            if (gameList.getGameOriginId() >= 0) {
//                String url = "https://store.steampowered.com/app/" + gameList.getGameId() + "/" + gameList.getGameName() + "/";
//                System.out.println("url " + url);
//                Document doc = Jsoup.connect(url).get();
//                if (doc != null) {
//                    Element ageGateElement = doc.selectFirst("div.agegate_birthday_desc");
//                    if (ageGateElement != null && ageGateElement.text().equals("Please enter your birth date to continue:")) {
//                        gameOriginFindExceptionService.search(gameList, url);
//                    } else {
//                        Element reqElement = doc.select(".sysreq_contents > .game_area_sys_req_full, .sysreq_contents > .game_area_sys_req.active").first();
//
//                        Element cpuElement = reqElement.select("li strong:contains(Processor)").first();
//                        //cpu 예외처리
//                        String cpu = "";
//                        if (cpuElement != null) {
//                            cpu = cpuElement.parent().text();
//                        }
//
//                        Element cpuElement2 = reqElement.select("li strong:contains(Processor)").last();
//                        //cpu 예외처리
//                        String cpu2 = "";
//                        if (cpuElement2 != null) {
//                            cpu2 = cpuElement2.parent().text();
//                        }
//
//                        Element gpuElement = reqElement.select("li strong:contains(Graphics), li strong:contains(Video), li strong:contains(Video Card)").first();
//                        //gpu 예외처리
//                        String gpu = "";
//                        if (gpuElement != null) {
//                            gpu = gpuElement.parent().text();
//                        }
//
//                        Element gpuElement2 = reqElement.select("li strong:contains(Graphics), li strong:contains(Video), li strong:contains(Video Card)").last();
//                        //gpu 예외처리
//                        String gpu2 = "";
//                        if (gpuElement2 != null) {
//                            gpu2 = gpuElement2.parent().text();
//                        }
//
//                        Element ramElement = reqElement.select("li strong:contains(Memory)").first();
//                        //Ram 예외처리
//                        String ram = "";
//                        if (ramElement != null) {
//                            ram = ramElement.parent().text();
//                        }
//
//                        Element ramElement2 = reqElement.select("li strong:contains(Memory)").last();
//                        //Ram 예외처리
//                        String ram2 = "";
//                        if (ramElement2 != null) {
//                            ram2 = ramElement2.parent().text();
//                        }
//
//                        GameListOrigin gameList2 = GameListOrigin.builder()
//                                .gameOriginId(gameList.getGameOriginId())
//                                .gameId(gameList.getGameId())
//                                .gameName(gameList.getGameName())
//                                .minimumGameCpu(cpu)
//                                .minimumGameGpu(gpu)
//                                .minimumGameRam(ram)
//                                .recommendedGameCpu(cpu2)
//                                .recommendedGameGpu(gpu2)
//                                .recommendedGameRam(ram2)
//                                .build();
//                        gameListOriginService.save(gameList2);
//                    }
//                }
//            }
//        }
//    }
}