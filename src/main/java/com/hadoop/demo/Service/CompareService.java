package com.hadoop.demo.Service;

import com.hadoop.demo.Model.*;
import com.hadoop.demo.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import org.apache.commons.lang3.StringUtils;

@Service
public class CompareService {

    @Autowired
    private CpuListRepository cpuListRepository;
    @Autowired
    private GpuListRepository gpuListRepository;
    @Autowired
    private RamListRepository ramListRepository;
    @Autowired
    private UserInfoRepository userInfoRepository;

    public CpuList getMatchingCpu(String ipAddress){
        List<String> matchingCpu = new ArrayList<>();

        UserInfo userCpu = userInfoRepository.findByIpAddress(ipAddress);
        List<CpuList> cpulist = cpuListRepository.findAll();


        String findUserCpu = userCpu.getCpuInfo();

            for(CpuList cpu : cpulist){
                if(cpu.getCpuName().contains(findUserCpu) || findUserCpu.contains(cpu.getCpuName()))
                    matchingCpu.add(cpu.getCpuName());
            }

            String[] cpuArray = matchingCpu.toArray(new String[matchingCpu.size()]);

            String mostSimilar = "";
            int maxSimilarity = 100;

            for (String findCpuArray : cpuArray) {
                int similarity = StringUtils.getLevenshteinDistance(findUserCpu, findCpuArray);
                if (similarity < maxSimilarity) {
                    maxSimilarity = similarity;
                    mostSimilar = findCpuArray;
                }
            }

            System.out.println("Most similar CPU: " + mostSimilar);

            return cpuListRepository.findByCpuName(mostSimilar);
    }

    public GpuList getMatchingGpu(String ipAddress){
        List<String> matchingGpu = new ArrayList<>();

        UserInfo userGpu = userInfoRepository.findByIpAddress(ipAddress);
        List<GpuList> gpulist = gpuListRepository.findAll();

        String lastData = userGpu.getGpuInfo();

        for(GpuList gpu : gpulist){
            if(gpu.getGpuName().contains(lastData) || lastData.contains(gpu.getGpuName()))
                matchingGpu.add(gpu.getGpuName());
        }
//        if(matchingGpu.size()==0){
//            String gpuCpu = userGpu.get(userGpu.size() - 1).getCpuInfo();
//            for(GpuList gpu : gpulist){
//                if(gpu.getGpuName().contains(gpuCpu) || gpuCpu.contains(gpu.getGpuName()))
//                    matchingGpu.add(gpu.getGpuName());
//            }
//        }
        String[] gpuArray = matchingGpu.toArray(new String[matchingGpu.size()]);

        String mostSimilar = "";
        int maxSimilarity = 100;

        for (String findGpuArray : gpuArray) {
            int similarity = StringUtils.getLevenshteinDistance(lastData, findGpuArray);
            if (similarity < maxSimilarity) {
                maxSimilarity = similarity;
                mostSimilar = findGpuArray;
            }
        }

        System.out.println("Most similar GPU: " + mostSimilar);

        return gpuListRepository.findByGpuName(mostSimilar);
    }

    public RamList getMatchingRam(String ipAddress){
        List<String> matchingRam = new ArrayList<>();

        UserInfo userRam = userInfoRepository.findByIpAddress(ipAddress);
        List<RamList> ramList = ramListRepository.findAll();

        String lastData = userRam.getRamPartNum();

        for(RamList ram : ramList){
            if(ram.getRamName().contains(lastData) || lastData.contains(ram.getRamName()))
                matchingRam.add(ram.getRamName());
        }

        String[] ramArray = matchingRam.toArray(new String[matchingRam.size()]);

        String mostSimilar = "";
        int maxSimilarity = 100;

        for (String findRamArray : ramArray) {
            int similarity = StringUtils.getLevenshteinDistance(lastData, findRamArray);
            if (similarity < maxSimilarity) {
                maxSimilarity = similarity;
                mostSimilar = findRamArray;
            }
        }

        System.out.println("Most similar RAM: " + mostSimilar);

        return ramListRepository.findByRamName(mostSimilar);
    }

}
