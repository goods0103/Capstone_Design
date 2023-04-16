package com.hadoop.demo.Controller;

import com.hadoop.demo.Model.*;
import com.hadoop.demo.Service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    @Autowired
    private GameListOriginService gameListOriginService;


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

    @PostMapping("/myCpuRanking")
    public List<CpuList> getMyCpuRank(@RequestBody String cpu) {
        List<CpuList> cpuList = new ArrayList<>();
        cpu=cpu.replace("+"," ");
        cpu=cpu.replace("=","");
        int rank = cpuListService.findByName(cpu).getCpuRank();
        if(rank <= 25)
            rank = 1;
        else if (rank >= 1475)
            rank = 1451;
        else rank -= 25;

        for(int i = 0; i < 50; i++)
            cpuList.add(cpuListService.findByRank(rank + i));

        return cpuList;
    }

    @PostMapping("/myGpuRanking")
    public List<GpuList> getMyGpuRank(@RequestBody String gpu) {
        List<GpuList> gpuList = new ArrayList<>();
        gpu=gpu.replace("+"," ");
        gpu=gpu.replace("=","");
        int rank = gpuListService.findByName(gpu).getGpuRank();
        if(rank <= 25)
            rank = 1;
        else if (rank >= 1475)
            rank = 1451;
        else rank -= 25;


        for(int i = 0; i < 50; i++)
            gpuList.add(gpuListService.findByRank(rank + i));

        return gpuList;
    }

    @GetMapping("/category/game1")
    public List<GameListOrigin> getAllGameListOrigin() {
        return gameListOriginService.findAll();
    }

    @PostMapping("/category/game1/detail")
    public GameListOrigin getSelectGameDetail(@RequestBody String game) {
        game = game.replace("+", " ");
        game = game.replace("=", "");
        return gameListOriginService.findByName(game);
    }
}