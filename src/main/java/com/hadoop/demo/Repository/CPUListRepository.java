package com.hadoop.demo.Repository;

import com.hadoop.demo.Model.CPUList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CPUListRepository extends JpaRepository<CPUList, Long> {
}
