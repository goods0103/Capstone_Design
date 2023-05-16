package com.hadoop.demo.Service;

import com.hadoop.demo.Model.BottleNeck;
import com.hadoop.demo.Repository.BottleNeckRepository;
import com.hadoop.demo.Repository.CpuListRepository;
import com.hadoop.demo.Repository.GpuListRepository;
import lombok.AllArgsConstructor;
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

    public BottleNeck searchByCpuInfoAndGpuInfo(String cpuInfo, String gpuInfo) { return bottleNeckRepository.findByCpuInfoAndGpuInfo(cpuInfo, gpuInfo);}

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    public static class bottleNeckInfo implements Comparable<bottleNeckInfo>{
        private String cpuName;
        private String gpuName;
        private int mark;
        private int bottleNeckDiff;

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
            int diff = Math.abs(cpuBottleNeckValue-gpuBottleNeckValue);
            int gpuMark = gpuListRepository.findByGpuName(gpuName).getGpuMark();
            bottleNeckInfos.add(new bottleNeckInfo(cpuName, gpuName, gpuMark, diff));
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
            int cpuBottleNeckValue = bottleNeck.getCpuBottleNeckValue();
            int gpuBottleNeckValue = bottleNeck.getGpuBottleNeckValue();
            int diff = Math.abs(cpuBottleNeckValue-gpuBottleNeckValue);
            int cpuMark = cpuListRepository.findByCpuName(cpuName).getCpuMark();
            bottleNeckInfos.add(new bottleNeckInfo(gpuName, cpuName, cpuMark, diff));
        }
        Collections.sort(bottleNeckInfos);

        return bottleNeckInfos;
    }

}
