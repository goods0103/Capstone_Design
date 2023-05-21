package com.hadoop.demo.Service;

import com.hadoop.demo.Model.CpuDetails;
import com.hadoop.demo.Repository.CpuDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CpuDetailsService {

    @Autowired
    private CpuDetailsRepository cpuDetailsRepository;

    public CpuDetails save(CpuDetails cpuDetails) {
        return cpuDetailsRepository.save(cpuDetails);
    }

    public List<CpuDetails> findAll() { return cpuDetailsRepository.findAll();}

    public CpuDetails findByName(String name) {
        return cpuDetailsRepository.findByCpuName(name);
    }

    public CpuDetails findByOtherName(String otherName) {
        return cpuDetailsRepository.findByOtherName(otherName);
    }
}
