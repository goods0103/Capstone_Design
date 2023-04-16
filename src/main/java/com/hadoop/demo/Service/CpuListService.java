package com.hadoop.demo.Service;

import com.hadoop.demo.Model.CpuList;
import com.hadoop.demo.Model.UserInfo;
import com.hadoop.demo.Repository.CpuDetailsRepository;
import com.hadoop.demo.Repository.CpuListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CpuListService {

    @Autowired
    private CpuListRepository cpuListRepository;

    public CpuList save(CpuList cpuList) {
        return cpuListRepository.save(cpuList);
    }

    public List<CpuList> findAll() { return cpuListRepository.findAll();}

    public List<String> findAllCpuName() { return cpuListRepository.findAllCpuName();}

    public CpuList findByName(String name) {
        return cpuListRepository.findByCpuName(name);
    }

    public CpuList findByRank(int rank) {
        return cpuListRepository.findByCpuRank(rank);
    }

    public CpuList findById(int id) { return cpuListRepository.findByCpuId(id); }

}
