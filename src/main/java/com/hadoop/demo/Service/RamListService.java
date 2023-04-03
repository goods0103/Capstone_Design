package com.hadoop.demo.Service;

import com.hadoop.demo.Model.RamList;
import com.hadoop.demo.Repository.RamListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RamListService {

    @Autowired
    private RamListRepository ramListRepository;

    public RamList save(RamList ramList) {
        return ramListRepository.save(ramList);
    }

    public List<RamList> findAll() { return ramListRepository.findAll();}

}
