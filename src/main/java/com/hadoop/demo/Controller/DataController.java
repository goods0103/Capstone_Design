package com.hadoop.demo.Controller;

import com.hadoop.demo.Model.CpuList;
import com.hadoop.demo.Model.GpuList;
import com.hadoop.demo.Model.RamList;
import com.hadoop.demo.Service.CompareService;
import com.hadoop.demo.Service.CpuListService;
import com.hadoop.demo.Service.GpuListService;
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
    private GpuListService gpuListService;
    @Autowired
    private RamListService ramListService;

    @Autowired
    private CompareService compareService;


    @GetMapping("/category/cpu1")
    public List<CpuList> getAllCpuList() {
        return cpuListService.findAll();
    }

    @GetMapping("/category/ram1")
    public List<RamList> getAllRamList() {
        return ramListService.findAll();
    }

    @GetMapping("/category/gpu1")
    public List<GpuList> getAllGpuList() {
        return gpuListService.findAll();
    }

    @GetMapping("/mySpec")
    public CpuList getMyCpu() {
        return compareService.getMatchingCpu();
    }

    @GetMapping("/mySpec")
    public GpuList getMyGpu() {
        return compareService.getMatchingGpu();
    }

//    @GetMapping("/mySpec")
//    public RamList getMyRam() {
//        return compareService.getMachingRam();
//    }

}