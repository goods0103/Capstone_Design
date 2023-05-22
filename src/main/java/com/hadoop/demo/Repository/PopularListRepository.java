package com.hadoop.demo.Repository;

import com.hadoop.demo.Model.PopularList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PopularListRepository extends JpaRepository<PopularList, Long> {

    PopularList findById(int id);

    PopularList findByCpuName(String cpuName);

    PopularList findByGpuName(String gpuName);

}
