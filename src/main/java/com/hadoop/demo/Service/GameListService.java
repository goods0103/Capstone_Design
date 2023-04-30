package com.hadoop.demo.Service;

import com.hadoop.demo.Model.CpuList;
import com.hadoop.demo.Model.GameList;
import com.hadoop.demo.Model.GpuList;
import com.hadoop.demo.Model.UserInfo;
import com.hadoop.demo.Repository.CpuListRepository;
import com.hadoop.demo.Repository.GameListRepository;
import com.hadoop.demo.Repository.GpuListRepository;
import com.hadoop.demo.Repository.UserInfoRepository;
import lombok.*;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
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

    }

    //gamelist min cpu 이름을 list에 담아 반환
    public List<getGameMinSpec> FindGameSpec(){

        List<GameList> gameList = gameListRepository.findAll();
        List<getGameMinSpec> minSpecs = new ArrayList<>();

        for(GameList list : gameList){
            if(list.getMinimumGameCpu1()!=null && list.getMinimumGameCpu2()!=null){

                if(list.getMinimumGameGpu1()!=null && list.getMinimumGameGpu2()!=null){
                    minSpecs.add(new getGameMinSpec(list.getGameName(), list.getMinimumGameCpu1(), list.getMinimumGameGpu1()));
                }
                else if(list.getMinimumGameGpu1() != null){
                    minSpecs.add(new getGameMinSpec(list.getGameName(), list.getMinimumGameCpu1(), list.getMinimumGameGpu1()));
                }
                else if(list.getMinimumGameGpu2() != null){
                    minSpecs.add(new getGameMinSpec(list.getGameName(), list.getMinimumGameCpu1(), list.getMinimumGameGpu2()));
                }
                else{
                    minSpecs.add(new getGameMinSpec(list.getGameName(), list.getMinimumGameCpu1(), ""));
                }

            }
            else if(list.getMinimumGameCpu1() != null){

                if(list.getMinimumGameGpu1()!=null && list.getMinimumGameGpu2()!=null){
                    minSpecs.add(new getGameMinSpec(list.getGameName(), list.getMinimumGameCpu1(), list.getMinimumGameGpu1()));
                }
                else if(list.getMinimumGameGpu1() != null){
                    minSpecs.add(new getGameMinSpec(list.getGameName(), list.getMinimumGameCpu1(), list.getMinimumGameGpu1()));
                }
                else if(list.getMinimumGameGpu2() != null){
                    minSpecs.add(new getGameMinSpec(list.getGameName(), list.getMinimumGameCpu1(), list.getMinimumGameGpu2()));
                }
                else{
                    minSpecs.add(new getGameMinSpec(list.getGameName(), list.getMinimumGameCpu1(), ""));
                }

            }
            else if(list.getMinimumGameCpu2() != null){

                if(list.getMinimumGameGpu1()!=null && list.getMinimumGameGpu2()!=null){
                    minSpecs.add(new getGameMinSpec(list.getGameName(), list.getMinimumGameCpu2(), list.getMinimumGameGpu1()));
                }
                else if(list.getMinimumGameGpu1() != null){
                    minSpecs.add(new getGameMinSpec(list.getGameName(), list.getMinimumGameCpu2(), list.getMinimumGameGpu1()));
                }
                else if(list.getMinimumGameGpu2() != null){
                    minSpecs.add(new getGameMinSpec(list.getGameName(), list.getMinimumGameCpu2(), list.getMinimumGameGpu2()));
                }
                else{
                    minSpecs.add(new getGameMinSpec(list.getGameName(), list.getMinimumGameCpu2(), ""));
                }

            }
            else{

                if(list.getMinimumGameGpu1()!=null && list.getMinimumGameGpu2()!=null){
                    minSpecs.add(new getGameMinSpec(list.getGameName(), "", list.getMinimumGameGpu1()));
                }
                else if(list.getMinimumGameGpu1() != null){
                    minSpecs.add(new getGameMinSpec(list.getGameName(), "", list.getMinimumGameGpu1()));
                }
                else if(list.getMinimumGameGpu2() != null){
                    minSpecs.add(new getGameMinSpec(list.getGameName(), "", list.getMinimumGameGpu2()));
                }
                else{
                    minSpecs.add(new getGameMinSpec(list.getGameName(), "", ""));
                }

            }

        }
        return minSpecs;
    }


    public List<gameUserCompare> CompareCpuUserVsGame(){  //gamelist의 cpu를 하나선택후 cpulist에서 유시한것 찾기

        List<gameUserCompare> gameUserCompares = new ArrayList<>();
        List<CpuList> cpuLists = cpuListRepository.findAll();
        List<GpuList> gpuLists = gpuListRepository.findAll();


        //userinfo 에 있는 cpu rank 반환
        int userCpuRank = compareService.getMatchingCpu().getCpuRank();
        int userGpuRank = compareService.getMatchingGpu().getGpuRank();

        //gamelist에서 추출한 <gamename, mincpu> list
        List<getGameMinSpec> minSpecs = FindGameSpec();

        //
        List<String> matchingCpu = new ArrayList<>();
        List<String> matchingGpu = new ArrayList<>();

        //
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
                if(minSpec.getMinCpu().contains("i3") && !mostSimilar.contains("i3")){
                    mostSimilar = "Intel Core i3-7300 @ 4.00GHz";
                }
                else if(minSpec.getMinCpu().contains("i5") && !mostSimilar.contains("i5")){
                    mostSimilar = "Intel Core i5-4460S @ 2.90GHz";
                }
                else if(minSpec.getMinCpu().contains("i7") && !mostSimilar.contains("i7")){
                    mostSimilar = "Intel Core i7-4770TE @ 2.30GHz";
                }


                //최소사양의 cpuRank get
                int minCpuRank = cpuListRepository.findByCpuName(mostSimilar).getCpuRank();

//                System.out.println("minCPu : " + minSpec.getMinCpu());
//                System.out.println("similarCpu : " + cpuListRepository.findByCpuName(mostSimilar).getCpuName());
//                System.out.println("minCpuRank : " + minCpuRank);
//                System.out.println("UserCpuRank : " + userCpuRank);
//                System.out.println("-----------------------------------------------");

                //비교
                if(userCpuRank<=minCpuRank){
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

                //sorting이 너무 잘못된 경우


                //최소사양의 gpuRank get
                int minGpuRank = gpuListRepository.findByGpuName(mostSimilar).getGpuRank();

//                System.out.println("minGPu : " + minSpec.getMinGpu());
//                System.out.println("similarGpu : " + gpuListRepository.findByGpuName(mostSimilar).getGpuName());
//                System.out.println("minGpuRank : " + minGpuRank);
//                System.out.println("UserGpuRank : " + userGpuRank);
//                System.out.println("-----------------------------------------------");

                //비교
                if(userGpuRank<=minGpuRank){
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
                if(minSpec.getMinCpu().contains("i3") && !mostSimilar.contains("i3")){
                    mostSimilar = "Intel Core i3-7300 @ 4.00GHz";
                }
                else if(minSpec.getMinCpu().contains("i5") && !mostSimilar.contains("i5")){
                    mostSimilar = "Intel Core i5-4460S @ 2.90GHz";
                }
                else if(minSpec.getMinCpu().contains("i7") && !mostSimilar.contains("i7")){
                    mostSimilar = "Intel Core i7-4770TE @ 2.30GHz";
                }


                //최소사양의 cpuRank get
                int minCpuRank = cpuListRepository.findByCpuName(mostSimilar).getCpuRank();

//                System.out.println("minCPu : " + minSpec.getMinCpu());
//                System.out.println("similarCpu : " + cpuListRepository.findByCpuName(mostSimilar).getCpuName());
//                System.out.println("minCpuRank : " + minCpuRank);
//                System.out.println("UserCpuRank : " + userCpuRank);


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

                //sorting이 너무 잘못된 경우


                //최소사양의 gpuRank get
                int minGpuRank = gpuListRepository.findByGpuName(mostSimilar2).getGpuRank();

//                System.out.println("minGPu : " + minSpec.getMinGpu());
//                System.out.println("similarGpu : " + gpuListRepository.findByGpuName(mostSimilar2).getGpuName());
//                System.out.println("minGpuRank : " + minGpuRank);
//                System.out.println("UserGpuRank : " + userGpuRank);
//                System.out.println("-----------------------------------------------");

                if(userCpuRank<=minCpuRank && userGpuRank<=minGpuRank){
                    gameUserCompares.add(new gameUserCompare(minSpec.getGameName(), 1));
                }
                else{
                    gameUserCompares.add(new gameUserCompare(minSpec.getGameName(), 0));
                }

            }

        }

        return gameUserCompares;

    }

}
