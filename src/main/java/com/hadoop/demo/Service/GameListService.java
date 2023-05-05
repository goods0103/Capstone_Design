package com.hadoop.demo.Service;

import com.hadoop.demo.Model.GameList;
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
    //gamelist의 cpu를 하나선택후 cpulist에서 유시한것 찾기
    public int CompareCpuUserVsGame2(String gameName){

        String minCpu = null;
        String minGpu = null;
        int minRamSize = 0;
        int minState = 0;

        String ipAddress = "0:0:0:0:0:0:0:1";
        //userinfo 에 있는 cpu rank ramSize 반환

        int userCpuRank = cpuListRepository.findByCpuName(userInsertInfoRepository.findByIpAddress(ipAddress).getSelectedCpu()).getCpuRank();
        int userGpuRank = gpuListRepository.findByGpuName(userInsertInfoRepository.findByIpAddress(ipAddress).getSelectedGpu()).getGpuRank();
        int userRamSize = ramListRepository.findByRamName(userInsertInfoRepository.findByIpAddress(ipAddress).getSelectedRam()).getRamSize();

        GameList gameList = gameListRepository.findByGameName(gameName);
        if(!gameListRepository.findByGameName(gameName).getMinimumGameCpu().equals("")){
            minCpu = cpuListRepository.findByCpuName(gameList.getMinimumGameCpu()).getCpuName();
        }
        if(!gameListRepository.findByGameName(gameName).getMinimumGameGpu().equals("")){
            minGpu = gpuListRepository.findByGpuName(gameList.getMinimumGameGpu()).getGpuName();
        }

        //userinfo 에 있는 cpu rank ramSize 반환
        int minCpuRank = 0;
        int minGpuRank = 0;

        //최소 cpu, gpu가 모두없을 경우
        if (minCpu == null && minGpu == null) {
            minState = 1;
        }
        //최소 cpu만 있을 경우
        else if (minCpu != null && minGpu == null) {
            minCpuRank = cpuListRepository.findByCpuName(gameList.getMinimumGameCpu()).getCpuRank();
            minRamSize = gameList.getMinimumGameRam();
            if (userRamSize >= minRamSize && userCpuRank <= minCpuRank) {
                minState = 1;
            }
        }
        // 권장 gpu만 있을 경우
        else if (minCpu == null) {
            minGpuRank = gpuListRepository.findByGpuName(gameList.getMinimumGameGpu()).getGpuRank();
            minRamSize = gameList.getMinimumGameRam();
            if (userRamSize >= minRamSize && userGpuRank <= minGpuRank) {
                minState = 1;
            }
        }
        // 권장 cpu, gpu가 모두 있을경우
        else {
            minCpuRank = cpuListRepository.findByCpuName(gameList.getMinimumGameCpu()).getCpuRank();
            minGpuRank = gpuListRepository.findByGpuName(gameList.getMinimumGameGpu()).getGpuRank();
            minRamSize = gameListRepository.findByGameName(gameName).getMinimumGameRam();
            if (userRamSize >= minRamSize && userGpuRank <= minGpuRank && userCpuRank <= minCpuRank) {
                minState = 1;
            }
        }
        return minState;

    }
    //gamelist의 cpu를 하나선택후 cpulist에서 유시한것 찾기
    public List<GameList> CompareCpuUserVsGame() {

        List<GameList> gameLists = gameListRepository.findAll();

        String recCpu = null;
        String recGpu = null;
        int recRamSize = 0;

        //gamelist에서 추출한 <gamename, mincpu> list
        for (GameList gameList : gameLists) {

            if(!gameList.getRecommendedGameCpu().equals("")){
                recCpu = cpuListRepository.findByCpuName(gameList.getRecommendedGameCpu()).getCpuName();
            }
            else{
                recCpu=null;
            }
            if(!gameList.getRecommendedGameGpu().equals("")){
                recGpu = gpuListRepository.findByGpuName(gameList.getRecommendedGameGpu()).getGpuName();
            }
            else{
                recGpu=null;
            }

            if(userInfoService.Count()!=0){
                String ipAddress = "0:0:0:0:0:0:0:1";
                //userinfo 에 있는 cpu rank ramSize 반환
                int userCpuRank = cpuListRepository.findByCpuName(userInsertInfoRepository.findByIpAddress(ipAddress).getSelectedCpu()).getCpuRank();
                int userGpuRank = gpuListRepository.findByGpuName(userInsertInfoRepository.findByIpAddress(ipAddress).getSelectedGpu()).getGpuRank();
                int userRamSize = ramListRepository.findByRamName(userInsertInfoRepository.findByIpAddress(ipAddress).getSelectedRam()).getRamSize();
                int recCpuRank = 0;
                int recGpuRank = 0;
                GameList gamelist = gameListRepository.findByGameName(gameList.getGameName());
                //권장 cpu, gpu가 모두없을 경우
                if (recCpu == null && recGpu == null) {
                    gamelist.setRecState(1);
                    gamelist.setMinState(1);
                }
                // 권장 cpu만 있을 경우
                else if (recCpu != null && recGpu == null) {
                    recCpuRank = cpuListRepository.findByCpuName(gameList.getRecommendedGameCpu()).getCpuRank();
                    recRamSize = gameList.getRecommendedGameRam();
                    if (userRamSize >= recRamSize && userCpuRank <= recCpuRank) {
                        gamelist.setRecState(1);
                        gamelist.setMinState(1);
                    } else {
                        gamelist.setRecState(0);
                        gamelist.setMinState(CompareCpuUserVsGame2(gameList.getGameName()));
                    }
                }
                // 권장 gpu만 있을 경우
                else if (recCpu == null) {
                    recRamSize = gameList.getRecommendedGameRam();
                    recGpuRank = gpuListRepository.findByGpuName(gameList.getRecommendedGameGpu()).getGpuRank();
                    if (userRamSize >= recRamSize && userGpuRank <= recGpuRank) {
                        gamelist.setRecState(1);
                        gamelist.setMinState(1);
                    } else {
                        gamelist.setRecState(0);
                        gamelist.setMinState(CompareCpuUserVsGame2(gameList.getGameName()));
                    }
                }
                // 권장 cpu, gpu가 모두 있을경우
                else {
                    recRamSize = gameList.getRecommendedGameRam();
                    recCpuRank = cpuListRepository.findByCpuName(gameList.getRecommendedGameCpu()).getCpuRank();
                    recGpuRank = gpuListRepository.findByGpuName(gameList.getRecommendedGameGpu()).getGpuRank();
                    if (userRamSize >= recRamSize && userGpuRank <= recGpuRank && userCpuRank <= recCpuRank) {
                        gamelist.setRecState(1);
                        gamelist.setMinState(1);
                    } else {
                        gamelist.setRecState(0);
                        gamelist.setMinState(CompareCpuUserVsGame2(gameList.getGameName()));
                    }

                }

            }
            // userInfo가 없을 경우
            else {
                gameListRepository.findByGameName(gameList.getGameName()).setMinimumGameRam(2);
                gameListRepository.findByGameName(gameList.getGameName()).setRecommendedGameRam(2);
            }
        }

        return gameLists;
    }
}

