package com.hadoop.demo.Repository;

import com.hadoop.demo.Model.CpuList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CpuListRepository extends JpaRepository<CpuList, Long> {

    CpuList findByCpuName(String cpuName);

    CpuList findByCpuRank(int cpuRank);

    CpuList findByCpuId(int Id);

    @Query("SELECT c FROM CpuList c WHERE c.cpuMark = :cpuMark")
    List<CpuList> findByCpuMark(int cpuMark);

    List<CpuList> findByOrderByCpuRankAsc();

    List<CpuList> findByOrderByCpuRankDesc();

    List<CpuList> findByCpuValueNotOrderByCpuValueAsc(double cpuValue);

    @Query("SELECT cpu.cpuName FROM CpuList cpu")
    List<String> findAllCpuName(); // findAll + 컬럼명의 형태로 메서드 이름을 작성


}
