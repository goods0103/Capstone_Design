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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
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

    @GetMapping("/mySpecCpu")
    public CpuList getMyCpu() {
        return compareService.getMatchingCpu();
    }

    @GetMapping("/mySpecGpu")
    public GpuList getMyGpu() {
        return compareService.getMatchingGpu();
    }

    @GetMapping("/mySpecRam")
    public RamList getMyRam() {
        return compareService.getMatchingRam();
    }

    @GetMapping("/myCpuRanking")
    public List<CpuList> getMyCpuRank(@RequestBody String cpu) {
        List<CpuList> cpuList = new ArrayList<>();
        int rank = cpuListService.findByName(cpu).getCpuRank();
        System.out.println(rank);
        if(rank <= 25)
            rank = 1;
        else if (rank >= 1475)
            rank = 1451;
        else rank -= 25;
        System.out.println(rank);

        for(int i = 0; i < 50; i++)
            cpuList.add(cpuListService.findByRank(rank + i));

        return cpuList;
    }

    @GetMapping("/myGpuRanking")
    public List<GpuList> getMyGpuRank(@RequestBody String gpu) {
        List<GpuList> gpuList = new ArrayList<>();
        int rank = gpuListService.findByName(gpu).getGpuRank();
        System.out.println(rank);
        if(rank <= 25)
            rank = 1;
        else if (rank >= 1475)
            rank = 1451;
        else rank -= 25;
        System.out.println(rank);

        for(int i = 0; i < 50; i++)
            gpuList.add(gpuListService.findByRank(rank + i));

        return gpuList;
    }


}