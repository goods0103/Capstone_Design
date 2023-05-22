package com.hadoop.demo.Repository;

import com.hadoop.demo.Model.CpuDetails;
import com.hadoop.demo.Model.GpuDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface GpuDetailsRepository extends JpaRepository<GpuDetails, Long> {
    GpuDetails findByGpuName(String gpuName);

    @Query("SELECT cd FROM GpuDetails cd WHERE cd.otherName = :otherName ORDER BY cd.gpuName ASC")
    List<GpuDetails> findByOtherName(String otherName);
}
