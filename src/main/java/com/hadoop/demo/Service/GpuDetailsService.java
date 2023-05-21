package com.hadoop.demo.Service;

import com.hadoop.demo.Model.GpuDetails;
import com.hadoop.demo.Repository.GpuDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GpuDetailsService {

    @Autowired
    private GpuDetailsRepository gpuDetailsRepository;

    public GpuDetails save(GpuDetails gpuDetails) {
        return gpuDetailsRepository.save(gpuDetails);
    }

    public List<GpuDetails> findAll() { return gpuDetailsRepository.findAll();}

    public GpuDetails findByName(String name) {
        return gpuDetailsRepository.findByGpuName(name);
    }

    public GpuDetails findByOtherName(String otherName) {
        return gpuDetailsRepository.findByOtherName(otherName);
    }

}
