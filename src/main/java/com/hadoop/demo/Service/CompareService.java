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


    public String getMatchingCpu(String ipAddress){
        List<String> matchingCpu = new ArrayList<>();
        List<String> matchingCpu2 = new ArrayList<>();

        UserInfo userCpu = userInfoRepository.findByIpAddress(ipAddress);
        if(userCpu.getCpuInfo().equals("none"))
            return "none";
        List<CpuDetails> cpulist = cpuDetailsService.findAll();

        String findUserCpu = userCpu.getCpuInfo();
        int flag = 0;
        String exceptionCpu = null;
        String similarCpu = null;

        //System.out.println("finduserCPu : " + findUserCpu);
        for(CpuDetails cpu : cpulist){
            if((cpu.getOtherName().contains(findUserCpu) || findUserCpu.contains(cpu.getOtherName()))){
                if(cpu.getOtherName().contains(",")){
                    matchingCpu2.add(cpu.getOtherName());
                    flag++;
                }
                else{
                    matchingCpu.add(cpu.getOtherName());
                }
            }
        }
        // ,로 구분된 othername을 통해 유사한 cpu를 찾아야하는 경우
        if(flag>0){
            List<String> matchingCpu3 = new ArrayList<>();
            for(String cpu : matchingCpu2){
                List<CpuDetails> cpuDetails = cpuDetailsService.findByOtherName(cpu);
                for(CpuDetails cpu3 : cpuDetails){
                    matchingCpu3.add(cpu3.getCpuName());
                    //System.out.println("other name case cpus :" + cpu3.getCpuName());
                }
            }
            String[] cpuArray = matchingCpu3.toArray(new String[matchingCpu3.size()]);
            String mostSimilar = "";
            int maxSimilarity = 100;

            for (String findCpuArray : cpuArray) {
                int similarity = StringUtils.getLevenshteinDistance(findUserCpu, findCpuArray);
                if (similarity < maxSimilarity) {
                    maxSimilarity = similarity;
                    mostSimilar = findCpuArray;
                }
            }

            //System.out.println("other name case cpus mostSimilar :" + mostSimilar);

            exceptionCpu = cpuDetailsService.findByName(mostSimilar).getCpuName();
            // return cpuDetailsService.findByName(mostSimilar).getCpuName();
        }

        if(matchingCpu.size() == 0 && matchingCpu2.size() == 0) {
            System.out.println("No matched CPU");
            return "none";
        }

        if(matchingCpu.size()>0){

            String[] cpuArray = matchingCpu.toArray(new String[matchingCpu.size()]);
            String mostSimilar = "";
            int maxSimilarity1 = 100;

//            for(int i=0; i<cpuArray.length;i++){
//                System.out.println("cpuArray : " + cpuArray[i]);
//            }

            for (String findCpuArray : cpuArray) {
                int similarity = StringUtils.getLevenshteinDistance(findUserCpu, findCpuArray);
                if (similarity < maxSimilarity1) {
                    maxSimilarity1 = similarity;
                    mostSimilar = findCpuArray;
                }
            }

            //System.out.println("mostSimilar :" + mostSimilar);
            //System.out.println("finalCPu :");

            List<CpuDetails> filteredCpu = cpuDetailsService.findByOtherName(mostSimilar);
            List<String> cpu2 = new ArrayList<>();
            for(CpuDetails c : filteredCpu){
                cpu2.add(c.getCpuName());
                //System.out.println("cpu2: "+ c.getCpuName());
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
            //System.out.println("mostSimilar2 :" + mostSimilar2);

            similarCpu = cpuDetailsService.findByName(mostSimilar2).getCpuName();

        }

        //ohtername에 ,가 있는 경우
        if(flag>0){
            String [] finalCpuArray = new String[2];
            String mostSimilar3 = "";
            int maxSimilarity3 = 100;


            if(matchingCpu.size()>0){
                finalCpuArray[0] = exceptionCpu;
                finalCpuArray[1] = similarCpu;
            }
            else{
                return exceptionCpu;
            }

            for (String findCpuArray : finalCpuArray) {
                int similarity3 = StringUtils.getLevenshteinDistance(findUserCpu, findCpuArray);
                if (similarity3 < maxSimilarity3) {
                    maxSimilarity3 = similarity3;
                    mostSimilar3 = findCpuArray;
                }
            }

            //System.out.println("final cpu : " + mostSimilar3);
            return cpuDetailsService.findByName(mostSimilar3).getCpuName();
        }

        return similarCpu;
    }

    public String getMatchingGpu(String ipAddress){
        List<String> matchingGpu = new ArrayList<>();
        List<String> matchingGpu2 = new ArrayList<>();

        UserInfo userGpu = userInfoRepository.findByIpAddress(ipAddress);
        if(userGpu.getGpuInfo().equals("none"))
            return "none";
        List<GpuDetails> gpulist = gpuDetailsService.findAll();

        String findUserGpu = userGpu.getGpuInfo();
        int flag =0;
        String exceptionGpu = null;
        String similarGpu = null;

        //System.out.println("finduserGPu : " + findUserGpu);
        for(GpuDetails gpu : gpulist){
            if(gpu.getOtherName().contains(findUserGpu) || findUserGpu.contains(gpu.getOtherName())){
                if(gpu.getOtherName().contains(",")){
                      matchingGpu2.add(gpu.getOtherName());
                      flag++;
                }
                else{
                    matchingGpu.add(gpu.getOtherName());
                }
            }
        }

        // ,로 구분된 othername을 통해 유사한 cpu를 찾아야하는 경우
        if(flag>0){
            List<String> matchingGpu3 = new ArrayList<>();
            for(String gpu : matchingGpu2){
                List<GpuDetails> gpuDetails = gpuDetailsService.findByOtherName(gpu);
                for(GpuDetails gpu3 : gpuDetails){
                    matchingGpu3.add(gpu3.getGpuName());
                    //System.out.println("other name case gpus :" + gpu3.getGpuName());
                }
            }
            String[] gpuArray = matchingGpu3.toArray(new String[matchingGpu3.size()]);
            String mostSimilar = "";
            int maxSimilarity = 100;

            for (String findGpuArray : gpuArray) {
                int similarity = StringUtils.getLevenshteinDistance(findUserGpu, findGpuArray);
                if (similarity < maxSimilarity) {
                    maxSimilarity = similarity;
                    mostSimilar = findGpuArray;
                }
            }

            //System.out.println("other name case gpus mostSimilar :" + mostSimilar);

            exceptionGpu = gpuDetailsService.findByName(mostSimilar).getGpuName();
            //return gpuDetailsService.findByName(mostSimilar).getGpuName();
        }

        if(matchingGpu.size() == 0 && matchingGpu2.size() == 0) {
            System.out.println("No matched GPU");
            return "none";
        }

        if(matchingGpu.size()>0){

            String[] gpuArray = matchingGpu.toArray(new String[matchingGpu.size()]);
            String mostSimilar = "";
            int maxSimilarity1 = 100;

            for (String findGpuArray : gpuArray) {
                int similarity = StringUtils.getLevenshteinDistance(findUserGpu, findGpuArray);
                if (similarity < maxSimilarity1) {
                    maxSimilarity1 = similarity;
                    mostSimilar = findGpuArray;
                }
            }

            //System.out.println("mostSimilar :" + mostSimilar);

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

            //System.out.println("mostSimilar2 :" + mostSimilar2);

            similarGpu = gpuDetailsService.findByName(mostSimilar2).getGpuName();
        }

        //ohtername에 ,가 있는 경우
        if(flag>0){
            String [] finalGpuArray = new String[2];
            String mostSimilar3 = "";
            int maxSimilarity3 = 100;

            if(matchingGpu.size()>0){
                finalGpuArray[0] = exceptionGpu;
                finalGpuArray[1] = similarGpu;
            }
            else{
                return  exceptionGpu;
            }

            for (String findGpuArray : finalGpuArray) {
                int similarity3 = StringUtils.getLevenshteinDistance(findUserGpu, findGpuArray);
                if (similarity3 < maxSimilarity3) {
                    maxSimilarity3 = similarity3;
                    mostSimilar3 = findGpuArray;
                }
            }

            //System.out.println("final gpu : " + mostSimilar3);
            return gpuDetailsService.findByName(mostSimilar3).getGpuName();
        }

        return similarGpu;
    }


    public String getMatchingRam(String ipAddress){
        List<String> matchingRam = new ArrayList<>();

        UserInfo userRam = userInfoRepository.findByIpAddress(ipAddress);
        if(userRam.getRamPartNum().equals("none")){
            System.out.println("none");
            return "none";
        }
        List<RamList> ramList = ramListRepository.findAll();

        String lastData = userRam.getRamPartNum().replaceAll("\\(R\\)|\\(TM\\)|[™®]|(RAM)|", "");

        for(RamList ram : ramList){
            if(ram.getRamName().contains(lastData) || lastData.contains(ram.getRamName()))
                matchingRam.add(ram.getRamName());
        }

        if(matchingRam.size() == 0) {
            System.out.println("No matched Ram");
            return "none";
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

        //System.out.println("Most similar RAM: " + mostSimilar);

        return ramListRepository.findByRamName(mostSimilar).getRamName();
    }

}
