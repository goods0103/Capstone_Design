package com.hadoop.demo.Service;

import com.hadoop.demo.Model.CPUList;
import com.hadoop.demo.Repository.CPUListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CPUListService {

    @Autowired
    private CPUListRepository cpuListRepository;

    public CPUList save(CPUList cpuList) {
        return cpuListRepository.save(cpuList);
    }
}
