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
    private CpuDetailsService cpuDetailsService;
    @Autowired
    private GpuDetailsService gpuDetailsService;
    @Autowired
    private RamListRepository ramListRepository;
    @Autowired
    private UserInfoRepository userInfoRepository;


    public CpuDetails getMatchingCpu(String ipAddress){
        List<String> matchingCpu = new ArrayList<>();

        UserInfo userCpu = userInfoRepository.findByIpAddress(ipAddress);
        System.out.println("userCPu : " + userCpu);
        List<CpuDetails> cpulist = cpuDetailsService.findAll();

        String findUserCpu = userCpu.getCpuInfo();
        CpuDetails cpu1 = null;
        int flag=0;

        System.out.println("finduserCPu : " + findUserCpu);
        for(CpuDetails cpu : cpulist){
            if((cpu.getOtherName().contains(findUserCpu) || findUserCpu.contains(cpu.getOtherName()))){
                if(cpu.getOtherName().contains(",")){
                    String [] cpuNames = cpu.getOtherName().split(",");
                    for(int i=0; i<cpuNames.length; i++){
                        if(cpuNames[i].contains(findUserCpu) || findUserCpu.contains(cpuNames[i])){
                            matchingCpu.add(cpuNames[i]);
                            cpu1 = cpu;
                            flag++;
                            break;
                        }
                    }
                }
                else{
                    matchingCpu.add(cpu.getOtherName());
                }
                break;
            }
        }

        String[] cpuArray = matchingCpu.toArray(new String[matchingCpu.size()]);
        String mostSimilar = "";
        int maxSimilarity = 100;

        for(int i=0; i<cpuArray.length;i++){
            System.out.println("cpuArray : " + cpuArray[i]);
        }

        for (String findCpuArray : cpuArray) {
            int similarity = StringUtils.getLevenshteinDistance(findUserCpu, findCpuArray);
            if (similarity < maxSimilarity) {
                maxSimilarity = similarity;
                mostSimilar = findCpuArray;
            }
        }

        //System.out.println("mostSimilar :" + mostSimilar);
        //System.out.println("finalCPu :" + cpu1.getCpuName());
        if(flag>0){ mostSimilar = cpu1.getOtherName();}

        List<CpuDetails> filteredCpu = cpuDetailsService.findByOtherName(mostSimilar);
        List<String> cpu2 = new ArrayList<>();
        for(CpuDetails c : filteredCpu){
            cpu2.add(c.getCpuName());
        }

        String[] cpuArray2 = cpu2.toArray(new String[cpu2.size()]);
        String mostSimilar2 = "";
        int maxSimilarity2 = 100;

        for (String findCpuArray : cpuArray2) {
            int similarity2 = StringUtils.getLevenshteinDistance(findUserCpu, findCpuArray);
            if (similarity2 < maxSimilarity2) {
                maxSimilarity2 = similarity2;
                mostSimilar2 = findCpuArray;
            }
        }
            return cpuDetailsService.findByName(mostSimilar2);
    }

    public GpuDetails getMatchingGpu(String ipAddress){
        List<String> matchingGpu = new ArrayList<>();

        UserInfo userGpu = userInfoRepository.findByIpAddress(ipAddress);
        List<GpuDetails> gpulist = gpuDetailsService.findAll();

        String findUserGpu = userGpu.getGpuInfo();
        GpuDetails gpu1 = null;
        int flag=0;

        System.out.println("finduserGPu : " + findUserGpu);
        for(GpuDetails gpu : gpulist){
            if((gpu.getOtherName().contains(findUserGpu) || findUserGpu.contains(gpu.getOtherName()))){
                if(gpu.getOtherName().contains(",")){
                    String [] gpuNames = gpu.getOtherName().split(",");
                    for(int i=0; i<gpuNames.length; i++){
                        if(gpuNames[i].contains(findUserGpu) || findUserGpu.contains(gpuNames[i])){
                            matchingGpu.add(gpuNames[i]);
                            gpu1 = gpu;
                            flag++;
                            break;
                        }
                    }
                }
                else{
                    matchingGpu.add(gpu.getOtherName());
                }
                break;
            }
        }

        String[] gpuArray = matchingGpu.toArray(new String[matchingGpu.size()]);
        String mostSimilar = "";
        int maxSimilarity = 100;

        for(int i=0; i<gpuArray.length;i++){
            System.out.println("gpuArray : " + gpuArray[i]);
        }

        for (String findGpuArray : gpuArray) {
            int similarity = StringUtils.getLevenshteinDistance(findUserGpu, findGpuArray);
            if (similarity < maxSimilarity) {
                maxSimilarity = similarity;
                mostSimilar = findGpuArray;
            }
        }
        System.out.println("mostSimilar :" + mostSimilar);

        if(flag>0){ mostSimilar = gpu1.getOtherName();}

        List<GpuDetails> filteredGpu = gpuDetailsService.findByOtherName(mostSimilar);
        List<String> gpu2 = new ArrayList<>();
        for(GpuDetails g : filteredGpu){
            gpu2.add(g.getGpuName());
        }

        String[] gpuArray2 = gpu2.toArray(new String[gpu2.size()]);
        String mostSimilar2 = "";
        int maxSimilarity2 = 100;

        for (String findGpuArray : gpuArray2) {
            int similarity2 = StringUtils.getLevenshteinDistance(findUserGpu, findGpuArray);
            if (similarity2 < maxSimilarity2) {
                maxSimilarity2 = similarity2;
                mostSimilar2 = findGpuArray;
            }
        }
        return gpuDetailsService.findByName(mostSimilar2);
    }


    public RamList getMatchingRam(String ipAddress){
        List<String> matchingRam = new ArrayList<>();

        UserInfo userRam = userInfoRepository.findByIpAddress(ipAddress);
        List<RamList> ramList = ramListRepository.findAll();

        String lastData = userRam.getRamPartNum().replaceAll("\\(R\\)|\\(TM\\)|[™®]|(RAM)|", "");

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
