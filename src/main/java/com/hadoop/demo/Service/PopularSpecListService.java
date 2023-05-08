package com.hadoop.demo.Service;

import com.hadoop.demo.Model.CpuList;
import com.hadoop.demo.Model.GpuList;
import com.hadoop.demo.Model.PopularList;
import com.hadoop.demo.Repository.CpuListRepository;
import com.hadoop.demo.Repository.GpuListRepository;
import com.hadoop.demo.Repository.PopularListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PopularSpecListService {

    @Autowired
    private CpuListRepository cpuListRepository;
    @Autowired
    private GpuListRepository gpuListRepository;
    @Autowired
    private PopularListRepository popularListRepository;

    public List<CpuList> searchSelectCpuByPopular(int cpuId) {

        int flag = 0;
        List<CpuList> popularCpuList = new ArrayList<>();
        List<String> popularCpu = new ArrayList<>();

        for(int i=1; i<=10; i++) {
            String name = popularListRepository.findById(i).getCpuName();
            popularCpu.add(name);
            if(name.equals(cpuListRepository.findByCpuId(cpuId).getCpuName()))
                flag = 1;
        }
        if(flag == 0)
            popularCpu.add(cpuListRepository.findByCpuId(cpuId).getCpuName());

        for(String cpu : popularCpu)
            popularCpuList.add(cpuListRepository.findByCpuName(cpu));

        return popularCpuList;
    }

    public List<GpuList> searchSelectGpuByPopular(int gpuId) {

        int flag = 0;
        List<GpuList> popularGpuList = new ArrayList<>();
        List<String> popularGpu = new ArrayList<>();

        for(int i=1; i<=10; i++) {
            String name = popularListRepository.findById(i).getGpuName();
            popularGpu.add(name);
            if(name.equals(gpuListRepository.findByGpuId(gpuId).getGpuName()))
                flag = 1;
        }
        if(flag == 0)
            popularGpu.add(gpuListRepository.findByGpuId(gpuId).getGpuName());

        for(String gpu : popularGpu){
            popularGpuList.add(gpuListRepository.findByGpuName(gpu));
        }

        return popularGpuList;

    }
}
