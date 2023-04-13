package com.hadoop.demo.Repository;

import com.hadoop.demo.Model.RamList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RamListRepository extends JpaRepository<RamList, Long> {

    RamList findByRamName(String ramName);
}
