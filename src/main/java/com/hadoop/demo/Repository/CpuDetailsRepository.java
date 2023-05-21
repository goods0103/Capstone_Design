package com.hadoop.demo.Repository;

import com.hadoop.demo.Model.CpuDetails;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CpuDetailsRepository extends JpaRepository<CpuDetails, Long> {
    CpuDetails findByCpuName(String cpuName);

    CpuDetails findByOtherName(String otherName);

}
