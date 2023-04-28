package com.hadoop.demo.Controller;

import com.hadoop.demo.Model.*;
import com.hadoop.demo.Service.*;
import lombok.Getter;
import lombok.Setter;
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
    @Autowired
    private GameListService gameListService;
    @Autowired
    private BottleNeckService bottleNeckService;
    @Autowired
    private PopularListService popularListService;


    // cpu gpu ram 전체 리스트 요청 시
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

    // cpu gpu ram 전체 리스트 중 이름만 요청 시
    @GetMapping("/category/cpu_name")
    public List<String> getAllCpuName() {
        return cpuListService.findAllCpuName();
    }

    @GetMapping("/category/ram_name")
    public List<String> getAllRamName() {
        return ramListService.findAllRamName();
    }

    @GetMapping("/category/gpu_name")
    public List<String> getAllGpuName() {
        return gpuListService.findAllGpuName();
    }

    // Scoop에 뜬 cpu gpu ram 정보를 기존 리스트와 비교하여 맞는 리스트 보내주기
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

    // cpu gpu rank순으로 위아래 50개 보내기
    @PostMapping("/myCpuRanking")
    public List<CpuList> getMyCpuRank(@RequestBody String cpu) {
        List<CpuList> cpuList = new ArrayList<>();
        cpu = cpu.replace("+"," ").replace("=","");
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
        gpu = gpu.replace("+"," ").replace("=","");
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

    // ram latency기준으로 +-1값인 객체 전송
    @PostMapping("/myRamRanking")
    public List<RamList> getMyRamRank(@RequestBody String ram) {
        List<RamList> ramList = new ArrayList<>();
        ram = ram.replace("+"," ").replace("=","");
        int latency = ramListService.findByName(ram).getRamLatency();

        for(int i = latency - 1; i <= latency + 1; i++)
            ramList.addAll(ramListService.findByRamLatency(i));

        return ramList;
    }

    // game origin 리스트 보내기
    @GetMapping("/category/game1")
    public List<GameListOrigin> getAllGameListOrigin() {
        return gameListOriginService.findAll();
    }

    @GetMapping("/category/game2")
    public List<GameList> getAllGameList() {
        return gameListService.findAll();
    }

    // bottle neck 리스트 보내기
    @GetMapping("/category/bottleNeck")
    public List<BottleNeck> getAllBottleNeck() {
        return bottleNeckService.findAll();
    }

    // bottleNeck 실질적인 테이블인 popularList 보내기
    @GetMapping("/category/bottleNeckList")
    public List<PopularList> getAllBottleNeckList() { return popularListService.findAll();}

    // 선택한 bottle neck 에 맞는 bottle neck 보내기
    @PostMapping("/selectedBottleNeck")
    public BottleNeck handleSelectedBottleNeck(@RequestBody PopularList popularList){
        String selectedCpu = popularList.getCpuName();
        String selectedGpu = popularList.getGpuName();
        System.out.println(selectedCpu);
        System.out.println(selectedGpu);
        System.out.println(bottleNeckService.searchByCpuInfoAndGpuInfo(selectedCpu, selectedGpu));
        return bottleNeckService.searchByCpuInfoAndGpuInfo(selectedCpu, selectedGpu);
    }

    @PostMapping("/recommendCpu")
    public List<BottleNeck> recommendCpu(@RequestBody String cpu){
        List<BottleNeck> recBottleNecks = new ArrayList<>();
        List<BottleNeck> bottleNecks = bottleNeckService.findByCpuName(cpu);
        for(BottleNeck bottleNeck1 : bottleNecks){
            int value = Math.abs(bottleNeck1.getCpuBottleNeckValue() - bottleNeck1.getGpuBottleNeckValue());
            if(value < 5)
                recBottleNecks.add(bottleNeck1);
        }
        return recBottleNecks;
    }

    @PostMapping("/recommendGpu")
    public List<BottleNeck> recommendGpu(@RequestBody String gpu){
        List<BottleNeck> recBottleNecks = new ArrayList<>();
        List<BottleNeck> bottleNecks = bottleNeckService.findByGpuName(gpu);
        for(BottleNeck bottleNeck1 : bottleNecks){
            int value = Math.abs(bottleNeck1.getCpuBottleNeckValue() - bottleNeck1.getGpuBottleNeckValue());
            if(value < 5)
                recBottleNecks.add(bottleNeck1);
        }
        return recBottleNecks;
    }

}