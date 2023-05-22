package com.hadoop.demo.Controller;
import com.hadoop.demo.Model.GameList;
import com.hadoop.demo.Service.GameListService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
public class GameController {

    @Autowired
    private GameListService gameListService;

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    static class gameRequest{
        private String lastPart;
    }

//    @RequestMapping("/compare")
//    public List<GameList> GameCpuCompare(HttpServletRequest request){
//        return gameListService.CompareCpuUserVsGame(request.getRemoteAddr());
//    }

    @RequestMapping("/compare")
    public GameList GameCpuCompare(@RequestBody gameRequest gameName,  HttpServletRequest request){
        return gameListService.CompareCpuUserVsGame3(gameName.getLastPart() , request.getRemoteAddr());
    }

    @GetMapping("/gameTopList")
    public List<GameList> gameTopList() {
        List<GameList> gameLists = gameListService.orderByGameId2();
        List<GameList> gameLists1 = new ArrayList<>();
        for(int i=0; i < 10; i++)
            gameLists1.add(gameLists.get(i));
        return gameLists1;
    }

    @GetMapping("/gameCountList")
    public List<GameList> gameCountList() {
        List<GameList> gameLists = gameListService.orderByTestCount();
        List<GameList> gameLists1 = new ArrayList<>();
        for(int i=0; i < 10; i++)
            gameLists1.add(gameLists.get(i));
        return gameLists1;
    }
}
