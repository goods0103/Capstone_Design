package com.hadoop.demo.Repository;

import com.hadoop.demo.Model.CpuList;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CpuListRepository extends JpaRepository<CpuList, Long> {

    CpuList findByCpuName(String cpuName);

    CpuList findByCpuRank(int cpuRank);

    CpuList findByCpuId(int Id);

    List<CpuList> findByOrderByCpuRankAsc();

    List<CpuList> findByCpuValueNotOrderByCpuValueAsc(double cpuValue);

    List<String> findAllCpuName(); // findAll + 컬럼명의 형태로 메서드 이름을 작성
}
