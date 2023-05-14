package com.hadoop.demo.Service;

import com.hadoop.demo.Model.CpuList;
import com.hadoop.demo.Model.GameList;
import com.hadoop.demo.Model.GpuList;
import com.hadoop.demo.Model.UserInsertInfo;
import com.hadoop.demo.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
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
            return 0;
        }
        //최소 cpu만 있을 경우
        else if (minCpu != null && minGpu == null) {
            minCpuRank = cpuListRepository.findByCpuName(minCpu).getCpuRank();
            minRamSize = gameList.getMinimumGameRam();
            if (userRamSize >= minRamSize && userCpuRank <= minCpuRank) {
                minState = 1;
            }
        }
        // 권장 gpu만 있을 경우
        else if (minCpu == null) {
            minGpuRank = gpuListRepository.findByGpuName(minGpu).getGpuRank();
            minRamSize = gameList.getMinimumGameRam();
            if (userRamSize >= minRamSize && userGpuRank <= minGpuRank) {
                minState = 1;
            }
        }
        // 권장 cpu, gpu가 모두 있을경우
        else {
            minCpuRank = cpuListRepository.findByCpuName(minCpu).getCpuRank();
            minGpuRank = gpuListRepository.findByGpuName(minGpu).getGpuRank();
            minRamSize = gameList.getMinimumGameRam();
            if (userRamSize >= minRamSize && userGpuRank <= minGpuRank && userCpuRank <= minCpuRank) {
                minState = 1;
            }
        }
        return minState;

    }
    //gamelist의 cpu를 하나선택후 cpulist에서 유시한것 찾기
    public List<GameList> CompareCpuUserVsGame(String ipAddress) {

        // userInfo가 없을 경우
        if(userInsertInfoRepository.findByIpAddress(ipAddress) == null){
            return gameListRepository.findAll();
        }

        List<GameList> gameLists = gameListRepository.findAll();

        String recCpu = null;
        String recGpu = null;
        int recRamSize = 0;

        UserInsertInfo userInsertInfo = userInsertInfoRepository.findByIpAddress(ipAddress);

        //userinfo 에 있는 cpu rank ramSize 반환
        int userCpuRank = cpuListRepository.findByCpuName(userInsertInfo.getSelectedCpu()).getCpuRank();
        int userGpuRank = gpuListRepository.findByGpuName(userInsertInfo.getSelectedGpu()).getGpuRank();
        int userRamSize = ramListRepository.findByRamName(userInsertInfo.getSelectedRam()).getRamSize()*2;

        //gamelist에서 추출한 <gamename, mincpu> list
        for (GameList gameList : gameLists) {
            int recCpuRank = 0;
            int recGpuRank = 0;

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
                if (userRamSize >= recRamSize && userCpuRank <= recCpuRank) {
                    gameList.setRecState(1);
                    gameList.setMinState(1);
                } else {
                    gameList.setRecState(0);
                    gameList.setMinState(CompareCpuUserVsGame2(gameList.getGameName(), ipAddress));
                }
            }
            // 권장 gpu만 있을 경우
            else if (recCpu == null) {
                if (userRamSize >= recRamSize && userGpuRank <= recGpuRank) {
                    gameList.setRecState(1);
                    gameList.setMinState(1);
                } else {
                    gameList.setRecState(0);
                    gameList.setMinState(CompareCpuUserVsGame2(gameList.getGameName(), ipAddress));
                }
            }
            // 권장 cpu, gpu가 모두 있을경우
            else {
                if (userRamSize >= recRamSize && userGpuRank <= recGpuRank && userCpuRank <= recCpuRank) {
                    gameList.setRecState(1);
                    gameList.setMinState(1);
                } else {
                    gameList.setRecState(0);
                    gameList.setMinState(CompareCpuUserVsGame2(gameList.getGameName(), ipAddress));
                }
            }
        }

        return gameLists;
    }
}

