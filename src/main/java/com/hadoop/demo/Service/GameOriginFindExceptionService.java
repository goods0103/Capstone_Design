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
        String cpu = cpuElement.parent().text();

        Element gpuElement = reqElement.select("li strong:contains(Graphics), li strong:contains(Video), li strong:contains(Video Card)").first();

        //gpu 예외처리
        String gpu = gpuElement.parent().text();


        Element ramElement = reqElement.select("li strong:contains(Memory)").first();

        //Ram 예외처리
        String ram = ramElement.parent().text();

        GameListOrigin gameList2 = GameListOrigin.builder()
                .gameId(gameListOrigin.getGameId())
                .gameName(gameListOrigin.getGameName())
                .minimumGameCpu(cpu)
                .minimumGameGpu(gpu)
                .minimumGameRam(ram)
                .build();
        gameListOriginService.save(gameList2);
    }
}

