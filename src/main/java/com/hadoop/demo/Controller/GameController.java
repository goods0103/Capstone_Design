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
}
