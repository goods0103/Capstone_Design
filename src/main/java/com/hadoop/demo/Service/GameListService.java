package com.hadoop.demo.Service;

import com.hadoop.demo.Model.GameList;
import com.hadoop.demo.Repository.CpuListRepository;
import com.hadoop.demo.Repository.GameListRepository;
import com.hadoop.demo.Repository.GpuListRepository;
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
    private CompareService compareService;
    @Autowired
    private UserInfoService userInfoService;

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

        minCpu = cpuListRepository.findByCpuName(gameListRepository.findByGameName(gameName).getMinimumGameCpu()).getCpuName();
        minGpu = gpuListRepository.findByGpuName(gameListRepository.findByGameName(gameName).getMinimumGameGpu()).getGpuName();

        //userinfo 에 있는 cpu rank ramSize 반환
        int userCpuRank = compareService.getMatchingCpu().getCpuRank();
        int userGpuRank = compareService.getMatchingGpu().getGpuRank();
        int userRamSize = compareService.getMatchingRam().getRamSize() * 2;
        int minCpuRank = cpuListRepository.findByCpuName(gameListRepository.findByGameName(gameName).getMinimumGameCpu()).getCpuRank();
        int minGpuRank = gpuListRepository.findByGpuName(gameListRepository.findByGameName(gameName).getMinimumGameGpu()).getGpuRank();

        //최소 cpu, gpu가 모두없을 경우
        if (minCpu == null && minGpu == null) {
            minState = 1;
        }
        //최소 cpu만 있을 경우
        else if (minCpu != null && minGpu == null) {
            minRamSize = gameListRepository.findByGameName(gameName).getMinimumGameRam();
            if (userRamSize >= minRamSize && userCpuRank <= minCpuRank) {
                minState = 1;
            }
        }
        // 권장 gpu만 있을 경우
        else if (minCpu == null) {
            minRamSize = gameListRepository.findByGameName(gameName).getMinimumGameRam();
            if (userRamSize >= minRamSize && userGpuRank <= minGpuRank) {
                minState = 1;
            }
        }
        // 권장 cpu, gpu가 모두 있을경우
        else {
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
            recCpu = cpuListRepository.findByCpuName(gameList.getRecommendedGameCpu()).getCpuName();
            recGpu = gpuListRepository.findByGpuName(gameList.getRecommendedGameGpu()).getGpuName();

            if (userInfoService.Count() != 0) {
                //userinfo 에 있는 cpu rank ramSize 반환
                int userCpuRank = compareService.getMatchingCpu().getCpuRank();
                int userGpuRank = compareService.getMatchingGpu().getGpuRank();
                int userRamSize = compareService.getMatchingRam().getRamSize() * 2;
                int recCpuRank = cpuListRepository.findByCpuName(gameList.getRecommendedGameCpu()).getCpuRank();
                int recGpuRank = gpuListRepository.findByGpuName(gameList.getRecommendedGameGpu()).getGpuRank();

                //권장 cpu, gpu가 모두없을 경우
                if (recCpu == null && recGpu == null) {
                    gameListRepository.findByGameName(gameList.getGameName()).setRecState(1);
                    gameListRepository.findByGameName(gameList.getGameName()).setMinState(1);
                }
                // 권장 cpu만 있을 경우
                else if (recCpu != null && recGpu == null) {
                    recRamSize = gameList.getRecommendedGameRam();
                    if (userRamSize >= recRamSize && userCpuRank <= recCpuRank) {
                        gameListRepository.findByGameName(gameList.getGameName()).setRecState(1);
                        gameListRepository.findByGameName(gameList.getGameName()).setMinState(1);
                    } else {
                        gameListRepository.findByGameName(gameList.getGameName()).setRecState(0);
                        gameListRepository.findByGameName(gameList.getGameName()).setMinState(CompareCpuUserVsGame2(gameList.getGameName()));
                    }
                }
                // 권장 gpu만 있을 경우
                else if (recCpu == null) {
                    recRamSize = gameList.getRecommendedGameRam();
                    if (userRamSize >= recRamSize && userGpuRank <= recGpuRank) {
                        gameListRepository.findByGameName(gameList.getGameName()).setRecState(1);
                        gameListRepository.findByGameName(gameList.getGameName()).setMinState(1);
                    } else {
                        gameListRepository.findByGameName(gameList.getGameName()).setRecState(0);
                        gameListRepository.findByGameName(gameList.getGameName()).setMinState(CompareCpuUserVsGame2(gameList.getGameName()));
                    }
                }
                // 권장 cpu, gpu가 모두 있을경우
                else {
                    recRamSize = gameList.getRecommendedGameRam();
                    if (userRamSize >= recRamSize && userGpuRank <= recGpuRank && userCpuRank <= recCpuRank) {
                        gameListRepository.findByGameName(gameList.getGameName()).setRecState(1);
                        gameListRepository.findByGameName(gameList.getGameName()).setMinState(1);
                    } else {
                        gameListRepository.findByGameName(gameList.getGameName()).setRecState(0);
                        gameListRepository.findByGameName(gameList.getGameName()).setMinState(CompareCpuUserVsGame2(gameList.getGameName()));
                    }
                }

            }
            // userInfo가 없을 경우
            else {
                gameListRepository.findByGameName(gameList.getGameName()).setMinimumGameRam(2);
                gameListRepository.findByGameName(gameList.getGameName()).setRecommendedGameRam(2);
            }
        }

        List<GameList> gameList2 = gameListRepository.findAll();
        return gameList2;
    }
}

