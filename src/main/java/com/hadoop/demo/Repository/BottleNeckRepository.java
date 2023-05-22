package com.hadoop.demo.Repository;

import com.hadoop.demo.Model.BottleNeck;
import com.hadoop.demo.Model.BottleNeckCompositeKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BottleNeckRepository extends JpaRepository<BottleNeck, BottleNeckCompositeKey> {

    List<BottleNeck> findByCpuInfo(String cpuInfo);

    List<BottleNeck> findByGpuInfo(String gpuInfo);

    BottleNeck findByCpuInfoAndGpuInfo(String cpuInfo, String gpuInfo);

}
