package com.hadoop.demo.Controller;

import com.hadoop.demo.Model.*;
import com.hadoop.demo.Service.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

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
        String decodedString = URLDecoder.decode(name, StandardCharsets.UTF_8).replace("=","");
        return cpuDetailsService.findByName(decodedString);
    }
    @PostMapping("/find_cpu_name")
    public CpuList findCpuName(@RequestBody String name) throws IOException {
        String decodedString = URLDecoder.decode(name, StandardCharsets.UTF_8).replace("=","");
        return cpuListService.findByName(decodedString);
    }

    @PostMapping("/find_gpu_detail_name")
    public GpuDetails findGpuDetailName(@RequestBody String name) throws IOException {
        String decodedString = URLDecoder.decode(name, StandardCharsets.UTF_8).replace("=","");
        return gpuDetailsService.findByName(decodedString);
    }
    @PostMapping("/find_gpu_name")
    public GpuList findGpuName(@RequestBody String name) throws IOException {
        String decodedString = URLDecoder.decode(name, StandardCharsets.UTF_8).replace("=","");
        return gpuListService.findByName(decodedString);
    }
    // ram 이름으로 ramList 반환
    @PostMapping("/find_ram_name")
    public RamList findRamName(@RequestBody String name) throws IOException {
        String decodedString = URLDecoder.decode(name, StandardCharsets.UTF_8).replace("=","");
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
        GameList gameList = gameListService.findByName(decodedString);
        gameList.setTestCount(gameList.getTestCount() + 1);
        gameListService.save(gameList);
        return gameListOriginService.findByName(decodedString);
    }

    // game 한개 선택 시 게임 정보 보내기
    @PostMapping("/category/game1/detail2")
    public GameList getSelectGameDetail(@RequestBody String game) {
        String decodedString = URLDecoder.decode(game, StandardCharsets.UTF_8).replace("=", "");
        return gameListService.findByName(decodedString);
    }

    // chart 를 위해서 각각 구간별 개수 객체 만들어서 보내기
    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    static class RankCount {
        private int name;
        private int benchMark;
        private int myBenchMark;
    }
    @PostMapping("/cpu_mark_chart")
    public List<RankCount> getCpuMarkRanking(@RequestBody handleRequest id) {
        CpuList cpuListById;
        if(id.getId() == null) cpuListById = cpuListService.findById(id.getLastPart());
        else cpuListById = cpuListService.findById(id.getId());
        int mark = cpuListById.getCpuMark() / 1000;

        List<CpuList> cpuLists = cpuListService.orderByCpuRankDesc();
        List<RankCount> rankCounts = new ArrayList<>();

        for(int i=0; i<100; i++ ){
            int count = 0, count2 = 0;
            for(CpuList cpuList: cpuLists){
                if(cpuList.getCpuMark() > 1000*i && cpuList.getCpuMark() <=1000*(i+1)){
                    count++;
                }
                else if(cpuList.getCpuMark() > 1000 * (i+1))
                    break;
            }
            if(mark == i)
                count2 = count;
            rankCounts.add(new RankCount(i * 1000, count, count2));
        }
        return rankCounts;
    }

    @PostMapping("/gpu_mark_chart")
    public List<RankCount> getGpuMarkRanking(@RequestBody handleRequest id) {
        GpuList gpuListById;
        if(id.getId() == null) gpuListById = gpuListService.findById(id.getLastPart());
        else gpuListById = gpuListService.findById(id.getId());
        int mark = gpuListById.getGpuMark() / 400;

        List<GpuList> gpuLists = gpuListService.orderByGpuRankDesc();
        List<RankCount> rankCounts = new ArrayList<>();

        for(int i=0; i<100; i++ ){
            int count = 0, count2 = 0;
            for(GpuList gpuList: gpuLists){
                if(gpuList.getGpuMark() > 400*i && gpuList.getGpuMark() <=400*(i+1)){
                    count++;
                }
                else if(gpuList.getGpuMark() > 400 * (i+1))
                    break;
            }
            if(mark == i)
                count2 = count;
            rankCounts.add(new RankCount(i * 400, count, count2));
        }
        return rankCounts;
    }

}
