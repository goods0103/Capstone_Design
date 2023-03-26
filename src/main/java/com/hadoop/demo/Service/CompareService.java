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

    public String getMatchingCpu(){
        List<String> matchingCpu = new ArrayList<>();

        List<CpuList> cpulist = cpuListRepository.findAll();
        List<UserInfo> usercpu = userInfoRepository.findAll();

        String findcpu ="";
        for(CpuList cpu1 : cpulist){
            for(UserInfo cpu2 : usercpu){
                if(cpu1.getCpu_name().contains(cpu2.getCpuInfo()) || cpu2.getCpuInfo().contains(cpu1.getCpu_name())){
                    matchingCpu.add(cpu1.getCpu_name());
                    findcpu = cpu2.getCpuInfo();
                    break;
                }
            }
        }

//        System.out.println("findcpu : " + findcpu);
//        System.out.println(matchingCpu);
        String[] cpuArray = matchingCpu.toArray(new String[matchingCpu.size()]);


        String mostSimilar = "";
        int maxSimilarity = -1;

        for (String findcpuArray : cpuArray) {
            int similarity = StringUtils.getLevenshteinDistance(findcpu, findcpuArray);
            System.out.println(findcpuArray);
            System.out.println(similarity);
            if (similarity < maxSimilarity) {
                maxSimilarity = similarity;
                mostSimilar = findcpuArray;
            }
        }
        System.out.println("Most similar string: " + mostSimilar);



        return mostSimilar;
    }



}
