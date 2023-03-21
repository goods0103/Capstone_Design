package com.hadoop.demo.Service;

import com.hadoop.demo.Model.CpuList;
import com.hadoop.demo.Repository.CpuListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InsertCpuList {

    @Autowired
    private CpuListRepository cpuListRepository;

    public CpuList save(CpuList cpuList){
        return cpuListRepository.save(cpuList);
    }

}
