package com.hadoop.demo.Service;

import com.hadoop.demo.Model.BottleNeck;
import com.hadoop.demo.Model.CpuList;
import com.hadoop.demo.Model.GpuList;
import com.hadoop.demo.Model.PopularList;
import com.hadoop.demo.Repository.BottleNeckRepository;
import com.hadoop.demo.Repository.CpuListRepository;
import com.hadoop.demo.Repository.GpuListRepository;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class BottleNeckService {

    @Autowired
    private BottleNeckRepository bottleNeckRepository;

    @Autowired
    private CpuListRepository cpuListRepository;

    @Autowired
    private GpuListRepository gpuListRepository;

    @Autowired
    private PopularListService popularListService;


    public BottleNeck save(BottleNeck bottleNeck) {
        return bottleNeckRepository.save(bottleNeck);
    }

    public List<BottleNeck> findAll() { return bottleNeckRepository.findAll();}

    public List<BottleNeck> findByCpuName(String name) {
        return bottleNeckRepository.findByCpuInfo(name);
    }

    public List<BottleNeck> findByGpuName(String name) {
        return bottleNeckRepository.findByGpuInfo(name);
    }

//    public BottleNeck searchByCpuInfoAndGpuInfo(String cpuInfo, String gpuInfo) {
//        return bottleNeckRepository.findByCpuInfoAndGpuInfo(cpuInfo, gpuInfo);
//    }

    public BottleNeck searchByCpuInfoAndGpuInfo(String cpuInfo, String gpuInfo) {

        List<PopularList> popularLists = popularListService.findAll();
        List<Integer> cpuMarkList = new ArrayList<>();
        List<Integer> gpuMarkList = new ArrayList<>();
        int selectedCpuMark = cpuListRepository.findByCpuName(cpuInfo).getCpuMark();
        int selectedGpuMark = gpuListRepository.findByGpuName(gpuInfo).getGpuMark();

        //선택한 cpu와 gpu가 보틀넥 리스트의 없을 경우
        //비슷한 cpu와 gpu를 찾아서 -- mark비교
        if(popularListService.findByCpuName(cpuInfo)==null || popularListService.findByGpuName(gpuInfo)==null){
            //인기 리스트 mark점수 저장
            for(PopularList p : popularLists){
                cpuMarkList.add(cpuListRepository.findByCpuName(p.getCpuName()).getCpuMark());
                if(!p.getGpuName().equals("")){
                    gpuMarkList.add(gpuListRepository.findByGpuName(p.getGpuName()).getGpuMark());
                }
            }
            String mostSimilarCpu = null;
            String mostSimilarGpu = null;
            int minDifference = Integer.MAX_VALUE;
            int minDifference2 = Integer.MAX_VALUE;

            //비교
            for (int cpuMark : cpuMarkList) {
                int difference = Math.abs(cpuMark - selectedCpuMark);
                if (difference < minDifference) {
                    minDifference = difference;
                    //mark점수가 같은경우가있음 popularlist안에 있어야함
                    List<CpuList> cpuLists =  cpuListRepository.findByCpuMark(cpuMark);
                    for(int i=0; i<cpuLists.size();i++){
                        if(popularListService.findByCpuName(cpuListRepository.findByCpuMark(cpuMark).get(i).getCpuName())!=null){
                            mostSimilarCpu = cpuListRepository.findByCpuMark(cpuMark).get(i).getCpuName();
                            break;
                        }
                    }
                    //System.out.println("mostSimilarCpu :"+ mostSimilarCpu);
                }
            }

            //비교
            for (int gpuMark : gpuMarkList) {
                int difference = Math.abs(gpuMark - selectedGpuMark);
                if (difference < minDifference2) {
                    minDifference2 = difference;

                    List<GpuList> gpuLists = gpuListRepository.findByGpuMark(gpuMark);
                    for(int i=0; i<gpuLists.size();i++){
                        if(popularListService.findByGpuName(gpuListRepository.findByGpuMark(gpuMark).get(i).getGpuName())!=null){
                            mostSimilarGpu = gpuListRepository.findByGpuMark(gpuMark).get(0).getGpuName();
                            break;
                        }
                    }

                    //System.out.println("mostSimilarGpu :"+ mostSimilarGpu);
                }
            }
            BottleNeck b = bottleNeckRepository.findByCpuInfoAndGpuInfo(mostSimilarCpu, mostSimilarGpu);
            b.setCpuInfo(cpuInfo);
            b.setGpuInfo(gpuInfo);
            //반환
            return b;

        }

        return bottleNeckRepository.findByCpuInfoAndGpuInfo(cpuInfo, gpuInfo);
    }

    @NoArgsConstructor
    @Getter
    @Setter
    public static class bottleNeckInfo implements Comparable<bottleNeckInfo>{
        private String info;
        private int mark;
        private double bottleNeckDiff;

        public bottleNeckInfo(String cpuName, int cpuMark, double diff) {
            this.info = cpuName;
            this.mark = cpuMark;
            this.bottleNeckDiff = diff;
        }



        @Override
        public int compareTo(bottleNeckInfo other) {
            return Integer.compare(this.mark, other.mark);
        }
    }


    // 벤치마크점수 + 보틀넥 점수
    public List<bottleNeckInfo> cpuMatchingGpuInfo(String cpuName){

        //60개
        List<BottleNeck> bottleNecks = bottleNeckRepository.findByCpuInfo(cpuName);
        List<bottleNeckInfo> bottleNeckInfos = new ArrayList<>();

        for(BottleNeck bottleNeck : bottleNecks){
            String gpuName = bottleNeck.getGpuInfo();
            int gpuBottleNeckValue = bottleNeck.getGpuBottleNeckValue();
            int cpuBottleNeckValue = bottleNeck.getCpuBottleNeckValue();
            double diff = Math.abs((cpuBottleNeckValue - gpuBottleNeckValue) / 10.0);
            int gpuMark = gpuListRepository.findByGpuName(gpuName).getGpuMark();
            bottleNeckInfos.add(new bottleNeckInfo(gpuName, gpuMark, diff));
        }
        Collections.sort(bottleNeckInfos);

        return bottleNeckInfos;
    }

    // 벤치마크점수 + 보틀넥 점수
    public List<bottleNeckInfo> gpuMatchingCpuInfo(String gpuName){

        //60개
        List<BottleNeck> bottleNecks = bottleNeckRepository.findByGpuInfo(gpuName);
        List<bottleNeckInfo> bottleNeckInfos = new ArrayList<>();

        for(BottleNeck bottleNeck : bottleNecks){
            String cpuName = bottleNeck.getCpuInfo();
            //System.out.println(cpuName);
            int cpuBottleNeckValue = bottleNeck.getCpuBottleNeckValue();
            int gpuBottleNeckValue = bottleNeck.getGpuBottleNeckValue();
            double diff = Math.abs((cpuBottleNeckValue - gpuBottleNeckValue) / 10.0);
            int cpuMark = cpuListRepository.findByCpuName(cpuName).getCpuMark();
            //System.out.println(diff);
            //System.out.println(cpuMark);
            bottleNeckInfos.add(new bottleNeckInfo(cpuName, cpuMark, diff));
        }
        Collections.sort(bottleNeckInfos);

        return bottleNeckInfos;
    }

}
