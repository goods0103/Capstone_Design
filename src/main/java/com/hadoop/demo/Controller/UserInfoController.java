package com.hadoop.demo.Controller;

import com.hadoop.demo.Model.*;
import com.hadoop.demo.Service.PopularSpecListService;
import com.hadoop.demo.Service.UserInfoService;
import com.hadoop.demo.Service.UserInsertInfoService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Sinks;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.io.IOException;
import java.util.List;


@CrossOrigin
@RestController
public class UserInfoController {

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    static class handleRequest{
        private Integer lastPart;
    }

    @Autowired
    UserInsertInfoService userInsertInfoService;

    @Autowired
    UserInfoService userInfoService;

    @Autowired
    PopularSpecListService popularSpecListService;

    private int n = 1;
    private String cpu, gpu, rType, rManu, rPartNum;
    private int rSize, rSpeed, rCount;

    private final Sinks.Many<ServerSentEvent<String>> sink;

    public UserInfoController() {
        this.sink = Sinks.many().multicast().onBackpressureBuffer();
    }


    @GetMapping("/api/spring")
    public ResponseEntity<Void> cpu(){
        System.out.println("cpu 정보를 불러오는중");
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @Transactional
    @PostMapping("/api/spring")
    public ResponseEntity<String> sendString(@RequestBody String data, HttpServletRequest request) {
        String ipAddress = request.getRemoteAddr();

        data = data.split("\"")[3].trim();

        switch (data.split(": ")[0]) {
            case "CPU Name":
                cpu = data.split(": ")[1].trim();
                break;
            case "GPU Name":
                gpu = data.split(": ")[1].trim();
                break;
            case "RAM Manufacturer":
                rManu = data.split(": ")[1].trim();
                break;
            case "RAM PartNum":
                rPartNum = data.split(": ")[1].trim();
                break;
            case "RAM Type":
                rType = data.split(": ")[1].trim();
                break;
            case "RAM Size":
                rSize = Integer.parseInt(data.split(": ")[1].trim());
                break;
            case "RAM Speed":
                rSpeed = Integer.parseInt(data.split(": ")[1].trim());
                break;
            case "RAM Count":
                rCount = Integer.parseInt(data.split(": ")[1].trim());
                break;
        }
        n++;
        if (gpu != null) {
            System.out.println(cpu + " " +  gpu + " " + rManu + " " + rPartNum + " " + rType + " " + rSize + " " + rSpeed + " " + rCount);
            n = 1;
            // 이미 있으면 ip로 비교해서 삭제
            if(userInfoService.findByIpAddress(ipAddress) != null) {
                System.out.println("find");
                userInfoService.deleteByIpAddress(ipAddress);
            }
            if(cpu == null)
                cpu = "none";
            if(rPartNum == null)
                rPartNum = "none";

            UserInfo userInfo = UserInfo.builder()
                    .ipAddress(ipAddress)
                    .cpuInfo(cpu)
                    .gpuInfo(gpu)
                    .ramManu(rManu)
                    .ramPartNum(rPartNum)
                    .ramType(rType)
                    .ramSize(rSize)
                    .ramSpeed(rSpeed)
                    .ramCount(rCount)
                    .build();
            save(userInfo);


            // SSE에 데이터를 담아서 객체 만들고 sink에 저장
            ServerSentEvent<String> event = ServerSentEvent.builder(userInfo.getCpuInfo()).build();
            sink.tryEmitNext(event);

            gpu = null;
            return ResponseEntity.ok(data);
        }
        return null;
        //return ResponseEntity.ok(data);
    }

    // Scoop.exe 실행시 자동으로 알림 보내기
    @GetMapping(value = "/stream-data", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<ServerSentEvent<String>> streamData(HttpServletRequest request) throws InterruptedException {
        String ipAddress = request.getRemoteAddr();
        return sink.asFlux();
    }

    public ResponseEntity<UserInfo> save(@RequestBody UserInfo data) {
        return new ResponseEntity<>(userInfoService.save(data), HttpStatus.CREATED);
    }

    @GetMapping("/api/userInfoList")
    public ResponseEntity<List<UserInfo>> findAll() {
        return new ResponseEntity<>(userInfoService.findAll(), HttpStatus.OK);
    }

    // 직접 기입해서 보낸 cpu gpu ram userinserinfo 테이블에 저장
    @Transactional
    @PostMapping("/selectedId")
    public void handleSelectedId(@RequestBody UserInsertInfo userInsertInfo, HttpServletRequest request){
        String ipAddress = request.getRemoteAddr();
        String selectedCpu = userInsertInfo.getSelectedCpu();
        String selectedGpu = userInsertInfo.getSelectedGpu();
        String selectedRam = userInsertInfo.getSelectedRam();

        if(userInsertInfoService.findByIpAddress(ipAddress) != null)
            userInsertInfoService.deleteByIpAddress(ipAddress);

        userInsertInfo = UserInsertInfo.builder()
                .ipAddress(ipAddress)
                .selectedCpu(selectedCpu)
                .selectedGpu(selectedGpu)
                .selectedRam(selectedRam)
                .build();
        userInsertInfoService.save(userInsertInfo);

    }

    // cpu gpu rank순 value순으로 10개 보내기
    @PostMapping("/cpuRank")
    public List<CpuList> handleLastDataByRank(@RequestBody handleRequest cpuId){
        return userInsertInfoService.searchSelectCpuByRank(cpuId.getLastPart());
    }

    @PostMapping("/cpuValue")
    public List<CpuList> handleLastDataByValue(@RequestBody handleRequest cpuId){
        return userInsertInfoService.searchSelectCpuByValue(cpuId.getLastPart());
    }

    @PostMapping("/gpuRank")
    public List<GpuList> handleLastDataByRank2(@RequestBody handleRequest gpuId){
        return userInsertInfoService.searchSelectGpuByRank(gpuId.getLastPart());
    }

    @PostMapping("/gpuValue")
    public List<GpuList> handleLastDataByValue2(@RequestBody handleRequest gpuId){
        return userInsertInfoService.searchSelectGpuByValue(gpuId.getLastPart());
    }

    // cpu gpu 인기순으로 보내주기
    @PostMapping("/cpuPopular")
    public List<CpuList> handleLastDataByPopular(@RequestBody handleRequest cpuId){
        return popularSpecListService.searchSelectCpuByPopular(cpuId.getLastPart());
    }

    @PostMapping("/gpuPopular")
    public List<GpuList> handleLastDataByPopular2(@RequestBody handleRequest gpuId){
        return popularSpecListService.searchSelectGpuByPopular(gpuId.getLastPart());
    }

    // local로 Scoop.exe 실행 시 사용
    //    @GetMapping("/ShowMySpec")
//    public ResponseEntity<Resource> downloadFile() throws IOException {
//        // 다운로드할 파일 경로
//        // 다운로드할 파일 경로
//        Resource resource = new ClassPathResource("Scoop.exe");
//
//        // InputStreamResource 생성
//        InputStreamResource inputStreamResource = new InputStreamResource(resource.getInputStream());
//
//        // Content-Disposition 헤더를 설정하여 파일 이름 지정
//        HttpHeaders headers = new HttpHeaders();
//        headers.add("Content-Disposition", "attachment; filename=Scoop.exe");
//
//        // ResponseEntity에 InputStreamResource와 headers 설정
//        return ResponseEntity.ok()
//                .headers(headers)
//                .contentLength(resource.contentLength())
//                .contentType(MediaType.APPLICATION_OCTET_STREAM)
//                .body(inputStreamResource);
//    }
}
