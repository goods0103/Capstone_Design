package com.hadoop.demo.Repository;

import com.hadoop.demo.Model.RamList;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RamListRepository extends JpaRepository<RamList, Long> {

    RamList findByRamName(String ramName);

    List<String> findAllRamName(); // findAll + 컬럼명의 형태로 메서드 이름을 작성
}
