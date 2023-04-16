package com.hadoop.demo.Repository;

import com.hadoop.demo.Model.GpuList;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GpuListRepository extends JpaRepository<GpuList, Long> {

    List<GpuList> findByOrderByGpuRankAsc();

    GpuList findByGpuName(String gpuName);

    GpuList findByGpuRank(int gpuRank);

    GpuList findByGpuId(int gpuId);

    List<GpuList> findByGpuValueNotOrderByGpuValueAsc(double gpuValue);

    List<String> findAllGpuName(); // findAll + 컬럼명의 형태로 메서드 이름을 작성

}
