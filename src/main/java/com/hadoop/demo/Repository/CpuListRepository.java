package com.hadoop.demo.Repository;

import com.hadoop.demo.Model.CpuList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CpuListRepository extends JpaRepository<CpuList, String> {
}
