package com.hadoop.demo.Service;

import com.hadoop.demo.Model.CpuList;
import com.hadoop.demo.Model.UserInfo;
import com.hadoop.demo.Repository.CpuListRepository;
import com.hadoop.demo.Repository.UserInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.apache.commons.lang3.StringUtils;

@Service
public class CompareService {

    @Autowired
    private CpuListRepository cpuListRepository;

    @Autowired
    private UserInfoRepository userInfoRepository;

    public CpuList getMatchingCpu(){
        List<String> matchingCpu = new ArrayList<>();

        List<CpuList> cpulist = cpuListRepository.findAll();
        List<UserInfo> userCpu = userInfoRepository.findAll();

        String lastData = userCpu.get(userCpu.size() - 1).getCpuInfo();

        for(CpuList cpu : cpulist){
            if(cpu.getCpu_name().contains(lastData) || lastData.contains(cpu.getCpu_name()))
                matchingCpu.add(cpu.getCpu_name());
        }

        String[] cpuArray = matchingCpu.toArray(new String[matchingCpu.size()]);

        String mostSimilar = "";
        int maxSimilarity = 100;

        for (String findCpuArray : cpuArray) {
            int similarity = StringUtils.getLevenshteinDistance(lastData, findCpuArray);
            if (similarity < maxSimilarity) {
                maxSimilarity = similarity;
                mostSimilar = findCpuArray;
            }
        }

        System.out.println("Most similar string: " + mostSimilar);

        Optional<CpuList> optionalFindCpu =  cpuListRepository.findById(mostSimilar);
        CpuList findCpu = optionalFindCpu.orElse(null);
        if (findCpu != null) {
            String cpuString = findCpu.getCpu_name();
            System.out.println(cpuString);
            System.out.println(findCpu.getCpu_id());
            System.out.println(findCpu.getCpu_mark());
            System.out.println(findCpu.getCpu_rank());
        } else {
            System.out.println("CPU not found!");
        }

        return findCpu;
    }



}
