package com.hadoop.demo.Service;

import com.hadoop.demo.Model.BottleNeck;
import com.hadoop.demo.Model.PopularList;
import com.hadoop.demo.Repository.BottleNeckRepository;
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

}
