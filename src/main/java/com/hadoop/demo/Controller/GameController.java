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
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

@RestController
@CrossOrigin
public class GameController {

    @Autowired
    private GameListService gameListService;

//    @AllArgsConstructor
//    @NoArgsConstructor
//    @Getter
//    @Setter
//    static class gameRequest{
//        private String gameName;
//    }

    @RequestMapping("/compare")
    public List<GameList> GameCpuCompare(HttpServletRequest request){
        return gameListService.CompareCpuUserVsGame(request.getRemoteAddr());
    }

//    @RequestMapping("/compare2")
//    public List<GameList> GameCpuCompare(@RequestBody gameRequest gameName,  HttpServletRequest request){
//        return gameListService.CompareCpuUserVsGame3(request.getRemoteAddr());
//    }
}
