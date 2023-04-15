package com.hadoop.demo.Service;

import com.hadoop.demo.Model.PopularSpecList;
import com.hadoop.demo.Repository.CpuListRepository;
import com.hadoop.demo.Repository.GpuListRepository;
import com.hadoop.demo.Repository.PopularSpecListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PopularSpecListService {

    @Autowired
    private PopularSpecListRepository popularSpecListRepository;

    @Autowired
    private CpuListRepository cpuListRepository;

    @Autowired
    private GpuListRepository gpuListRepository;

    public List<PopularSpecList> findAll() { return popularSpecListRepository.findAll(); }

    public List<PopularSpecList> searchSelectCpuByPopular(int cpuId) {

//        List<PopularSpecList> popularSpecLists = popularSpecListRepository.findAll();

//        for(PopularSpecList list1 : popularSpecLists){
//            int cpuRank = cpuListRepository.findByCpuName(list1.getCpuName()).getCpuRank();
//            int cpuPrice = cpuListRepository.findByCpuName(list1.getCpuName()).getCpuPrice();
//            String cpuUrl = cpuListRepository.findByCpuName(list1.getCpuName()).getCpuUrl();
//
//            int gpuRank = gpuListRepository.findByGpuName(list1.getGpuName()).getGpuRank();
//            int gpuPrice = gpuListRepository.findByGpuName(list1.getGpuName()).getGpuPrice();
//            String gpuUrl = gpuListRepository.findByGpuName(list1.getGpuName()).getGpuUrl();
//
//            list1.setCpuRank(cpuRank);
//            list1.setCpuPrice(cpuPrice);
//            list1.setCpuImage(cpuUrl);
//            list1.setGpuRank(gpuRank);
//            list1.setGpuPrice(gpuPrice);
//            list1.setGpuImage(gpuUrl);
//
//            popularSpecListRepository.save(list1);
//
//        }

        int cpuRank2 = cpuListRepository.findByCpuId(cpuId).getCpuRank();
        int cpuPrice2 = cpuListRepository.findByCpuId(cpuId).getCpuPrice();
        String cpuUrl2 = cpuListRepository.findByCpuId(cpuId).getCpuUrl();
        String cpuName2 = cpuListRepository.findByCpuId(cpuId).getCpuName();
        List<PopularSpecList> list2  = popularSpecListRepository.findAll();
        if(list2.size()>9 && list2.get(9).getGpuName()==null){
            popularSpecListRepository.delete(list2.get(9));
            PopularSpecList list = PopularSpecList.builder()
                    .cpuName(cpuName2)
                    .cpuRank(cpuRank2)
                    .cpuPrice(cpuPrice2)
                    .cpuImage(cpuUrl2)
                    .build();
            popularSpecListRepository.save(list);
        }
        else{
            if(list2.size() == 9){
                PopularSpecList list = PopularSpecList.builder()
                        .cpuName(cpuName2)
                        .cpuRank(cpuRank2)
                        .cpuPrice(cpuPrice2)
                        .cpuImage(cpuUrl2)
                        .build();
                popularSpecListRepository.save(list);
            }
            else{
                list2.get(9).setCpuName(cpuName2);
                list2.get(9).setCpuRank(cpuRank2);
                list2.get(9).setCpuPrice(cpuPrice2);
                list2.get(9).setCpuImage(cpuUrl2);
                popularSpecListRepository.save(list2.get(9));
            }

        }

        return list2;
    }

    public List<PopularSpecList> searchSelectGpuByPopular(int gpuId) {

        int gpuRank = gpuListRepository.findByGpuId(gpuId).getGpuRank();
        int gpuPrice = gpuListRepository.findByGpuId(gpuId).getGpuPrice();
        String gpuUrl = gpuListRepository.findByGpuId(gpuId).getGpuUrl();
        String gpuName = gpuListRepository.findByGpuId(gpuId).getGpuName();
        List<PopularSpecList> list2  = popularSpecListRepository.findAll();
        if(list2.size()>9 && list2.get(9).getCpuName()==null){
            popularSpecListRepository.delete(list2.get(9));
            PopularSpecList list = PopularSpecList.builder()
                    .gpuName(gpuName)
                    .gpuRank(gpuRank)
                    .gpuPrice(gpuPrice)
                    .gpuImage(gpuUrl)
                    .build();
            popularSpecListRepository.save(list);
        }
        else{
            if(list2.size() == 9){
                PopularSpecList list = PopularSpecList.builder()
                        .gpuName(gpuName)
                        .gpuRank(gpuRank)
                        .gpuPrice(gpuPrice)
                        .gpuImage(gpuUrl)
                        .build();
                popularSpecListRepository.save(list);
            }
            else{
                list2.get(9).setGpuName(gpuName);
                list2.get(9).setGpuRank(gpuRank);
                list2.get(9).setGpuPrice(gpuPrice);
                list2.get(9).setGpuImage(gpuUrl);
                popularSpecListRepository.save(list2.get(9));
            }

        }

        return list2;
    }
}
