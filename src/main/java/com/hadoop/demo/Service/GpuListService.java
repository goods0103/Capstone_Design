package com.hadoop.demo.Service;

import com.hadoop.demo.Model.GpuList;
import com.hadoop.demo.Repository.GpuListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GpuListService {

    @Autowired
    private GpuListRepository gpuListRepository;

    public GpuList save(GpuList gpuList) {
        return gpuListRepository.save(gpuList);
    }

    public List<GpuList> findAll() { return gpuListRepository.findAll();}

    public List<String> findAllGpuName() { return gpuListRepository.findAllGpuName();}

    public GpuList findByName(String name) {
        return gpuListRepository.findByGpuName(name);
    }

    public GpuList findByRank(int rank) {
        return gpuListRepository.findByGpuRank(rank);
    }

    public GpuList findById(int id) { return gpuListRepository.findByGpuId(id); }

    public List<GpuList> orderByGpuRank() { return gpuListRepository.findByOrderByGpuRankAsc();}

    public List<GpuList> orderByGpuRankDesc() { return gpuListRepository.findByOrderByGpuRankDesc();}
}
