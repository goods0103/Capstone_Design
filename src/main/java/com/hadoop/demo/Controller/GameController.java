package com.hadoop.demo.Controller;

import com.hadoop.demo.Service.GameListService;
import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
public class GameController {

    @Autowired
    private GameListService gameListService;

//    @Getter
//    @Setter
//    @AllArgsConstructor
//    @NoArgsConstructor
//    @ToString
//    public static class GameSpec {
//        private String gameName;
//        private int minState;
//        private int recState;
//    }

    @GetMapping("/compare")
    public java.util.List<GameListService.gameUserCompare> GameCpuCompare(){
        gameListService.CompareCpuUserVsGame().stream().forEach(System.out::println);

        return gameListService.CompareCpuUserVsGame();
    }

    @GetMapping("/compare2")
    public java.util.List<GameListService.gameUserCompare> GameCpuCompare2(){
        gameListService.CompareCpuUserVsGame2().stream().forEach(System.out::println);

        return gameListService.CompareCpuUserVsGame2();

    }

//    @GetMapping("/compare3")
//    public List<GameSpec> GameCpuCompare3(){
//        List<GameSpec> gameSpecs = new ArrayList<>();
//
//        for(int i=0; i<gameListService.CompareCpuUserVsGame2().size();i++){
//            gameSpecs.add(new GameSpec(gameListService.CompareCpuUserVsGame2().get(i).getGameName(),
//                    gameListService.CompareCpuUserVsGame().get(i).getState(), gameListService.CompareCpuUserVsGame2().get(i).getState()));
//        }
//
//        return gameSpecs;
//    }
}
