package com.hadoop.demo.Controller;
import com.hadoop.demo.Model.GameList;
import com.hadoop.demo.Service.GameListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class GameController {

    @Autowired
    private GameListService gameListService;

    @RequestMapping("/compare")
    public List<GameList> GameCpuCompare(){
        return gameListService.CompareCpuUserVsGame();
    }

}
