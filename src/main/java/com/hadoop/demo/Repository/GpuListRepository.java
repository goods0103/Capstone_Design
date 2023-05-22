package com.hadoop.demo.Repository;

import com.hadoop.demo.Model.GpuList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface GpuListRepository extends JpaRepository<GpuList, Long> {

    List<GpuList> findByOrderByGpuRankAsc();

    List<GpuList> findByOrderByGpuRankDesc();

    GpuList findByGpuName(String gpuName);

    @Query("SELECT g FROM GpuList g WHERE g.gpuMark = :gpuMark")
    List<GpuList> findByGpuMark(int gpuMark);

    GpuList findByGpuRank(int gpuRank);

    GpuList findByGpuId(int gpuId);

    List<GpuList> findByGpuValueNotOrderByGpuValueAsc(double gpuValue);

    @Query("SELECT gpu.gpuName FROM GpuList gpu")
    List<String> findAllGpuName(); // findAll + 컬럼명의 형태로 메서드 이름을 작성

}
