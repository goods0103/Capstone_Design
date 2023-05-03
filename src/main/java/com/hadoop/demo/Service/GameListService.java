package com.hadoop.demo.Service;

import com.hadoop.demo.Model.CpuList;
import com.hadoop.demo.Model.GameList;
import com.hadoop.demo.Model.GpuList;
import com.hadoop.demo.Repository.CpuListRepository;
import com.hadoop.demo.Repository.GameListRepository;
import com.hadoop.demo.Repository.GpuListRepository;
import lombok.*;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @ToString
    public static class gameUserCompare{
        private String gameName;
        private String gameImg;
        private int recState;
        private int minState;

    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class getGameSpec{
        private String gameName;
        private String gameImg;
        private String cpu;
        private String gpu;
        private int ramSize;

    }

    public getGameSpec sortGameList(String gameName, String gameImg, String cpu1, String cpu2, String gpu1, String gpu2, int ramSize){

        getGameSpec getGameSpec;
        
        if(cpu1!=null && cpu2!=null){
            if(gpu1!=null && gpu2!=null){
                getGameSpec = new getGameSpec(gameName, gameImg, cpu1, gpu1, ramSize);
            }
            else if(gpu1 != null){
                getGameSpec = new getGameSpec(gameName, gameImg, cpu1, gpu1, ramSize);
            }
            else if(gpu2 != null){
                getGameSpec = new getGameSpec(gameName, gameImg, cpu1, gpu2, ramSize);
            }
            else{
                getGameSpec = new getGameSpec(gameName, gameImg, cpu1, "", ramSize);
            }
        }
        else if(cpu1 != null){
            if(gpu1!=null && gpu2!=null){
                getGameSpec = new getGameSpec(gameName, gameImg, cpu1, gpu1, ramSize);
            }
            else if(gpu1 != null){
                getGameSpec = new getGameSpec(gameName, gameImg, cpu1, gpu1, ramSize);
            }
            else if(gpu2 != null){
                getGameSpec = new getGameSpec(gameName, gameImg, cpu1, gpu2, ramSize);
            }
            else{
                getGameSpec = new getGameSpec(gameName, gameImg, cpu1, "", ramSize);
            }
        }
        else if(cpu2 != null){
            if(gpu1!=null && gpu2!=null){
                getGameSpec = new getGameSpec(gameName, gameImg, cpu2, gpu1, ramSize);
            }
            else if(gpu1 != null){
                getGameSpec = new getGameSpec(gameName, gameImg, cpu2, gpu1, ramSize);
            }
            else if(gpu2 != null){
                getGameSpec = new getGameSpec(gameName, gameImg, cpu2, gpu2, ramSize);
            }
            else{
                getGameSpec = new getGameSpec(gameName, gameImg, cpu2, "", ramSize);
            }
        }
        else{
            if(gpu1!=null && gpu2!=null){
                getGameSpec = new getGameSpec(gameName, gameImg, "", gpu1, ramSize);
            }
            else if(gpu1 != null){
                getGameSpec = new getGameSpec(gameName, gameImg, "", gpu1, ramSize);
            }
            else if(gpu2 != null){
                getGameSpec = new getGameSpec(gameName, gameImg, "", gpu2, ramSize);
            }
            else{
                getGameSpec = new getGameSpec(gameName, gameImg, "", "", ramSize);
            }
        }

        return getGameSpec;
    }

    //gamelist min cpu, gpu, ramSize 이름을 list에 담아 반환
    public getGameSpec findMinGameSpec(String gameName){

        GameList gameList = gameListRepository.findByGameName(gameName);

        String minCpu1 = gameList.getMinimumGameCpu1();
        String minCpu2 = gameList.getMinimumGameCpu2();
        String minGpu1 = gameList.getMinimumGameGpu1();
        String minGpu2 = gameList.getMinimumGameGpu2();
        String gameImg = gameList.getGameImg();
        int minRamSize = gameList.getMinimumGameRam();
        
        return sortGameList(gameName, gameImg, minCpu1, minCpu2, minGpu1, minGpu2, minRamSize);
    }

    //gamelist rec cpu,gpu, rmaSize 이름을 list에 담아 반환
    public List<getGameSpec> findRecGameSpec(int pageNumber){

        if(pageNumber==1){
            List<GameList> gameList = gameListRepository.findAll().subList(0, 50);
            List<getGameSpec> gameSpecs = new ArrayList<>();

            for(GameList list : gameList){
                String gameName = list.getGameName();
                String recCpu1 = list.getRecommendedGameCpu1();
                String recCpu2 = list.getRecommendedGameCpu2();
                String recGpu1 = list.getRecommendedGameGpu1();
                String recGpu2 = list.getRecommendedGameGpu2();
                String gameImg = list.getGameImg();
                int recRamSize = list.getRecommendedGameRam();
                gameSpecs.add(sortGameList(gameName, gameImg,  recCpu1, recCpu2, recGpu1, recGpu2, recRamSize));
            }

            return gameSpecs;
        }
        else{
            List<GameList> gameList = gameListRepository.findAll().subList((pageNumber-1)*50+1, pageNumber*50);
            List<getGameSpec> gameSpecs = new ArrayList<>();

            for(GameList list : gameList){
                String gameName = list.getGameName();
                String recCpu1 = list.getRecommendedGameCpu1();
                String recCpu2 = list.getRecommendedGameCpu2();
                String recGpu1 = list.getRecommendedGameGpu1();
                String recGpu2 = list.getRecommendedGameGpu2();
                String gameImg = list.getGameImg();
                int recRamSize = list.getRecommendedGameRam();
                gameSpecs.add(sortGameList(gameName, gameImg,  recCpu1, recCpu2, recGpu1, recGpu2, recRamSize));
            }

            return gameSpecs;
        }

    }

    //gamelist의 cpu를 하나선택후 cpulist에서 유시한것 찾기
    public int CompareCpuUserVsGame(String gameName){

        List<CpuList> cpuLists = cpuListRepository.findAll();
        List<GpuList> gpuLists = gpuListRepository.findAll();
        List<String> matchingCpu = new ArrayList<>();
        List<String> matchingGpu = new ArrayList<>();
        int minState = 0;

        if(userInfoService.Count()!=0){

            //userinfo 에 있는 cpu rank ramSize 반환
            int userCpuRank = compareService.getMatchingCpu().getCpuRank();
            int userGpuRank = compareService.getMatchingGpu().getGpuRank();
            int userRamSize = compareService.getMatchingRam().getRamSize()*2;

            getGameSpec minSpec = findMinGameSpec(gameName);

            if(minSpec.getCpu().equals("") && minSpec.getGpu().equals("")){
                minState= 1;
            }

            // list에 mingpu가 없을경우
            else if(!minSpec.getCpu().equals("") && minSpec.getGpu().equals("")){
                // mincpu와 Cpulist cpu 비교 result = mostsimilar
                for(CpuList cpu : cpuLists){
                    if(minSpec.getCpu().toLowerCase().contains(cpu.getCpuName()) || cpu.getCpuName().toLowerCase().
                            contains(minSpec.getCpu())){
                        matchingCpu.add(cpu.getCpuName());
                    }
                }

                if(matchingCpu.size()==0){
                    //gamelist에서 추출한 mincpu와 cpulist에서 추출한 cpu중에 유사한것이 없을경우 rank가 가장 낮은 cpu add
                    matchingCpu.add(cpuListRepository.findByCpuRank(cpuLists.size()).getCpuName());
                }

                String[] cpuArray = matchingCpu.toArray(new String[matchingCpu.size()]);

                String mostSimilar = "";
                int maxSimilarity = 100;

                for (String findCpuArray : cpuArray) {
                    int similarity = StringUtils.getLevenshteinDistance(minSpec.getCpu(), findCpuArray);
                    if (similarity < maxSimilarity) {
                        //System.out.println("findCpuArray: "+ findCpuArray);
                        maxSimilarity = similarity;
                        mostSimilar = findCpuArray;

                    }
                }



                //sorting이 너무 잘못된 경우
                for(int i=2; i<=13; i++){
                    if(minSpec.getCpu().contains("i3-"+i) || minSpec.getCpu().contains("i3 "+i) && !mostSimilar.contains("i3-"+i)){
                        if(i<=7){
                            mostSimilar = "Intel Core i3-7300 @ 4.00GHz";break;
                        }
                        else if(i==8){
                            mostSimilar = "Intel Core i3-8100T @ 3.10GHz";break;
                        }
                        else if(i==9){
                            mostSimilar = "Intel Core i3-9100T @ 3.10GHz";break;
                        }
                        else if(i==10){
                            mostSimilar = "Intel Core i3-1005G1 @ 1.20GHz";break;
                        }
                        else if(i==11){
                            mostSimilar = "Intel Core i3-1115G4E @ 3.00GHz";break;
                        }
                        else if(i==12){
                            mostSimilar = "Intel Core i3-1215UE";break;
                        }
                        else{
                            mostSimilar = "Intel Core i3-1315U";break;
                        }

                    }
                    else if(minSpec.getCpu().contains("i5-"+i) || minSpec.getCpu().contains("i5 "+i) && !mostSimilar.contains("i5-"+i)){
                        if(i<=3){
                            mostSimilar = "Intel Core i5-3570S @ 3.10GHz";break;
                        }
                        else if(i==4){
                            mostSimilar = "Intel Core i5-4460S @ 2.90GHz";break;
                        }
                        else if(i==5){
                            mostSimilar = "Intel Core i5-5575R @ 2.80GHz";break;
                        }
                        else if(i==6){
                            mostSimilar = "Intel Core i5-6442EQ @ 1.90GHz";break;
                        }
                        else if(i==7){
                            mostSimilar = "Intel Core i5-7400T @ 2.40GHz";break;
                        }
                        else if(i==8){
                            mostSimilar = "Intel Core i5-8365UE @ 1.60GHz";break;
                        }
                        else if(i==9){
                            mostSimilar = "Intel Core i5-9300HF @ 2.40GHz";break;
                        }
                        else if(i==10){
                            mostSimilar = "Intel Core i5-10210Y @ 1.00GHz";break;
                        }
                        else if(i==11){
                            mostSimilar = "Intel Core i5-1130G7 @ 1.10GHz";break;
                        }
                        else if(i==12){
                            mostSimilar = "Intel Core i5-1245UE";break;
                        }
                        else{
                            mostSimilar = "Intel Core i5-1335U";break;
                        }
                    }
                    else if(minSpec.getCpu().contains("i7-"+i) || minSpec.getCpu().contains("i7 "+i) && !mostSimilar.contains("i7-"+i)){
                        if(i==2){
                            mostSimilar = "Intel Core i7-2600S @ 2.80GHz";break;
                        }
                        else if(i==3){
                            mostSimilar = "Intel Core i7-3612QM @ 2.10GHz";break;
                        }
                        else if(i==4){
                            mostSimilar = "Intel Core i7-4770TE @ 2.30GHz";break;
                        }
                        else if(i==5){
                            mostSimilar = "Intel Core i7-5700EQ @ 2.60GHz";break;
                        }
                        else if(i==6){
                            mostSimilar = "Intel Core i7-6822EQ @ 2.00GHz";break;
                        }
                        else if(i==7){
                            mostSimilar = "Intel Core i7-7700HQ @ 2.80GHz";break;
                        }
                        else if(i==8){
                            mostSimilar = "Intel Core i7-8665UE @ 1.70GHz";break;
                        }
                        else if(i==9){
                            mostSimilar = "Intel Core i7-970 @ 3.20GHz";break;
                        }
                        else if(i==10){
                            mostSimilar = "Intel Core i7-10510Y @ 1.20GHz";break;
                        }
                        else if(i==11){
                            mostSimilar = "Intel Core i7-1180G7 @ 1.30GHz";break;
                        }
                        else if(i==12){
                            mostSimilar = "Intel Core i7-1265UE";break;
                        }
                        else{
                            mostSimilar = "Intel Core i7-1365U";break;
                        }
                    }
                    else if(minSpec.getCpu().contains("core2") || minSpec.getCpu().contains("core 2") && !mostSimilar.contains("core2")){
                        mostSimilar = "Intel Core i3-7300 @ 4.00GHz";break;
                    }
                }

                //최소사양의 cpuRank get
                int minCpuRank = cpuListRepository.findByCpuName(mostSimilar).getCpuRank();

                System.out.println("gameName : " + minSpec.getGameName());
                System.out.println("cpuName : " + minSpec.getCpu());
                System.out.println("similarCpu : " + cpuListRepository.findByCpuName(mostSimilar).getCpuName());
                System.out.println("cpuRank : " + userCpuRank);
                System.out.println("similarCpuRank : " + minCpuRank);

                //비교
                if(userCpuRank<=minCpuRank && userRamSize>=minSpec.getRamSize()){
                    minState = 1;
                }

            }

            else if(minSpec.getCpu().equals("")){

                // mincpu와 Cpulist cpu 비교 result = mostsimilar
                for(GpuList gpu : gpuLists){
                    if(minSpec.getGpu().toLowerCase().contains(gpu.getGpuName().toLowerCase()) || gpu.getGpuName().toLowerCase().
                            contains(minSpec.getGpu().toLowerCase())){
                        matchingGpu.add(gpu.getGpuName());
                    }
                }
                if(matchingGpu.size()==0){
                    //gamelist에서 추출한 mincpu와 cpulist에서 추출한 cpu중에 유사한것이 없을경우 rank가 가장 낮은 cpu add
                    matchingGpu.add(gpuListRepository.findByGpuRank(gpuLists.size()).getGpuName());
                }

                String[] gpuArray = matchingGpu.toArray(new String[matchingGpu.size()]);

                String mostSimilar = "";
                int maxSimilarity = 100;

                for (String findGpuArray : gpuArray) {
                    int similarity = StringUtils.getLevenshteinDistance(minSpec.getGpu(), findGpuArray);
                    if (similarity < maxSimilarity) {
//                        System.out.println("findGpuArray: "+ findGpuArray);
                        maxSimilarity = similarity;
                        mostSimilar = findGpuArray;

                    }
                }

                //최소사양의 gpuRank get
                int minGpuRank = gpuListRepository.findByGpuName(mostSimilar).getGpuRank();

                System.out.println("gameName : " + minSpec.getGameName());
                System.out.println("gpuName : " + minSpec.getGpu());
                System.out.println("similarGpu : " + gpuListRepository.findByGpuName(mostSimilar).getGpuName());
                System.out.println("gpuRank : " + userGpuRank);
                System.out.println("similarGpuRank : " + minGpuRank);

                //비교
                if(userGpuRank<=minGpuRank && userRamSize>=minSpec.getRamSize()){
                    minState = 1;
                }

            }

            else{
                // mincpu와 Cpulist cpu 비교 result = mostsimilar
                for(CpuList cpu : cpuLists){
                    if(minSpec.getCpu().toLowerCase().contains(cpu.getCpuName()) || cpu.getCpuName().toLowerCase().
                            contains(minSpec.getCpu())){
                        matchingCpu.add(cpu.getCpuName());
                    }
                }
                if(matchingCpu.size()==0){
                    //gamelist에서 추출한 mincpu와 cpulist에서 추출한 cpu중에 유사한것이 없을경우 rank가 가장 낮은 cpu add
                    matchingCpu.add(cpuListRepository.findByCpuRank(cpuLists.size()).getCpuName());
                }

                String[] cpuArray = matchingCpu.toArray(new String[matchingCpu.size()]);

                String mostSimilar = "";
                int maxSimilarity = 100;

                for (String findCpuArray : cpuArray) {
                    int similarity = StringUtils.getLevenshteinDistance(minSpec.getCpu(), findCpuArray);
                    if (similarity < maxSimilarity) {
                        //System.out.println("findCpuArray: "+ findCpuArray);
                        maxSimilarity = similarity;
                        mostSimilar = findCpuArray;

                    }
                }

                //sorting이 너무 잘못된 경우
                for(int i=2; i<=13; i++){
                    if(minSpec.getCpu().contains("i3-"+i) || minSpec.getCpu().contains("i3 "+i) && !mostSimilar.contains("i3-"+i)){
                        if(i<=7){
                            mostSimilar = "Intel Core i3-7300 @ 4.00GHz";break;
                        }
                        else if(i==8){
                            mostSimilar = "Intel Core i3-8100T @ 3.10GHz";break;
                        }
                        else if(i==9){
                            mostSimilar = "Intel Core i3-9100T @ 3.10GHz";break;
                        }
                        else if(i==10){
                            mostSimilar = "Intel Core i3-1005G1 @ 1.20GHz";break;
                        }
                        else if(i==11){
                            mostSimilar = "Intel Core i3-1115G4E @ 3.00GHz";break;
                        }
                        else if(i==12){
                            mostSimilar = "Intel Core i3-1215UE";break;
                        }
                        else{
                            mostSimilar = "Intel Core i3-1315U";break;
                        }

                    }
                    else if(minSpec.getCpu().contains("i5-"+i) || minSpec.getCpu().contains("i5 "+i) && !mostSimilar.contains("i5-"+i)){
                        if(i<=3){
                            mostSimilar = "Intel Core i5-3570S @ 3.10GHz";break;
                        }
                        else if(i==4){
                            mostSimilar = "Intel Core i5-4460S @ 2.90GHz";break;
                        }
                        else if(i==5){
                            mostSimilar = "Intel Core i5-5575R @ 2.80GHz";break;
                        }
                        else if(i==6){
                            mostSimilar = "Intel Core i5-6442EQ @ 1.90GHz";break;
                        }
                        else if(i==7){
                            mostSimilar = "Intel Core i5-7400T @ 2.40GHz";break;
                        }
                        else if(i==8){
                            mostSimilar = "Intel Core i5-8365UE @ 1.60GHz";break;
                        }
                        else if(i==9){
                            mostSimilar = "Intel Core i5-9300HF @ 2.40GHz";break;
                        }
                        else if(i==10){
                            mostSimilar = "Intel Core i5-10210Y @ 1.00GHz";break;
                        }
                        else if(i==11){
                            mostSimilar = "Intel Core i5-1130G7 @ 1.10GHz";break;
                        }
                        else if(i==12){
                            mostSimilar = "Intel Core i5-1245UE";break;
                        }
                        else{
                            mostSimilar = "Intel Core i5-1335U";break;
                        }
                    }
                    else if(minSpec.getCpu().contains("i7-"+i) || minSpec.getCpu().contains("i7 "+i) && !mostSimilar.contains("i7-"+i)){
                        if(i==2){
                            mostSimilar = "Intel Core i7-2600S @ 2.80GHz";break;
                        }
                        else if(i==3){
                            mostSimilar = "Intel Core i7-3612QM @ 2.10GHz";break;
                        }
                        else if(i==4){
                            mostSimilar = "Intel Core i7-4770TE @ 2.30GHz";break;
                        }
                        else if(i==5){
                            mostSimilar = "Intel Core i7-5700EQ @ 2.60GHz";break;
                        }
                        else if(i==6){
                            mostSimilar = "Intel Core i7-6822EQ @ 2.00GHz";break;
                        }
                        else if(i==7){
                            mostSimilar = "Intel Core i7-7700HQ @ 2.80GHz";break;
                        }
                        else if(i==8){
                            mostSimilar = "Intel Core i7-8665UE @ 1.70GHz";break;
                        }
                        else if(i==9){
                            mostSimilar = "Intel Core i7-970 @ 3.20GHz";break;
                        }
                        else if(i==10){
                            mostSimilar = "Intel Core i7-10510Y @ 1.20GHz";break;
                        }
                        else if(i==11){
                            mostSimilar = "Intel Core i7-1180G7 @ 1.30GHz";break;
                        }
                        else if(i==12){
                            mostSimilar = "Intel Core i7-1265UE";break;
                        }
                        else{
                            mostSimilar = "Intel Core i7-1365U";break;
                        }
                    }
                    else if(minSpec.getCpu().contains("core2") || minSpec.getCpu().contains("core 2") && !mostSimilar.contains("core2")){
                        mostSimilar = "Intel Core i3-7300 @ 4.00GHz";break;
                    }
                }

                //최소사양의 cpuRank get
                int minCpuRank = cpuListRepository.findByCpuName(mostSimilar).getCpuRank();

                // mincpu와 Cpulist cpu 비교 result = mostsimilar
                for(GpuList gpu : gpuLists){
                    if(minSpec.getGpu().toLowerCase().contains(gpu.getGpuName().toLowerCase()) || gpu.getGpuName().toLowerCase().
                            contains(minSpec.getGpu().toLowerCase())){
                        matchingGpu.add(gpu.getGpuName());
                    }

                }
                if(matchingGpu.size()==0){
                    //gamelist에서 추출한 mincpu와 cpulist에서 추출한 cpu중에 유사한것이 없을경우 rank가 가장 낮은 cpu add
                    matchingGpu.add(gpuListRepository.findByGpuRank(gpuLists.size()).getGpuName());
                }


                String[] gpuArray = matchingGpu.toArray(new String[matchingGpu.size()]);

                String mostSimilar2 = "";
                int maxSimilarity2 = 100;

                for (String findGpuArray : gpuArray) {
                    int similarity = StringUtils.getLevenshteinDistance(minSpec.getGpu(), findGpuArray);
                    if (similarity < maxSimilarity2) {
//                        System.out.println("findGpuArray: "+ findGpuArray);
                        maxSimilarity2 = similarity;
                        mostSimilar2 = findGpuArray;

                    }
                }

                //최소사양의 gpuRank get
                int minGpuRank = gpuListRepository.findByGpuName(mostSimilar2).getGpuRank();

                System.out.println("gameName : " + minSpec.getGameName());
                System.out.println("cpuName : " + minSpec.getCpu());
                System.out.println("similarCpu : " + cpuListRepository.findByCpuName(mostSimilar).getCpuName());
                System.out.println("cpuRank : " + userCpuRank);
                System.out.println("similarCpuRank : " + minCpuRank);

                System.out.println("ramSize : " + userRamSize);
                System.out.println("similarRamSize : " + minSpec.getRamSize());
                System.out.println("gpuName : " + minSpec.getGpu());
                System.out.println("similarGpu : " + gpuListRepository.findByGpuName(mostSimilar2).getGpuName());
                System.out.println("gpuRank : " + userGpuRank);
                System.out.println("similarGpuRank : " + minGpuRank);

                if(userCpuRank<=minCpuRank && userGpuRank<=minGpuRank && userRamSize>=minSpec.getRamSize()){
                    minState = 1;
                    System.out.println("state : " + 1);
                }

            }

        }

        // userInfo가 없을 경우
        else {
            minState = 2;
        }

        return minState;

    }

    public List<gameUserCompare> CompareCpuUserVsGame2(int pageNumber){  //gamelist의 cpu를 하나선택후 cpulist에서 유시한것 찾기

        List<gameUserCompare> gameUserCompares = new ArrayList<>();
        List<CpuList> cpuLists = cpuListRepository.findAll();
        List<GpuList> gpuLists = gpuListRepository.findAll();

        //gamelist에서 추출한 <gamename, mincpu> list
        List<getGameSpec> recSpecs = findRecGameSpec(pageNumber);
        //

        List<String> matchingCpu = new ArrayList<>();
        List<String> matchingGpu = new ArrayList<>();

        if(userInfoService.Count()!=0){

            //userinfo 에 있는 cpu rank ramSize 반환
            int userCpuRank = compareService.getMatchingCpu().getCpuRank();
            int userGpuRank = compareService.getMatchingGpu().getGpuRank();
            int userRamSize = compareService.getMatchingRam().getRamSize();

            for(getGameSpec recSpec : recSpecs){
                //list에 있는 mincpu, gpu가 없을경우
                if(recSpec.getCpu().equals("") && recSpec.getGpu().equals("")){
                    gameUserCompares.add(new gameUserCompare(recSpec.getGameName(), recSpec.getGameImg(), 1, 1));
                }
                // list에 mingpu가 없을경우
                else if(!recSpec.getCpu().equals("") && recSpec.getGpu().equals("")){
                    // mincpu와 Cpulist cpu 비교 result = mostsimilar
                    for(CpuList cpu : cpuLists){
                        if(recSpec.getCpu().toLowerCase().contains(cpu.getCpuName()) || cpu.getCpuName().toLowerCase().
                                contains(recSpec.getCpu())){
                            matchingCpu.add(cpu.getCpuName());
                        }
                    }

                    if(matchingCpu.size()==0){
                        //gamelist에서 추출한 mincpu와 cpulist에서 추출한 cpu중에 유사한것이 없을경우 rank가 가장 낮은 cpu add
                        matchingCpu.add(cpuListRepository.findByCpuRank(cpuLists.size()).getCpuName());
                    }

                    String[] cpuArray = matchingCpu.toArray(new String[matchingCpu.size()]);

                    String mostSimilar = "";
                    int maxSimilarity = 100;

                    for (String findCpuArray : cpuArray) {
                        int similarity = StringUtils.getLevenshteinDistance(recSpec.getCpu(), findCpuArray);
                        if (similarity < maxSimilarity) {
                            //System.out.println("findCpuArray: "+ findCpuArray);
                            maxSimilarity = similarity;
                            mostSimilar = findCpuArray;

                        }
                    }

                    //sorting이 너무 잘못된 경우
                    for(int i=2; i<=13; i++){
                        if(recSpec.getCpu().contains("i3-"+i) || recSpec.getCpu().contains("i3 "+i) && !mostSimilar.contains("i3-"+i)){
                            if(i<=7){
                                mostSimilar = "Intel Core i3-7350K @ 4.20GHz";break;
                            }
                            else if(i==8){
                                mostSimilar = "Intel Core i3-8350K @ 4.00GHz";break;
                            }
                            else if(i==9){
                                mostSimilar = "Intel Core i3-9350K @ 4.00GHz";break;
                            }
                            else if(i==10){
                                mostSimilar = "Intel Core i3-10325 @ 3.90GHz";break;
                            }
                            else if(i==11){
                                mostSimilar = "Intel Core i3-11100B @ 3.60GHz";break;
                            }
                            else if(i==12){
                                mostSimilar = "Intel Core i3-12300";break;
                            }
                            else{
                                mostSimilar = "Intel Core i3-13100F";break;
                            }

                        }
                        else if(recSpec.getCpu().contains("i5-"+i) || recSpec.getCpu().contains("i5 "+i) && !mostSimilar.contains("i5-"+i)){
                            if(i<=3){
                                mostSimilar = "Intel Core i5-3170K @ 3.20GHz";break;
                            }
                            else if(i==4){
                                mostSimilar = "Intel Core i5-4690K @ 3.50GHz";break;
                            }
                            else if(i==5){
                                mostSimilar = "Intel Core i5-5675C @ 3.10GHz";break;
                            }
                            else if(i==6){
                                mostSimilar = "Intel Core i5-6600K @ 3.50GHz";break;
                            }
                            else if(i==7){
                                mostSimilar = "Intel Core i5-7600K @ 3.80GHz";break;
                            }
                            else if(i==8){
                                mostSimilar = "Intel Core i5-8600K @ 3.60GHz";break;
                            }
                            else if(i==9){
                                mostSimilar = "Intel Core i5-9600KF @ 3.70GHz";break;
                            }
                            else if(i==10){
                                mostSimilar = "Intel Core i5-10600K @ 4.10GHz";break;
                            }
                            else if(i==11){
                                mostSimilar = "Intel Core i5-11500H @ 2.90GHz";break;
                            }
                            else if(i==12){
                                mostSimilar = "Intel Core i5-12400";break;
                            }
                            else{
                                mostSimilar = "Intel Core i5-13500H";break;
                            }
                        }
                        else if(recSpec.getCpu().contains("i7-"+i) || recSpec.getCpu().contains("i7 "+i) && !mostSimilar.contains("i7-"+i)){
                            if(i==2){
                                mostSimilar = "Intel Core i7-2700K @ 3.50GHz";break;
                            }
                            else if(i==3){
                                mostSimilar = "Intel Core i7-3960X @ 3.30GHz";break;
                            }
                            else if(i==4){
                                mostSimilar = "Intel Core i7-4960X @ 3.60GHz";break;
                            }
                            else if(i==5){
                                mostSimilar = "Intel Core i7-5960X @ 3.00GHz";break;
                            }
                            else if(i==6){
                                mostSimilar = "Intel Core i7-6900K @ 3.20GHz";break;
                            }
                            else if(i==7){
                                mostSimilar = "Intel Core i7-7800X @ 3.50GHz";break;
                            }
                            else if(i==8){
                                mostSimilar = "Intel Core i7-8700T @ 2.40GHz";break;
                            }
                            else if(i==9){
                                mostSimilar = "Intel Core i7-9700E @ 2.60GHz";break;
                            }
                            else if(i==10){
                                mostSimilar = "Intel Core i7-10700T @ 2.00GHz";break;
                            }
                            else if(i==11){
                                mostSimilar = "Intel Core i7-11700T @ 1.40GHz";break;
                            }
                            else if(i==12){
                                mostSimilar = "Intel Core i7-1270P";break;
                            }
                            else{
                                mostSimilar = "Intel Core i7-13800H";break;
                            }
                        }
                        else if(recSpec.getCpu().contains("core2") || recSpec.getCpu().contains("core 2") && !mostSimilar.contains("core2")){
                            mostSimilar = "Intel Core i3-7350K @ 4.20GHz";break;
                        }
                    }

                    //권장사양의 cpuRank get
                    int recCpuRank = cpuListRepository.findByCpuName(mostSimilar).getCpuRank();

                    //비교
                    if(userCpuRank<=recCpuRank && userRamSize>=recSpec.getRamSize()){
                        gameUserCompares.add(new gameUserCompare(recSpec.getGameName(), recSpec.getGameImg(), 1, 1));
                    }
                    else{
                        gameUserCompares.add(new gameUserCompare(recSpec.getGameName(), recSpec.getGameImg(), 0,
                                CompareCpuUserVsGame(recSpec.getGameName())));
                    }

                }

                else if(recSpec.getCpu().equals("")){

                    // mincpu와 Cpulist cpu 비교 result = mostsimilar
                    for(GpuList gpu : gpuLists){
                        if(recSpec.getGpu().toLowerCase().contains(gpu.getGpuName().toLowerCase()) || gpu.getGpuName().toLowerCase().
                                contains(recSpec.getGpu().toLowerCase())){
                            matchingGpu.add(gpu.getGpuName());
                        }
                    }
                    if(matchingGpu.size()==0){
                        //gamelist에서 추출한 mincpu와 cpulist에서 추출한 cpu중에 유사한것이 없을경우 rank가 가장 낮은 cpu add
                        matchingGpu.add(gpuListRepository.findByGpuRank(gpuLists.size()).getGpuName());
                    }

                    String[] gpuArray = matchingGpu.toArray(new String[matchingGpu.size()]);

                    String mostSimilar = "";
                    int maxSimilarity = 100;

                    for (String findGpuArray : gpuArray) {
                        int similarity = StringUtils.getLevenshteinDistance(recSpec.getGpu(), findGpuArray);
                        if (similarity < maxSimilarity) {
//                        System.out.println("findGpuArray: "+ findGpuArray);
                            maxSimilarity = similarity;
                            mostSimilar = findGpuArray;

                        }
                    }

                    //최소사양의 gpuRank get
                    int recGpuRank = gpuListRepository.findByGpuName(mostSimilar).getGpuRank();

                    //비교
                    if(userGpuRank<=recGpuRank && userRamSize>=recSpec.getRamSize()){
                        gameUserCompares.add(new gameUserCompare(recSpec.getGameName(), recSpec.getGameImg(), 1, 1));
                    }
                    else{
                        gameUserCompares.add(new gameUserCompare(recSpec.getGameName(), recSpec.getGameImg(), 0,
                                CompareCpuUserVsGame(recSpec.getGameName())));
                    }

                }

                else{
                    // mincpu와 Cpulist cpu 비교 result = mostsimilar
                    for(CpuList cpu : cpuLists){
                        if(recSpec.getCpu().toLowerCase().contains(cpu.getCpuName()) || cpu.getCpuName().toLowerCase().
                                contains(recSpec.getCpu())){
                            matchingCpu.add(cpu.getCpuName());
                        }
                    }
                    if(matchingCpu.size()==0){
                        //gamelist에서 추출한 mincpu와 cpulist에서 추출한 cpu중에 유사한것이 없을경우 rank가 가장 낮은 cpu add
                        matchingCpu.add(cpuListRepository.findByCpuRank(cpuLists.size()).getCpuName());
                    }

                    String[] cpuArray = matchingCpu.toArray(new String[matchingCpu.size()]);

                    String mostSimilar = "";
                    int maxSimilarity = 100;

                    for (String findCpuArray : cpuArray) {
                        int similarity = StringUtils.getLevenshteinDistance(recSpec.getCpu(), findCpuArray);
                        if (similarity < maxSimilarity) {
                            //System.out.println("findCpuArray: "+ findCpuArray);
                            maxSimilarity = similarity;
                            mostSimilar = findCpuArray;

                        }
                    }

                    //sorting이 너무 잘못된 경우
                    for(int i=2; i<=13; i++){
                        if(recSpec.getCpu().contains("i3-"+i) || recSpec.getCpu().contains("i3 "+i) && !mostSimilar.contains("i3-"+i)){
                            if(i<=7){
                                mostSimilar = "Intel Core i3-7350K @ 4.20GHz";break;
                            }
                            else if(i==8){
                                mostSimilar = "Intel Core i3-8350K @ 4.00GHz";break;
                            }
                            else if(i==9){
                                mostSimilar = "Intel Core i3-9350K @ 4.00GHz";break;
                            }
                            else if(i==10){
                                mostSimilar = "Intel Core i3-10325 @ 3.90GHz";break;
                            }
                            else if(i==11){
                                mostSimilar = "Intel Core i3-11100B @ 3.60GHz";break;
                            }
                            else if(i==12){
                                mostSimilar = "Intel Core i3-12300";break;
                            }
                            else{
                                mostSimilar = "Intel Core i3-13100F";break;
                            }

                        }
                        else if(recSpec.getCpu().contains("i5-"+i) || recSpec.getCpu().contains("i5 "+i) && !mostSimilar.contains("i5-"+i)){
                            if(i<=3){
                                mostSimilar = "Intel Core i5-3170K @ 3.20GHz";break;
                            }
                            else if(i==4){
                                mostSimilar = "Intel Core i5-4690K @ 3.50GHz";break;
                            }
                            else if(i==5){
                                mostSimilar = "Intel Core i5-5675C @ 3.10GHz";break;
                            }
                            else if(i==6){
                                mostSimilar = "Intel Core i5-6600K @ 3.50GHz";break;
                            }
                            else if(i==7){
                                mostSimilar = "Intel Core i5-7600K @ 3.80GHz";break;
                            }
                            else if(i==8){
                                mostSimilar = "Intel Core i5-8600K @ 3.60GHz";break;
                            }
                            else if(i==9){
                                mostSimilar = "Intel Core i5-9600KF @ 3.70GHz";break;
                            }
                            else if(i==10){
                                mostSimilar = "Intel Core i5-10600K @ 4.10GHz";break;
                            }
                            else if(i==11){
                                mostSimilar = "Intel Core i5-11500H @ 2.90GHz";break;
                            }
                            else if(i==12){
                                mostSimilar = "Intel Core i5-12400";break;
                            }
                            else{
                                mostSimilar = "Intel Core i5-13500H";break;
                            }
                        }
                        else if(recSpec.getCpu().contains("i7-"+i) || recSpec.getCpu().contains("i7 "+i) && !mostSimilar.contains("i7-"+i)){
                            if(i==2){
                                mostSimilar = "Intel Core i7-2700K @ 3.50GHz";break;
                            }
                            else if(i==3){
                                mostSimilar = "Intel Core i7-3960X @ 3.30GHz";break;
                            }
                            else if(i==4){
                                mostSimilar = "Intel Core i7-4960X @ 3.60GHz";break;
                            }
                            else if(i==5){
                                mostSimilar = "Intel Core i7-5960X @ 3.00GHz";break;
                            }
                            else if(i==6){
                                mostSimilar = "Intel Core i7-6900K @ 3.20GHz";break;
                            }
                            else if(i==7){
                                mostSimilar = "Intel Core i7-7800X @ 3.50GHz";break;
                            }
                            else if(i==8){
                                mostSimilar = "Intel Core i7-8700T @ 2.40GHz";break;
                            }
                            else if(i==9){
                                mostSimilar = "Intel Core i7-9700E @ 2.60GHz";break;
                            }
                            else if(i==10){
                                mostSimilar = "Intel Core i7-10700T @ 2.00GHz";break;
                            }
                            else if(i==11){
                                mostSimilar = "Intel Core i7-11700T @ 1.40GHz";break;
                            }
                            else if(i==12){
                                mostSimilar = "Intel Core i7-1270P";break;
                            }
                            else{
                                mostSimilar = "Intel Core i7-13800H";break;
                            }
                        }
                        else if(recSpec.getCpu().contains("core2") || recSpec.getCpu().contains("core 2") && !mostSimilar.contains("core2")){
                            mostSimilar = "Intel Core i3-7350K @ 4.20GHz";break;
                        }
                    }

                    //최소사양의 cpuRank get
                    int recCpuRank = cpuListRepository.findByCpuName(mostSimilar).getCpuRank();

                    // mincpu와 Cpulist cpu 비교 result = mostsimilar
                    for(GpuList gpu : gpuLists){
                        if(recSpec.getGpu().toLowerCase().contains(gpu.getGpuName().toLowerCase()) || gpu.getGpuName().toLowerCase().
                                contains(recSpec.getGpu().toLowerCase())){
                            matchingGpu.add(gpu.getGpuName());
                        }
                    }
                    if(matchingGpu.size()==0){
                        //gamelist에서 추출한 mincpu와 cpulist에서 추출한 cpu중에 유사한것이 없을경우 rank가 가장 낮은 cpu add
                        matchingGpu.add(gpuListRepository.findByGpuRank(gpuLists.size()).getGpuName());
                    }


                    String[] gpuArray = matchingGpu.toArray(new String[matchingGpu.size()]);

                    String mostSimilar2 = "";
                    int maxSimilarity2 = 100;

                    for (String findGpuArray : gpuArray) {
                        int similarity = StringUtils.getLevenshteinDistance(recSpec.getGpu(), findGpuArray);
                        if (similarity < maxSimilarity2) {
//                        System.out.println("findGpuArray: "+ findGpuArray);
                            maxSimilarity2 = similarity;
                            mostSimilar2 = findGpuArray;

                        }
                    }

                    //최소사양의 gpuRank get
                    int minGpuRank = gpuListRepository.findByGpuName(mostSimilar2).getGpuRank();

                    if(userCpuRank<=recCpuRank && userGpuRank<=minGpuRank && userRamSize>=recSpec.getRamSize()){
                        gameUserCompares.add(new gameUserCompare(recSpec.getGameName(), recSpec.getGameImg(), 1, 1));
                    }
                    else{
                        gameUserCompares.add(new gameUserCompare(recSpec.getGameName(), recSpec.getGameImg(), 0,
                                CompareCpuUserVsGame(recSpec.getGameName())));
                    }

                }

            }

        }

        // userInfo가 없을 경우
        else{
            for(getGameSpec recSpec : recSpecs){
                gameUserCompares.add(new gameUserCompare(recSpec.getGameName(), recSpec.getGameImg(), 2, 2));
            }
        }

        return gameUserCompares;

    }
}

