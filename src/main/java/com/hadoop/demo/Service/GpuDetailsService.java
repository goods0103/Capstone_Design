package com.hadoop.demo.Service;

import com.hadoop.demo.Model.CpuDetails;
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

//    public GpuDetails findByOtherName(String otherName) {
//        List<GpuDetails> results = gpuDetailsRepository.findByOtherName(otherName);
//        if (!results.isEmpty()) {
//            return results.get(0);
//        }
//        return null; // 또는 적절한 기본값 또는 예외 처리를 수행할 수 있습니다.
//    }

    public List<GpuDetails> findByOtherName(String otherName) {
        return gpuDetailsRepository.findByOtherName(otherName);
    }

}
