package com.hadoop.demo.Repository;

import com.hadoop.demo.Model.UserInsertInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserInsertInfoRepository extends JpaRepository<UserInsertInfo, Long> {

    UserInsertInfo findByIpAddress(String ipAddress);

    void deleteByIpAddress(String ipAddress);
}
