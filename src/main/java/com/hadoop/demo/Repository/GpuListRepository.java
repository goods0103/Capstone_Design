package com.hadoop.demo.Repository;

import com.hadoop.demo.Model.GpuList;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GpuListRepository extends JpaRepository<GpuList, Long> {

    List<GpuList> findByOrderByGpuRankAsc();

    GpuList findByGpuName(String gpuName);

    GpuList findByGpuRank(int gpuRank);

    List<GpuList> findByGpuValueNotOrderByGpuValueAsc(double gpuValue);
}
