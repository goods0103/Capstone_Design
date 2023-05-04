package com.hadoop.demo.Controller;

import com.hadoop.demo.Model.*;
import com.hadoop.demo.Service.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;

@CrossOrigin
@RestController
public class DetailController {

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    static class handleRequest{
        private Integer lastPart;
        private Integer id;
    }

    @Autowired
    private CpuListService cpuListService;
    @Autowired
    private CpuDetailsService cpuDetailsService;

    @Autowired
    private GpuListService gpuListService;
    @Autowired
    private GpuDetailsService gpuDetailsService;

    @Autowired
    private RamListService ramListService;

    @Autowired
    private GameListService gameListService;
    @Autowired
    private GameListOriginService gameListOriginService;

    // id를 보내 한개의 cpu gpu detail 부분 요청 시. lastPart와 id=~~로 오는 두가지 경우
    @PostMapping("/find_cpu_details")
    public CpuDetails getCpuInfo(@RequestBody handleRequest id) throws IOException {
        String cpuName;
        if(id.getId() == null)
            cpuName = cpuListService.findById(id.getLastPart()).getCpuName();
        else cpuName = cpuListService.findById(id.getId()).getCpuName();
        return cpuDetailsService.findByName(cpuName);
    }

    @PostMapping("/find_gpu_details")
    public GpuDetails getGpuInfo(@RequestBody handleRequest id) throws IOException {
        String gpuName;
        if(id.getId() == null)
            gpuName = gpuListService.findById(id.getLastPart()).getGpuName();
        else gpuName = gpuListService.findById(id.getId()).getGpuName();
        return gpuDetailsService.findByName(gpuName);
    }

    // 모델명을 보내 한개의 cpu gpu detail 부분 요청 시
    @PostMapping("/find_cpu_detail_name")
    public CpuDetails findCpuDetailName(@RequestBody String name) throws IOException {
        name = name.replace("=","");
        String decodedString = URLDecoder.decode(name, StandardCharsets.UTF_8);
        return cpuDetailsService.findByName(decodedString);
    }
    @PostMapping("/find_cpu_name")
    public CpuList findCpuName(@RequestBody String name) throws IOException {
        name = name.replace("=","");
        String decodedString = URLDecoder.decode(name, StandardCharsets.UTF_8);
        return cpuListService.findByName(decodedString);
    }

    @PostMapping("/find_gpu_detail_name")
    public GpuDetails findGpuDetailName(@RequestBody String name) throws IOException {
        name = name.replace("=","");
        String decodedString = URLDecoder.decode(name, StandardCharsets.UTF_8);
        return gpuDetailsService.findByName(decodedString);
    }
    @PostMapping("/find_gpu_name")
    public GpuList findGpuName(@RequestBody String name) throws IOException {
        name = name.replace("=","");
        String decodedString = URLDecoder.decode(name, StandardCharsets.UTF_8);
        return gpuListService.findByName(decodedString);
    }
    // ram 이름으로 ramList 반환
    @PostMapping("/find_ram_name")
    public RamList findRamName(@RequestBody String name) throws IOException {
        name = name.replace("=","");
        String decodedString = URLDecoder.decode(name, StandardCharsets.UTF_8);
        return ramListService.findByName(decodedString);
    }

    // id를 보내 한개의 cpu gpu list 부분 요청 시
    @PostMapping("/find_cpu_id")
    public CpuList findCpuId(@RequestBody handleRequest id) throws IOException {
        if(id.getId() == null) return cpuListService.findById(id.getLastPart());
        else return cpuListService.findById(id.getId());
    }
    @PostMapping("/find_gpu_id")
    public GpuList findGpuId(@RequestBody handleRequest id) throws IOException {
        if(id.getId() == null) return gpuListService.findById(id.getLastPart());
        else return gpuListService.findById(id.getId());
    }

    // game 한개 선택 시 그 게임 이름으로 game origin 내용 보내기
    @PostMapping("/category/game1/detail")
    public GameListOrigin getSelectGameOriginDetail(@RequestBody String game) {
        String decodedString = URLDecoder.decode(game, StandardCharsets.UTF_8).replace("=", "");
        return gameListOriginService.findByName(decodedString);
    }

    // game 한개 선택 시 게임 정보 보내기
    @PostMapping("/category/game1/detail2")
    public GameList getSelectGameDetail(@RequestBody String game) {
        String decodedString = URLDecoder.decode(game, StandardCharsets.UTF_8).replace("=", "");
        return gameListService.findByName(decodedString);
    }
}
