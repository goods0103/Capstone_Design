package com.hadoop.demo.Controller;

import com.hadoop.demo.Model.*;
import com.hadoop.demo.Service.*;
import org.springframework.aop.scope.ScopedProxyUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.io.IOException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

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
    @Autowired
    private UserInsertInfoService userInsertInfoService;


    // cpu gpu ram 전체 리스트 요청 시
    @GetMapping("/category/cpu1")
    public List<CpuList> getAllCpuList() {
        return cpuListService.orderByCpuRank();
    }

    @GetMapping("/category/ram1")
    public List<RamList> getAllRamList() {
        return ramListService.findAll();
    }

    @GetMapping("/category/gpu1")
    public List<GpuList> getAllGpuList() {
        return gpuListService.orderByGpuRank();
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

    // Scoop에 뜬 cpu gpu ram 정보를 기존 리스트와 비교하여 가공한 데이터를 UserInsertInfo 테이블에 넣고 반환
    @Transactional
    @GetMapping("/mySpec")
    public UserInsertInfo getMySpec(HttpServletRequest request) {
        String ipAddress = request.getRemoteAddr();
        System.out.println("ipAddress : " + ipAddress);;
        if(userInsertInfoService.findByIpAddress(ipAddress) != null)
            userInsertInfoService.deleteByIpAddress(ipAddress);

        String cpuList = compareService.getMatchingCpu(ipAddress);
        String gpuList = compareService.getMatchingGpu(ipAddress);
        String ramList = compareService.getMatchingRam(ipAddress);
        System.out.println("mySPec"+ ramList);
        UserInsertInfo userInsertInfo = UserInsertInfo.builder()
                .ipAddress(ipAddress)
                .selectedCpu(cpuList)
                .selectedGpu(gpuList)
                .selectedRam(ramList)
                .build();

        userInsertInfoService.save(userInsertInfo);
        return userInsertInfo;
    }

    // cpu gpu rank순으로 위아래 50개 보내기
    @PostMapping("/myCpuRanking")
    public List<CpuList> getMyCpuRank(@RequestBody String cpu) {
        System.out.println(cpu);
        List<CpuList> cpuList = new ArrayList<>();
        String decodedCpu = URLDecoder.decode(cpu, StandardCharsets.UTF_8).replace("=","");
        System.out.println(decodedCpu);
        if(decodedCpu.equals("none")) { // 없으면 100위까지만 보내주기
            cpuList = cpuListService.orderByCpuRank();
            cpuList.subList(100, cpuList.size()).clear();
            return cpuList;
        }

        int rank = cpuListService.findByName(decodedCpu).getCpuRank();
        if(rank <= 25)
            rank = 1;
        else if (rank >= 1468)
            rank = 1444;
        else rank -= 25;

        for(int i = 0; i < 50; i++)
            cpuList.add(cpuListService.findByRank(rank + i));

        return cpuList;
    }

    @PostMapping("/myGpuRanking")
    public List<GpuList> getMyGpuRank(@RequestBody String gpu) {
        System.out.println(gpu);
        List<GpuList> gpuList = new ArrayList<>();
        String decodedGpu = URLDecoder.decode(gpu, StandardCharsets.UTF_8).replace("=","");
        System.out.println(decodedGpu);
        if(decodedGpu.equals("none")) { // 없으면 100위까지만 보내주기
            gpuList = gpuListService.orderByGpuRank();
            gpuList.subList(100, gpuList.size()).clear();
            return gpuList;
        }

        int rank = gpuListService.findByName(decodedGpu).getGpuRank();
        if(rank <= 25)
            rank = 1;
        else if (rank >= 1471)
            rank = 1447;
        else rank -= 25;

        for(int i = 0; i < 50; i++)
            gpuList.add(gpuListService.findByRank(rank + i));

        return gpuList;
    }

    // ram latency기준으로 +-1값인 객체 전송
    @PostMapping("/myRamRanking")
    public List<RamList> getMyRamRank(@RequestBody String ram) {
        System.out.println(ram);
        List<RamList> ramList = new ArrayList<>();
        System.out.println(ram);
        ram = URLDecoder.decode(ram, StandardCharsets.UTF_8).replace("=","");
        System.out.println(ram);
        if(ram.equals("none")) { // 없으면 100위까지만 보내주기
            ramList = ramListService.findAll();
            ramList.subList(100, ramList.size()).clear();
            return ramList;
        }

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
        return bottleNeckService.searchByCpuInfoAndGpuInfo(selectedCpu, selectedGpu);
    }

    // 5% 이하의 보틀넥 추천 cpu gpu 보내기
    @PostMapping("/recommendCpu")
    public List<BottleNeck> recommendCpu(@RequestBody String cpu){
        cpu = URLDecoder.decode(cpu, StandardCharsets.UTF_8).replace("=","");
        List<BottleNeck> recBottleNecks = new ArrayList<>();
        List<BottleNeck> bottleNecks = bottleNeckService.findByCpuName(cpu);
        for(BottleNeck bottleNeck1 : bottleNecks){
            int value = Math.abs(bottleNeck1.getCpuBottleNeckValue() - bottleNeck1.getGpuBottleNeckValue());
            if(value < 50)
                recBottleNecks.add(bottleNeck1);
        }
        return recBottleNecks;
    }

    @PostMapping("/recommendGpu")
    public List<BottleNeck> recommendGpu(@RequestBody String gpu){
        gpu = URLDecoder.decode(gpu, StandardCharsets.UTF_8).replace("=","");
        List<BottleNeck> recBottleNecks = new ArrayList<>();
        List<BottleNeck> bottleNecks = bottleNeckService.findByGpuName(gpu);
        for(BottleNeck bottleNeck1 : bottleNecks){
            int value = Math.abs(bottleNeck1.getCpuBottleNeckValue() - bottleNeck1.getGpuBottleNeckValue());
            if(value < 50)
                recBottleNecks.add(bottleNeck1);
        }
        return recBottleNecks;
    }

    @PostMapping("/bottleneck_info")
    public List<BottleNeckService.bottleNeckInfo> findBottleNeckInfo(@RequestBody String name) throws IOException {
        String decodedString = URLDecoder.decode(name, StandardCharsets.UTF_8).replace("=","");
        System.out.println("name"+decodedString);
        return bottleNeckService.gpuMatchingCpuInfo(decodedString);
    }
    // ram 이름으로 ramList 반환
    @PostMapping("/bottleneck_info2")
    public List<BottleNeckService.bottleNeckInfo> findBottleNeckInfo2(@RequestBody String name) throws IOException {
        String decodedString = URLDecoder.decode(name, StandardCharsets.UTF_8).replace("=","");
        return bottleNeckService.cpuMatchingGpuInfo(decodedString);
    }

}