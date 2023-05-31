package com.hadoop.demo.Service;

import com.hadoop.demo.Model.CpuList;
import com.hadoop.demo.Model.GameList;
import com.hadoop.demo.Model.GpuList;
import com.hadoop.demo.Model.UserInsertInfo;
import com.hadoop.demo.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

@Service
public class GameListService {

    @Autowired
    private GameListRepository gameListRepository;
    @Autowired
    private CpuListRepository cpuListRepository;
    @Autowired
    private GpuListRepository gpuListRepository;
    @Autowired
    private RamListRepository ramListRepository;
    @Autowired
    private UserInsertInfoRepository userInsertInfoRepository;
    @Autowired
    private  UserInfoService userInfoService;

    public GameList save(GameList gameList) {
        return gameListRepository.save(gameList);
    }

    public List<GameList> findAll() { return gameListRepository.findAll();}

    public GameList findByName(String name) {
        return gameListRepository.findByGameName(name);
    }

    public List<GameList> orderByGameId2() { return gameListRepository.findByOrderByGameId2(); }

    public List<GameList> orderByTestCount() { return gameListRepository.findByOrderByTestCountDesc(); }

    //gamelist의 cpu를 하나선택후 cpulist에서 유시한것 찾기
    public int CompareCpuUserVsGame2(String gameName, String ipAddress){

        String minCpu = null;
        String minGpu = null;
        int minRamSize = 0;
        int minState = 0;

        UserInsertInfo userInsertInfo = userInsertInfoRepository.findByIpAddress(ipAddress);

        //userinfo 에 있는 cpu rank ramSize 반환

        int userCpuRank = cpuListRepository.findByCpuName(userInsertInfo.getSelectedCpu()).getCpuRank();
        int userGpuRank = gpuListRepository.findByGpuName(userInsertInfo.getSelectedGpu()).getGpuRank();
        int userRamSize = ramListRepository.findByRamName(userInsertInfo.getSelectedRam()).getRamSize()*2;

        GameList gameList = gameListRepository.findByGameName(gameName);
        if(!gameList.getMinimumGameCpu().equals("")){
            minCpu = gameList.getMinimumGameCpu();
        }
        if(!gameList.getMinimumGameGpu().equals("")){
            minGpu = gameList.getMinimumGameGpu();
        }

        //userinfo 에 있는 cpu rank ramSize 반환
        int minCpuRank = 0;
        int minGpuRank = 0;

        //최소 cpu, gpu가 모두없을 경우
        if (minCpu == null && minGpu == null) {
            return 1;
        }
        //최소 cpu만 있을 경우
        else if (minCpu != null && minGpu == null) {
            minCpuRank = cpuListRepository.findByCpuName(minCpu).getCpuRank();
            minRamSize = gameList.getMinimumGameRam();
            if (userRamSize >= minRamSize && userCpuRank <= minCpuRank)  // cpu ram 모두 넘을 때
                minState = 1;
            else if (userRamSize >= minRamSize)  // ram 넘는데 cpu 못넘을 때
                minState = 3;
            else if (userCpuRank <= minCpuRank)  // cpu 넘는데 ram 못넘을 때
                minState = 5;
            else    // cpu ram 모두 못넘을 때
                minState = 7;
        }
        // 권장 gpu만 있을 경우
        else if (minCpu == null) {
            minGpuRank = gpuListRepository.findByGpuName(minGpu).getGpuRank();
            minRamSize = gameList.getMinimumGameRam();
            if (userRamSize >= minRamSize && userGpuRank <= minGpuRank)  // gpu ram 모두 넘을 때
                minState = 1;
            else if (userRamSize >= minRamSize)  // ram 넘는데 gpu 못넘을 때
                minState = 4;
             else if (userCpuRank <= minCpuRank)  // gpu 넘는데 ram 못넘을 때
                minState = 5;
             else   // gpu ram 모두 못넘을 때
                minState = 8;
        }
        // 권장 cpu, gpu가 모두 있을경우
        else {
            minCpuRank = cpuListRepository.findByCpuName(minCpu).getCpuRank();
            minGpuRank = gpuListRepository.findByGpuName(minGpu).getGpuRank();
            minRamSize = gameList.getMinimumGameRam();
            if (userRamSize >= minRamSize && userGpuRank <= minGpuRank && userCpuRank <= minCpuRank)
                minState = 1;
            else if (userRamSize >= minRamSize && userGpuRank <= minGpuRank)  // ram,gpu 넘는데 cpu 못넘을 때
                minState = 3;
            else if (userRamSize >= minRamSize && userCpuRank <= minCpuRank)  // ram,cpu 넘는데 gpu 못넘을 때
                minState = 4;
            else if (userGpuRank <= minRamSize && userCpuRank <= minCpuRank)  // cpu,gpu 넘는데 ram 못넘을 때
                minState = 5;
            else if (userRamSize >= minRamSize)  // ram 넘는데 cpu,gpu 못넘을 때
                minState = 6;
            else if (userGpuRank <= minGpuRank)  // gpu 넘는데 cpu,ram 못넘을 때
                minState = 7;
            else if (userCpuRank <= minCpuRank)  // cpu는 넘는데 gpu,ram은 못넘을 때
                minState = 8;
        }
        return minState;

    }
    //선택시에 ipAddress와 이름을 받는다
    public GameList CompareCpuUserVsGame3(String gameName, String ipAddress) {

        String decodedGameName = URLDecoder.decode(gameName, StandardCharsets.UTF_8).replace("=","");

        // userInfo가 없을 경우
        if(userInsertInfoRepository.findByIpAddress(ipAddress) == null){
            return gameListRepository.findByGameName(decodedGameName);
        }

        String recCpu = null;
        String recGpu = null;
        int recCpuRank = 0;
        int recGpuRank = 0;
        int recRamSize = 0;

        GameList gameList = gameListRepository.findByGameName(decodedGameName);

        UserInsertInfo userInsertInfo = userInsertInfoRepository.findByIpAddress(ipAddress);

        //userinfo 에 있는 cpu rank ramSize 반환
        int userCpuRank = cpuListRepository.findByCpuName(userInsertInfo.getSelectedCpu()).getCpuRank();
        int userGpuRank = gpuListRepository.findByGpuName(userInsertInfo.getSelectedGpu()).getGpuRank();
        int userRamSize = ramListRepository.findByRamName(userInsertInfo.getSelectedRam()).getRamSize()*2;

        if(!gameList.getRecommendedGameCpu().equals("")){
            recCpu = gameList.getRecommendedGameCpu();
            recCpuRank = cpuListRepository.findByCpuName(gameList.getRecommendedGameCpu()).getCpuRank();
        }
        else{
            recCpu=null;
        }
        if(!gameList.getRecommendedGameGpu().equals("")){
            recGpu = gameList.getRecommendedGameGpu();
            recGpuRank = gpuListRepository.findByGpuName(gameList.getRecommendedGameGpu()).getGpuRank();
        }
        else{
            recGpu=null;
        }
        recRamSize = gameList.getRecommendedGameRam();

        //권장 cpu, gpu가 모두없을 경우
        if (recCpu == null && recGpu == null) {
            gameList.setRecState(1);
            gameList.setMinState(1);
        }
        // 권장 cpu만 있을 경우
        else if (recCpu != null && recGpu == null) {
            if (userRamSize >= recRamSize && userCpuRank <= recCpuRank) { // cpu ram 모두 가능
                gameList.setRecState(1);
                gameList.setMinState(1);
            }
            else if (userRamSize >= recRamSize) { // ram 넘는데 cpu 못넘을 때
                gameList.setRecState(3);
                gameList.setMinState(CompareCpuUserVsGame2(gameList.getGameName(), ipAddress));
            } else if (userCpuRank <= recCpuRank) { // cpu 넘는데 ram 못넘을 때
                gameList.setRecState(5);
                gameList.setMinState(CompareCpuUserVsGame2(gameList.getGameName(), ipAddress));
            } else {    // cpu ram 모두 못넘을 때
                gameList.setRecState(7);
                gameList.setMinState(CompareCpuUserVsGame2(gameList.getGameName(), ipAddress));
            }
        }
        // 권장 gpu만 있을 경우
        else if (recCpu == null) {
            if (userRamSize >= recRamSize && userGpuRank <= recGpuRank) { // gpu와 ram 모두 가능
                gameList.setRecState(1);
                gameList.setMinState(1);
            }
            else if (userRamSize >= recRamSize) { // ram은 넘는데 gpu는 못넘을 때
                gameList.setRecState(4);
                gameList.setMinState(CompareCpuUserVsGame2(gameList.getGameName(), ipAddress));
            } else if (userCpuRank <= recCpuRank) { // gpu는 넘는데 ram은 못넘을 때
                gameList.setRecState(5);
                gameList.setMinState(CompareCpuUserVsGame2(gameList.getGameName(), ipAddress));
            } else {    // gpu ram 모두 못넘을 때
                gameList.setRecState(8);
                gameList.setMinState(CompareCpuUserVsGame2(gameList.getGameName(), ipAddress));
            }
        }
        // 권장 cpu, gpu가 모두 있을경우
        else {
            if (userRamSize >= recRamSize && userGpuRank <= recGpuRank && userCpuRank <= recCpuRank) { // cpu gpu ram 모두 넘을 때
                gameList.setRecState(1);
                gameList.setMinState(1);
            }
            else if (userRamSize >= recRamSize && userGpuRank <= recGpuRank) { // ram,gpu 넘는데 cpu 못넘을 때
                gameList.setRecState(3);
                gameList.setMinState(CompareCpuUserVsGame2(gameList.getGameName(), ipAddress));
            }
            else if (userRamSize >= recRamSize && userCpuRank <= recCpuRank) { // ram,cpu 넘는데 gpu 못넘을 때
                gameList.setRecState(4);
                gameList.setMinState(CompareCpuUserVsGame2(gameList.getGameName(), ipAddress));
            }
            else if (userGpuRank <= recGpuRank && userCpuRank <= recCpuRank) { // cpu,gpu 넘는데 ram 못넘을 때
                gameList.setRecState(5);
                gameList.setMinState(CompareCpuUserVsGame2(gameList.getGameName(), ipAddress));
            }
            else if (userRamSize >= recRamSize) { // ram 넘는데 cpu,gpu 못넘을 때
                gameList.setRecState(6);
                gameList.setMinState(CompareCpuUserVsGame2(gameList.getGameName(), ipAddress));
            }
            else if (userGpuRank <= recGpuRank) { // gpu 넘는데 cpu,ram 못넘을 때
                gameList.setRecState(7);
                gameList.setMinState(CompareCpuUserVsGame2(gameList.getGameName(), ipAddress));
            } else if (userCpuRank <= recCpuRank) { // cpu는 넘는데 gpu,ram은 못넘을 때
                gameList.setRecState(8);
                gameList.setMinState(CompareCpuUserVsGame2(gameList.getGameName(), ipAddress));
            } else {    // 모두 못넘을 때
                gameList.setRecState(0);
                gameList.setMinState(CompareCpuUserVsGame2(gameList.getGameName(), ipAddress));
            }
        }

        return gameList;
    }


    //gamelist의 cpu를 하나선택후 cpulist에서 유시한것 찾기
//    public List<GameList> CompareCpuUserVsGame(String ipAddress) {
//
//        // userInfo가 없을 경우
//        if(userInsertInfoRepository.findByIpAddress(ipAddress) == null){
//            return gameListRepository.findAll();
//        }
//
//        List<GameList> gameLists = gameListRepository.findAll();
//
//        String recCpu = null;
//        String recGpu = null;
//        int recRamSize = 0;
//
//        UserInsertInfo userInsertInfo = userInsertInfoRepository.findByIpAddress(ipAddress);
//
//        //userinfo 에 있는 cpu rank ramSize 반환
//        int userCpuRank = cpuListRepository.findByCpuName(userInsertInfo.getSelectedCpu()).getCpuRank();
//        int userGpuRank = gpuListRepository.findByGpuName(userInsertInfo.getSelectedGpu()).getGpuRank();
//        int userRamSize = ramListRepository.findByRamName(userInsertInfo.getSelectedRam()).getRamSize()*2;
//
//        //gamelist에서 추출한 <gamename, mincpu> list
//        for (GameList gameList : gameLists) {
//            int recCpuRank = 0;
//            int recGpuRank = 0;
//
//            if(!gameList.getRecommendedGameCpu().equals("")){
//                recCpu = gameList.getRecommendedGameCpu();
//                recCpuRank = cpuListRepository.findByCpuName(gameList.getRecommendedGameCpu()).getCpuRank();
//            }
//            else{
//                recCpu=null;
//            }
//            if(!gameList.getRecommendedGameGpu().equals("")){
//                recGpu = gameList.getRecommendedGameGpu();
//                recGpuRank = gpuListRepository.findByGpuName(gameList.getRecommendedGameGpu()).getGpuRank();
//            }
//            else{
//                recGpu=null;
//            }
//            recRamSize = gameList.getRecommendedGameRam();
//
//            //권장 cpu, gpu가 모두없을 경우
//            if (recCpu == null && recGpu == null) {
//                gameList.setRecState(1);
//                gameList.setMinState(1);
//            }
//            // 권장 cpu만 있을 경우
//            else if (recCpu != null && recGpu == null) {
//                if (userRamSize >= recRamSize && userCpuRank <= recCpuRank) {
//                    gameList.setRecState(1);
//                    gameList.setMinState(1);
//                } else {
//                    gameList.setRecState(0);
//                    gameList.setMinState(CompareCpuUserVsGame2(gameList.getGameName(), ipAddress));
//                }
//            }
//            // 권장 gpu만 있을 경우
//            else if (recCpu == null) {
//                if (userRamSize >= recRamSize && userGpuRank <= recGpuRank) {
//                    gameList.setRecState(1);
//                    gameList.setMinState(1);
//                } else {
//                    gameList.setRecState(0);
//                    gameList.setMinState(CompareCpuUserVsGame2(gameList.getGameName(), ipAddress));
//                }
//            }
//            // 권장 cpu, gpu가 모두 있을경우
//            else {
//                if (userRamSize >= recRamSize && userGpuRank <= recGpuRank && userCpuRank <= recCpuRank) {
//                    gameList.setRecState(1);
//                    gameList.setMinState(1);
//                } else {
//                    gameList.setRecState(0);
//                    gameList.setMinState(CompareCpuUserVsGame2(gameList.getGameName(), ipAddress));
//                }
//            }
//        }
//
//        return gameLists;
//    }
}

