package com.hadoop.demo.Service;

import com.hadoop.demo.Model.UserInfo;
import com.hadoop.demo.Repository.UserInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserInfoService {

    @Autowired
    private UserInfoRepository userInfoRepository;

    public List<UserInfo> findAll() { return userInfoRepository.findAll();}

    public Optional<UserInfo> findById(Long id) {
        return userInfoRepository.findById(id);
    }

    public UserInfo save(UserInfo userInfo) {
        return userInfoRepository.save(userInfo);
    }

    public void deleteById(Long id) {
        userInfoRepository.deleteById(id);
    }

    public long Count() {return userInfoRepository.count(); }

    public UserInfo findByIpAddress(String ipAddress) { return userInfoRepository.findByIpAddress(ipAddress);}

    public void deleteByIpAddress(String ipAddress) { userInfoRepository.deleteByIpAddress(ipAddress);}
}
