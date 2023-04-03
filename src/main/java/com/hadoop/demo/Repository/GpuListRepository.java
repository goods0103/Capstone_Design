package com.hadoop.demo.Repository;

import com.hadoop.demo.Model.CpuList;
import com.hadoop.demo.Model.GpuList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GpuListRepository extends JpaRepository<GpuList, Long> {

    GpuList findByGpuName(String gpuName);
}
