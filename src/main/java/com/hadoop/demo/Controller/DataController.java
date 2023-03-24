package com.hadoop.demo.Controller;

import com.hadoop.demo.Model.CpuList;
import com.hadoop.demo.Repository.CpuListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
public class DataController {

    @Autowired
    private CpuListRepository cpuListRepository;

    @GetMapping("/category/c1")
    public List<CpuList> getAllCpuList() {
        return cpuListRepository.findAll();
    }

}
