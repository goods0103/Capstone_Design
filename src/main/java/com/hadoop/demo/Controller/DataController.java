package com.hadoop.demo.Controller;

import com.hadoop.demo.Model.CpuList;
import com.hadoop.demo.Service.CpuListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
public class DataController {

    @Autowired
    private CpuListService cpuListService;

    @GetMapping("/category/cpu1")
    public List<CpuList> getAllCpuList() {
        return cpuListService.findAll();
    }

}