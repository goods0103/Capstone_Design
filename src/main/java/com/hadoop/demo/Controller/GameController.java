package com.hadoop.demo.Controller;
import com.hadoop.demo.Service.GameListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
//        private List<GameList> gameList;
//        private int minState;
//        private int recState;
//    }

//    @GetMapping("/compare")
//    public java.util.List<GameListService.gameUserCompare> GameCpuCompare(){
//        return gameListService.CompareCpuUserVsGame2();
//    }

    @RequestMapping("/compare/{pageNumber}")
    public java.util.List<GameListService.gameUserCompare> GameCpuCompare(@PathVariable int pageNumber){
        return gameListService.CompareCpuUserVsGame2(pageNumber);
    }

}
