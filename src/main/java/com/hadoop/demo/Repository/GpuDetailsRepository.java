package com.hadoop.demo.Repository;

import com.hadoop.demo.Model.GpuDetails;
import org.springframework.data.jpa.repository.JpaRepository;


public interface GpuDetailsRepository extends JpaRepository<GpuDetails, Long> {
    GpuDetails findByGpuName(String gpuName);

    GpuDetails findByOtherName(String otherName);
}
