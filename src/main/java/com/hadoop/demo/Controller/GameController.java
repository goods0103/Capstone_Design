package com.hadoop.demo.Controller;

import com.hadoop.demo.Service.GameListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class GameController {

    @Autowired
    private GameListService gameListService;

    @GetMapping("/compare")
    public java.util.List<GameListService.gameUserCompare> GameCpuCompare(){
        gameListService.CompareCpuUserVsGame().stream().forEach(System.out::println);

        return gameListService.CompareCpuUserVsGame();
    }
}
