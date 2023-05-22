package com.hadoop.demo.Service;

import com.hadoop.demo.Model.CpuDetails;
import com.hadoop.demo.Repository.CpuDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import javax.persistence.TypedQuery;
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

//    public CpuDetails findByOtherName(String otherName) {
//        List<CpuDetails> results = cpuDetailsRepository.findByOtherName(otherName);
//        if (!results.isEmpty()) {
//            return results.get(0);
//        }
//        return null; // 또는 적절한 기본값 또는 예외 처리를 수행할 수 있습니다.
//    }

    public List<CpuDetails> findByOtherName(String otherName) {
        return cpuDetailsRepository.findByOtherName(otherName);
    }








}
