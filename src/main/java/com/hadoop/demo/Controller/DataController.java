package com.hadoop.demo.Controller;

import com.hadoop.demo.Model.CpuList;
import com.hadoop.demo.Model.RamList;
import com.hadoop.demo.Service.CompareService;
import com.hadoop.demo.Service.CpuListService;
import com.hadoop.demo.Service.RamListService;
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

    @Autowired
    private RamListService ramListService;

    @GetMapping("/category/cpu1")
    public List<CpuList> getAllCpuList() {
        return cpuListService.findAll();
    }

    @GetMapping("/ram_list2")
    public List<RamList> getAllRamList() {
        return ramListService.findAll();
    }

}