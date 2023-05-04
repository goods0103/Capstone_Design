package com.hadoop.demo.Repository;

import com.hadoop.demo.Model.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserInfoRepository extends JpaRepository<UserInfo, Long> {
    long count();

    UserInfo findByIpAddress(String ipAddress);

    void deleteByIpAddress(String ipAddress);
}
