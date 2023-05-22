package com.hadoop.demo.Service;

import com.hadoop.demo.Model.GameList;
import com.hadoop.demo.Model.GameListOrigin;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Arrays;

@Service
public class GameOriginFindExceptionService {

    @Autowired
    GameListOriginService gameListOriginService;

    public void search(GameListOrigin gameListOrigin, String url) {
        System.setProperty("webdriver.chrome.driver", "src/main/resources/chromedriver.exe");

        ChromeOptions options = new ChromeOptions();
        options.addArguments("--remote-allow-origins=*");
        WebDriver driver = new ChromeDriver(options);

        // Google 검색 페이지 접속
        driver.get(url);

        WebElement year = driver.findElement(By.id("ageYear"));
        year.sendKeys("1995");

        // View Page 버튼 클릭
        WebElement viewPageButton = driver.findElement(By.id("view_product_page_btn"));
        viewPageButton.click();

        // 웹 요소 로드 대기 (10초)
        Duration duration = Duration.ofSeconds(5);
        WebDriverWait wait = new WebDriverWait(driver, duration);

        // 새로고침
        driver.navigate().refresh();

        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//h2[contains(text(),'System Requirements')]")));

        String pageSource = driver.getPageSource();
        driver.quit();

        Document pageDoc = Jsoup.parse(pageSource);
        Element reqElement = pageDoc.select(".sysreq_contents > .game_area_sys_req_full, .sysreq_contents > .game_area_sys_req.active").first();

        Element cpuElement = reqElement.select("li strong:contains(Processor)").first();

        //cpu 예외처리
        String cpu = "";
        if (cpuElement != null) {
            cpu = cpuElement.parent().text();
        }

        Element cpuElement2 = reqElement.select("li strong:contains(Processor)").last();
        //cpu 예외처리
        String cpu2 = "";
        if (cpuElement2 != null) {
            cpu2 = cpuElement2.parent().text();
        }

        Element gpuElement = reqElement.select("li strong:contains(Graphics), li strong:contains(Video), li strong:contains(Video Card)").first();
        //gpu 예외처리
        String gpu = "";
        if (gpuElement != null) {
            gpu = gpuElement.parent().text();
        }

        Element gpuElement2 = reqElement.select("li strong:contains(Graphics), li strong:contains(Video), li strong:contains(Video Card)").last();
        //gpu 예외처리
        String gpu2 = "";
        if (gpuElement2 != null) {
            gpu2 = gpuElement2.parent().text();
        }

        Element ramElement = reqElement.select("li strong:contains(Memory)").first();
        //Ram 예외처리
        String ram = "";
        if (ramElement != null) {
            ram = ramElement.parent().text();
        }

        Element ramElement2 = reqElement.select("li strong:contains(Memory)").last();
        //Ram 예외처리
        String ram2 = "";
        if (ramElement2 != null) {
            ram2 = ramElement2.parent().text();
        }

        GameListOrigin gameList2 = GameListOrigin.builder()
                .gameOriginId(gameListOrigin.getGameOriginId())
                .gameId(gameListOrigin.getGameId())
                .gameName(gameListOrigin.getGameName())
                .minimumGameCpu(cpu)
                .minimumGameGpu(gpu)
                .minimumGameRam(ram)
                .recommendedGameCpu(cpu2)
                .recommendedGameGpu(gpu2)
                .recommendedGameRam(ram2)
                .build();
        gameListOriginService.save(gameList2);
    }

    public void search2(GameListOrigin gameListOrigin, String url) {
        System.setProperty("webdriver.chrome.driver", "src/main/resources/chromedriver.exe");

        ChromeOptions options = new ChromeOptions();
        options.addArguments("--remote-allow-origins=*");
        WebDriver driver = new ChromeDriver(options);

        // Google 검색 페이지 접속
        driver.get(url);

        WebElement year = driver.findElement(By.id("ageYear"));
        year.sendKeys("1995");

        // View Page 버튼 클릭
        WebElement viewPageButton = driver.findElement(By.id("view_product_page_btn"));
        viewPageButton.click();

        // 웹 요소 로드 대기 (10초)
        Duration duration = Duration.ofSeconds(5);
        WebDriverWait wait = new WebDriverWait(driver, duration);

        // 새로고침
        driver.navigate().refresh();

        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//h2[contains(text(),'System Requirements')]")));

        String pageSource = driver.getPageSource();
        driver.quit();

        Document pageDoc = Jsoup.parse(pageSource);
        Element reqElement = pageDoc.select("#game_highlights > div.rightcol").first();

        String imgUrl = reqElement.select("#gameHeaderImageCtn > img[src]").attr("src");

        Element dateElement = reqElement.select("div > div.glance_ctn_responsive_left > div.release_date > div.date").first();
        String releaseDate = dateElement.text();

        Element developerElement = reqElement.select("#developers_list").first();
        String developer = developerElement.text();

        Element publisherElement = reqElement.select("div > div.glance_ctn_responsive_left > div:nth-child(4) > div.summary.column").first();
        String publisher = publisherElement.text();


        GameListOrigin gameList2 = GameListOrigin.builder()
                .gameOriginId(gameListOrigin.getGameOriginId())
                .gameId(gameListOrigin.getGameId())
                .gameName(gameListOrigin.getGameName())
                .minimumGameCpu(gameListOrigin.getMinimumGameCpu())
                .minimumGameGpu(gameListOrigin.getMinimumGameGpu())
                .minimumGameRam(gameListOrigin.getMinimumGameRam())
                .recommendedGameCpu(gameListOrigin.getRecommendedGameCpu())
                .recommendedGameGpu(gameListOrigin.getRecommendedGameGpu())
                .recommendedGameRam(gameListOrigin.getRecommendedGameRam())
                .developer(developer)
                .publisher(publisher)
                .releaseDate(releaseDate)
                .img(imgUrl)
                .build();
        gameListOriginService.save(gameList2);
    }
}

