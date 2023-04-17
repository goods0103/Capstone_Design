package com.hadoop.demo.Repository;

import com.hadoop.demo.Model.BottleNeck;
import com.hadoop.demo.Model.BottleNeckCompositeKey;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BottleNeckRepository extends JpaRepository<BottleNeck, BottleNeckCompositeKey> {

    BottleNeck findByCpuInfo(String cpuName);

    BottleNeck findByGpuInfo(String gpuName);

}
