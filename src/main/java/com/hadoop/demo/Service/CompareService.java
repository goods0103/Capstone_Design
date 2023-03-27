package com.hadoop.demo.Service;

import com.hadoop.demo.Model.CpuList;
import com.hadoop.demo.Model.UserInfo;
import com.hadoop.demo.Repository.CpuListRepository;
import com.hadoop.demo.Repository.UserInfoRepository;
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
    private UserInfoRepository userInfoRepository;

    public CpuList getMatchingCpu(){
        List<String> matchingCpu = new ArrayList<>();

        List<CpuList> cpulist = cpuListRepository.findAll();
        List<UserInfo> userCpu = userInfoRepository.findAll();

        String lastData = userCpu.get(userCpu.size() - 1).getCpuInfo();

        for(CpuList cpu : cpulist){
            if(cpu.getCpuName().contains(lastData) || lastData.contains(cpu.getCpuName()))
                matchingCpu.add(cpu.getCpuName());
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


        return cpuListRepository.findByCpuName(mostSimilar);
    }



}
