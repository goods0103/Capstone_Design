package com.hadoop.demo.Controller;
import com.hadoop.demo.Model.GameList;
import com.hadoop.demo.Service.GameListService;
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

    @RequestMapping("/compare")
    public List<GameList> gameCpuCompare(HttpServletRequest request){
        return gameListService.CompareCpuUserVsGame(request.getRemoteAddr());
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
