package com.hadoop.demo.Service;

import com.hadoop.demo.Model.CpuList;
import com.hadoop.demo.Repository.CpuListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CpuListService {

    @Autowired
    private CpuListRepository cpuListRepository;

    public CpuList save(CpuList cpuList) {
        return cpuListRepository.save(cpuList);
    }

    public List<CpuList> findAll() { return cpuListRepository.findAll();}

}
