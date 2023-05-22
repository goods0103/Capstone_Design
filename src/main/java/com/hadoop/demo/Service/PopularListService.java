package com.hadoop.demo.Service;

import com.hadoop.demo.Model.PopularList;
import com.hadoop.demo.Repository.PopularListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PopularListService {

    @Autowired
    private PopularListRepository popularListRepository;

    public List<PopularList> findAll() { return popularListRepository.findAll();}

    public PopularList save(PopularList popularList) {
        return popularListRepository.save(popularList);
    }

    public PopularList findByCpuName(String name) {
        return popularListRepository.findByCpuName(name);
    }

    public PopularList findByGpuName(String name) {
        return popularListRepository.findByGpuName(name);
    }


}
