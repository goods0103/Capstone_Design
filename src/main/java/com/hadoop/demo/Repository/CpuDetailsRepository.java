package com.hadoop.demo.Repository;

import com.hadoop.demo.Model.CpuDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface CpuDetailsRepository extends JpaRepository<CpuDetails, Long> {
    CpuDetails findByCpuName(String cpuName);

    @Query("SELECT cd FROM CpuDetails cd WHERE cd.otherName = :otherName ORDER BY cd.cpuName ASC")
    List<CpuDetails> findByOtherName(String otherName);

}
