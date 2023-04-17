package com.hadoop.demo.Service;

import com.hadoop.demo.Model.CpuList;
import com.hadoop.demo.Model.GpuList;
import com.hadoop.demo.Repository.CpuListRepository;
import com.hadoop.demo.Repository.GpuListRepository;
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

    public List<CpuList> searchSelectCpuByPopular(int cpuId) {

        List<CpuList> popularCpuList = new ArrayList<>();
        List<String> popularCpu = new ArrayList<>();
        popularCpu.add("Intel Core i5-13600K");
        popularCpu.add("Intel Core i5-12600K");
        popularCpu.add("Intel Core i5-12400F");
        popularCpu.add("Intel Core i3-12100F");
        popularCpu.add("Intel Core i7-13700K");
        popularCpu.add("Intel Core i7-9700KF @ 3.60GHz");
        popularCpu.add("Intel Core i9-13900K");
        popularCpu.add("AMD Ryzen 5 3600");
        popularCpu.add("AMD Ryzen 5 5600X");

        for(String cpu : popularCpu){
            popularCpuList.add(cpuListRepository.findByCpuName(cpu));
        }

        if(popularCpuList.size()>9 && popularCpuList.get(9).getCpuName()==null) {
            cpuListRepository.delete(popularCpuList.get(9));
            for(String cpu : popularCpu){
                if(cpu.equals(cpuListRepository.findByCpuId(cpuId).getCpuName())){
                    break;
                }
                else{
                    popularCpuList.add(cpuListRepository.findByCpuId(cpuId));
                    break;
                }
            }
        }
        else{
            for(String cpu : popularCpu){
                if(cpu.equals(cpuListRepository.findByCpuId(cpuId).getCpuName())){
                    break;
                }
                else{
                    popularCpuList.add(cpuListRepository.findByCpuId(cpuId));
                    break;
                }
            }
        }

        return popularCpuList;

    }

    public List<GpuList> searchSelectGpuByPopular(int gpuId) {

        List<GpuList> popularGpuList = new ArrayList<>();
        List<String> popularGpu = new ArrayList<>();
        popularGpu.add("GeForce RTX 3060 Ti");
        popularGpu.add("GeForce RTX 3060");
        popularGpu.add("GeForce RTX 4070 Ti");
        popularGpu.add("GeForce GTX 1660 SUPER");
        popularGpu.add("GeForce RTX 3070");
        popularGpu.add("GeForce RTX 4090");
        popularGpu.add("GeForce RTX 3050");
        popularGpu.add("GeForce RTX 3080");
        popularGpu.add("GeForce RTX 4080");

        for(String gpu : popularGpu){
            popularGpuList.add(gpuListRepository.findByGpuName(gpu));
        }

        if(popularGpuList.size()>9 && popularGpuList.get(9).getGpuName()==null) {
            gpuListRepository.delete(popularGpuList.get(9));
            for(String gpu : popularGpu){
                if(gpu.equals(gpuListRepository.findByGpuId(gpuId).getGpuName())){
                    break;
                }
                else{
                    popularGpuList.add(gpuListRepository.findByGpuId(gpuId));
                    break;
                }
            }
        }
        else{
            for(String gpu : popularGpu){
                if(gpu.equals(gpuListRepository.findByGpuId(gpuId).getGpuName())){
                    break;
                }
                else{
                    popularGpuList.add(gpuListRepository.findByGpuId(gpuId));
                    break;
                }
            }
        }

        return popularGpuList;

    }
}
