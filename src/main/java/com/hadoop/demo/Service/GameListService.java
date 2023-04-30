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
        // minCpu가 userCpu보다 rank가 높을경우 0(부적합) 낮을경우 1(적합)
        private int state;

    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class getGameMinSpec{

        private String gameName;
        private String minCpu;
        private String minGpu;
        private int minRamSize;

    }

    //gamelist min cpu 이름을 list에 담아 반환
    public List<getGameMinSpec> FindGameSpec(){

        List<GameList> gameList = gameListRepository.findAll();
        List<getGameMinSpec> minSpecs = new ArrayList<>();

        for(GameList list : gameList){
            if(list.getMinimumGameCpu1()!=null && list.getMinimumGameCpu2()!=null){

                if(list.getMinimumGameGpu1()!=null && list.getMinimumGameGpu2()!=null){
                    minSpecs.add(new getGameMinSpec(list.getGameName(), list.getMinimumGameCpu1(), list.getMinimumGameGpu1(), list.getMinimumGameRam()));
                }
                else if(list.getMinimumGameGpu1() != null){
                    minSpecs.add(new getGameMinSpec(list.getGameName(), list.getMinimumGameCpu1(), list.getMinimumGameGpu1(), list.getMinimumGameRam()));
                }
                else if(list.getMinimumGameGpu2() != null){
                    minSpecs.add(new getGameMinSpec(list.getGameName(), list.getMinimumGameCpu1(), list.getMinimumGameGpu2(), list.getMinimumGameRam()));
                }
                else{
                    minSpecs.add(new getGameMinSpec(list.getGameName(), list.getMinimumGameCpu1(), "", list.getMinimumGameRam()));
                }

            }
            else if(list.getMinimumGameCpu1() != null){

                if(list.getMinimumGameGpu1()!=null && list.getMinimumGameGpu2()!=null){
                    minSpecs.add(new getGameMinSpec(list.getGameName(), list.getMinimumGameCpu1(), list.getMinimumGameGpu1(), list.getMinimumGameRam()));
                }
                else if(list.getMinimumGameGpu1() != null){
                    minSpecs.add(new getGameMinSpec(list.getGameName(), list.getMinimumGameCpu1(), list.getMinimumGameGpu1(), list.getMinimumGameRam()));
                }
                else if(list.getMinimumGameGpu2() != null){
                    minSpecs.add(new getGameMinSpec(list.getGameName(), list.getMinimumGameCpu1(), list.getMinimumGameGpu2(), list.getMinimumGameRam()));
                }
                else{
                    minSpecs.add(new getGameMinSpec(list.getGameName(), list.getMinimumGameCpu1(), "", list.getMinimumGameRam()));
                }

            }
            else if(list.getMinimumGameCpu2() != null){

                if(list.getMinimumGameGpu1()!=null && list.getMinimumGameGpu2()!=null){
                    minSpecs.add(new getGameMinSpec(list.getGameName(), list.getMinimumGameCpu2(), list.getMinimumGameGpu1(), list.getMinimumGameRam()));
                }
                else if(list.getMinimumGameGpu1() != null){
                    minSpecs.add(new getGameMinSpec(list.getGameName(), list.getMinimumGameCpu2(), list.getMinimumGameGpu1(), list.getMinimumGameRam()));
                }
                else if(list.getMinimumGameGpu2() != null){
                    minSpecs.add(new getGameMinSpec(list.getGameName(), list.getMinimumGameCpu2(), list.getMinimumGameGpu2(), list.getMinimumGameRam()));
                }
                else{
                    minSpecs.add(new getGameMinSpec(list.getGameName(), list.getMinimumGameCpu2(), "", list.getMinimumGameRam()));
                }

            }
            else{

                if(list.getMinimumGameGpu1()!=null && list.getMinimumGameGpu2()!=null){
                    minSpecs.add(new getGameMinSpec(list.getGameName(), "", list.getMinimumGameGpu1(), list.getMinimumGameRam()));
                }
                else if(list.getMinimumGameGpu1() != null){
                    minSpecs.add(new getGameMinSpec(list.getGameName(), "", list.getMinimumGameGpu1(), list.getMinimumGameRam()));
                }
                else if(list.getMinimumGameGpu2() != null){
                    minSpecs.add(new getGameMinSpec(list.getGameName(), "", list.getMinimumGameGpu2(), list.getMinimumGameRam()));
                }
                else{
                    minSpecs.add(new getGameMinSpec(list.getGameName(), "", "", list.getMinimumGameRam()));
                }

            }

        }
        return minSpecs;
    }


    public List<gameUserCompare> CompareCpuUserVsGame(){  //gamelist의 cpu를 하나선택후 cpulist에서 유시한것 찾기

        List<gameUserCompare> gameUserCompares = new ArrayList<>();
        List<CpuList> cpuLists = cpuListRepository.findAll();
        List<GpuList> gpuLists = gpuListRepository.findAll();

        //gamelist에서 추출한 <gamename, mincpu> list
        List<getGameMinSpec> minSpecs = FindGameSpec();
        //
        List<String> matchingCpu = new ArrayList<>();
        List<String> matchingGpu = new ArrayList<>();

        if(userInfoService.Count()!=0){

            //userinfo 에 있는 cpu rank ramSize 반환
            int userCpuRank = compareService.getMatchingCpu().getCpuRank();
            int userGpuRank = compareService.getMatchingGpu().getGpuRank();
            int userRamSize = compareService.getMatchingRam().getRamSize();

            for(getGameMinSpec minSpec : minSpecs){
                //list에 있는 mincpu, gpu가 없을경우
                if(minSpec.getMinCpu().equals("") && minSpec.getMinGpu().equals("")){
                    gameUserCompares.add(new gameUserCompare(minSpec.getGameName(), 1));
                }
                // list에 mingpu가 없을경우
                else if(!minSpec.getMinCpu().equals("") && minSpec.getMinGpu().equals("")){
                    // mincpu와 Cpulist cpu 비교 result = mostsimilar
                    for(CpuList cpu : cpuLists){
                        if(minSpec.getMinCpu().toLowerCase().contains(cpu.getCpuName()) || cpu.getCpuName().toLowerCase().
                                contains(minSpec.getMinCpu())){
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
                        int similarity = StringUtils.getLevenshteinDistance(minSpec.getMinCpu(), findCpuArray);
                        if (similarity < maxSimilarity) {
                            //System.out.println("findCpuArray: "+ findCpuArray);
                            maxSimilarity = similarity;
                            mostSimilar = findCpuArray;

                        }
                    }

                    //sorting이 너무 잘못된 경우
                    for(int i=2; i<=13; i++){
                        if(minSpec.getMinCpu().contains("i3-"+i) || minSpec.getMinCpu().contains("i3 "+i) && !mostSimilar.contains("i3-"+i)){
                            if(i<=7){
                                mostSimilar = "Intel Core i3-7300 @ 4.00GHz";
                            }
                            else if(i==8){
                                mostSimilar = "Intel Core i3-8100T @ 3.10GHz";
                            }
                            else if(i==9){
                                mostSimilar = "Intel Core i3-9100T @ 3.10GHz";
                            }
                            else if(i==10){
                                mostSimilar = "Intel Core i3-1005G1 @ 1.20GHz";
                            }
                            else if(i==11){
                                mostSimilar = "Intel Core i3-1115G4E @ 3.00GHz";
                            }
                            else if(i==12){
                                mostSimilar = "Intel Core i3-1215UE";
                            }
                            else{
                                mostSimilar = "Intel Core i3-1315U";
                            }

                        }
                        else if(minSpec.getMinCpu().contains("i5-"+i) || minSpec.getMinCpu().contains("i5 "+i) && !mostSimilar.contains("i5-"+i)){
                            if(i<=3){
                                mostSimilar = "Intel Core i5-3570S @ 3.10GHz";
                            }
                            else if(i==4){
                                mostSimilar = "Intel Core i5-4460S @ 2.90GHz";
                            }
                            else if(i==5){
                                mostSimilar = "Intel Core i5-5575R @ 2.80GHz";
                            }
                            else if(i==6){
                                mostSimilar = "Intel Core i5-6442EQ @ 1.90GHz";
                            }
                            else if(i==7){
                                mostSimilar = "Intel Core i5-7400T @ 2.40GHz";
                            }
                            else if(i==8){
                                mostSimilar = "Intel Core i5-8365UE @ 1.60GHz";
                            }
                            else if(i==9){
                                mostSimilar = "Intel Core i5-9300HF @ 2.40GHz";
                            }
                            else if(i==10){
                                mostSimilar = "Intel Core i5-10210Y @ 1.00GHz";
                            }
                            else if(i==11){
                                mostSimilar = "Intel Core i5-1130G7 @ 1.10GHz";
                            }
                            else if(i==12){
                                mostSimilar = "Intel Core i5-1245UE";
                            }
                            else{
                                mostSimilar = "Intel Core i5-1335U";
                            }
                        }
                        else if(minSpec.getMinCpu().contains("i7-"+i) || minSpec.getMinCpu().contains("i7 "+i) && !mostSimilar.contains("i7-"+i)){
                            if(i==2){
                                mostSimilar = "Intel Core i7-2600S @ 2.80GHz";
                            }
                            else if(i==3){
                                mostSimilar = "Intel Core i7-3612QM @ 2.10GHz";
                            }
                            else if(i==4){
                                mostSimilar = "Intel Core i7-4770TE @ 2.30GHz";
                            }
                            else if(i==5){
                                mostSimilar = "Intel Core i7-5700EQ @ 2.60GHz";
                            }
                            else if(i==6){
                                mostSimilar = "Intel Core i7-6822EQ @ 2.00GHz";
                            }
                            else if(i==7){
                                mostSimilar = "Intel Core i7-7700HQ @ 2.80GHz";
                            }
                            else if(i==8){
                                mostSimilar = "Intel Core i7-8665UE @ 1.70GHz";
                            }
                            else if(i==9){
                                mostSimilar = "Intel Core i7-970 @ 3.20GHz";
                            }
                            else if(i==10){
                                mostSimilar = "Intel Core i7-10510Y @ 1.20GHz";
                            }
                            else if(i==11){
                                mostSimilar = "Intel Core i7-1180G7 @ 1.30GHz";
                            }
                            else if(i==12){
                                mostSimilar = "Intel Core i7-1265UE";
                            }
                            else{
                                mostSimilar = "Intel Core i7-1365U";
                            }
                        }
                        else if(minSpec.getMinCpu().contains("core2") || minSpec.getMinCpu().contains("core 2") && !mostSimilar.contains("core2")){
                            mostSimilar = "Intel Core i3-7300 @ 4.00GHz";
                        }
                    }

                    //최소사양의 cpuRank get
                    int minCpuRank = cpuListRepository.findByCpuName(mostSimilar).getCpuRank();

                    //비교
                    if(userCpuRank<=minCpuRank && userRamSize>=minSpec.getMinRamSize()){
                        gameUserCompares.add(new gameUserCompare(minSpec.getGameName(), 1));
                    }
                    else{
                        gameUserCompares.add(new gameUserCompare(minSpec.getGameName(), 0));
                    }

                }

                else if(minSpec.getMinCpu().equals("")){

                    // mincpu와 Cpulist cpu 비교 result = mostsimilar
                    for(GpuList gpu : gpuLists){
                        if(minSpec.getMinGpu().toLowerCase().contains(gpu.getGpuName().toLowerCase()) || gpu.getGpuName().toLowerCase().
                                contains(minSpec.getMinGpu().toLowerCase())){
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
                        int similarity = StringUtils.getLevenshteinDistance(minSpec.getMinGpu(), findGpuArray);
                        if (similarity < maxSimilarity) {
//                        System.out.println("findGpuArray: "+ findGpuArray);
                            maxSimilarity = similarity;
                            mostSimilar = findGpuArray;

                        }
                    }

                    //최소사양의 gpuRank get
                    int minGpuRank = gpuListRepository.findByGpuName(mostSimilar).getGpuRank();

                    //비교
                    if(userGpuRank<=minGpuRank && userRamSize>=minSpec.getMinRamSize()){
                        gameUserCompares.add(new gameUserCompare(minSpec.getGameName(), 1));
                    }
                    else{
                        gameUserCompares.add(new gameUserCompare(minSpec.getGameName(), 0));
                    }

                }

                else{
                    // mincpu와 Cpulist cpu 비교 result = mostsimilar
                    for(CpuList cpu : cpuLists){
                        if(minSpec.getMinCpu().toLowerCase().contains(cpu.getCpuName()) || cpu.getCpuName().toLowerCase().
                                contains(minSpec.getMinCpu())){
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
                        int similarity = StringUtils.getLevenshteinDistance(minSpec.getMinCpu(), findCpuArray);
                        if (similarity < maxSimilarity) {
                            //System.out.println("findCpuArray: "+ findCpuArray);
                            maxSimilarity = similarity;
                            mostSimilar = findCpuArray;

                        }
                    }

                    //sorting이 너무 잘못된 경우
                    for(int i=2; i<=13; i++){
                        if(minSpec.getMinCpu().contains("i3-"+i) || minSpec.getMinCpu().contains("i3 "+i) && !mostSimilar.contains("i3-"+i)){
                            if(i<=7){
                                mostSimilar = "Intel Core i3-7300 @ 4.00GHz";
                            }
                            else if(i==8){
                                mostSimilar = "Intel Core i3-8100T @ 3.10GHz";
                            }
                            else if(i==9){
                                mostSimilar = "Intel Core i3-9100T @ 3.10GHz";
                            }
                            else if(i==10){
                                mostSimilar = "Intel Core i3-1005G1 @ 1.20GHz";
                            }
                            else if(i==11){
                                mostSimilar = "Intel Core i3-1115G4E @ 3.00GHz";
                            }
                            else if(i==12){
                                mostSimilar = "Intel Core i3-1215UE";
                            }
                            else{
                                mostSimilar = "Intel Core i3-1315U";
                            }

                        }
                        else if(minSpec.getMinCpu().contains("i5-"+i) || minSpec.getMinCpu().contains("i5 "+i)&& !mostSimilar.contains("i5-"+i)){
                            if(i<=3){
                                mostSimilar = "Intel Core i5-3570S @ 3.10GHz";
                            }
                            else if(i==4){
                                mostSimilar = "Intel Core i5-4460S @ 2.90GHz";
                            }
                            else if(i==5){
                                mostSimilar = "Intel Core i5-5575R @ 2.80GHz";
                            }
                            else if(i==6){
                                mostSimilar = "Intel Core i5-6442EQ @ 1.90GHz";
                            }
                            else if(i==7){
                                mostSimilar = "Intel Core i5-7400T @ 2.40GHz";
                            }
                            else if(i==8){
                                mostSimilar = "Intel Core i5-8365UE @ 1.60GHz";
                            }
                            else if(i==9){
                                mostSimilar = "Intel Core i5-9300HF @ 2.40GHz";
                            }
                            else if(i==10){
                                mostSimilar = "Intel Core i5-10210Y @ 1.00GHz";
                            }
                            else if(i==11){
                                mostSimilar = "Intel Core i5-1130G7 @ 1.10GHz";
                            }
                            else if(i==12){
                                mostSimilar = "Intel Core i5-1245UE";
                            }
                            else{
                                mostSimilar = "Intel Core i5-1335U";
                            }
                        }
                        else if(minSpec.getMinCpu().contains("i7-"+i) || minSpec.getMinCpu().contains("i7 "+i)&& !mostSimilar.contains("i7-"+i)){
                            if(i==2){
                                mostSimilar = "Intel Core i7-2600S @ 2.80GHz";
                            }
                            else if(i==3){
                                mostSimilar = "Intel Core i7-3612QM @ 2.10GHz";
                            }
                            else if(i==4){
                                mostSimilar = "Intel Core i7-4770TE @ 2.30GHz";
                            }
                            else if(i==5){
                                mostSimilar = "Intel Core i7-5700EQ @ 2.60GHz";
                            }
                            else if(i==6){
                                mostSimilar = "Intel Core i7-6822EQ @ 2.00GHz";
                            }
                            else if(i==7){
                                mostSimilar = "Intel Core i7-7700HQ @ 2.80GHz";
                            }
                            else if(i==8){
                                mostSimilar = "Intel Core i7-8665UE @ 1.70GHz";
                            }
                            else if(i==9){
                                mostSimilar = "Intel Core i7-970 @ 3.20GHz";
                            }
                            else if(i==10){
                                mostSimilar = "Intel Core i7-10510Y @ 1.20GHz";
                            }
                            else if(i==11){
                                mostSimilar = "Intel Core i7-1180G7 @ 1.30GHz";
                            }
                            else if(i==12){
                                mostSimilar = "Intel Core i7-1265UE";
                            }
                            else{
                                mostSimilar = "Intel Core i7-1365U";
                            }
                        }
                        else if(minSpec.getMinCpu().contains("core2") || minSpec.getMinCpu().contains("core 2") && !mostSimilar.contains("core2")){
                            mostSimilar = "Intel Core i3-7300 @ 4.00GHz";
                        }
                    }

                    //최소사양의 cpuRank get
                    int minCpuRank = cpuListRepository.findByCpuName(mostSimilar).getCpuRank();

                    // mincpu와 Cpulist cpu 비교 result = mostsimilar
                    for(GpuList gpu : gpuLists){
                        if(minSpec.getMinGpu().toLowerCase().contains(gpu.getGpuName().toLowerCase()) || gpu.getGpuName().toLowerCase().
                                contains(minSpec.getMinGpu().toLowerCase())){
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
                        int similarity = StringUtils.getLevenshteinDistance(minSpec.getMinGpu(), findGpuArray);
                        if (similarity < maxSimilarity2) {
//                        System.out.println("findGpuArray: "+ findGpuArray);
                            maxSimilarity2 = similarity;
                            mostSimilar2 = findGpuArray;

                        }
                    }

                    //최소사양의 gpuRank get
                    int minGpuRank = gpuListRepository.findByGpuName(mostSimilar2).getGpuRank();

                    if(userCpuRank<=minCpuRank && userGpuRank<=minGpuRank && userRamSize>=minSpec.getMinRamSize()){
                        gameUserCompares.add(new gameUserCompare(minSpec.getGameName(), 1));
                    }
                    else{
                        gameUserCompares.add(new gameUserCompare(minSpec.getGameName(), 0));
                    }

                }

            }

        }

        // userInfo가 없을 경우
        else{
            for(getGameMinSpec minSpec : minSpecs){
                gameUserCompares.add(new gameUserCompare(minSpec.getGameName(), 2));
            }
        }

        return gameUserCompares;

    }

}
