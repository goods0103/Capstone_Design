package com.hadoop.demo.Controller;

import com.hadoop.demo.Model.CpuList;
import com.hadoop.demo.Model.GpuList;
import com.hadoop.demo.Model.UserInfo;
import com.hadoop.demo.Service.CompareService;
import com.hadoop.demo.Service.UserInfoService;
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

import java.io.IOException;
import java.time.Duration;
import java.util.List;

@CrossOrigin
@RestController
public class UserInfoController {

    @Autowired
    UserInfoService userInfoService;

    @Autowired
    private CompareService compareService;

    private CpuList matchingCpuList;
    private int n = 1;
    private String cpu, gpu, ram, rManu, rPartNum;
    private int rSize, rSpeed, rCount;

    private final Sinks.Many<ServerSentEvent<String>> sink;

    public UserInfoController() {
        this.sink = Sinks.many().multicast().onBackpressureBuffer();
    }

    @GetMapping("/ShowMySpec")
    public ResponseEntity<Resource> downloadFile() throws IOException {
        // 다운로드할 파일 경로
        // 다운로드할 파일 경로
        Resource resource = new ClassPathResource("Scoop.exe");

        // InputStreamResource 생성
        InputStreamResource inputStreamResource = new InputStreamResource(resource.getInputStream());

        // Content-Disposition 헤더를 설정하여 파일 이름 지정
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "attachment; filename=Scoop.exe");

        // ResponseEntity에 InputStreamResource와 headers 설정
        return ResponseEntity.ok()
                .headers(headers)
                .contentLength(resource.contentLength())
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(inputStreamResource);
    }


    @GetMapping("/api/spring")
    public ResponseEntity<Void> cpu(){
        System.out.println("cpu 정보를 불러오는중");
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


    @PostMapping("/api/spring")
    public ResponseEntity<GpuList> sendString(@RequestBody String data) {

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
                ram = data.split(": ")[1].trim();
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
            System.out.println(cpu + " " +  gpu + " " + rManu + " " + rPartNum + " " + ram + rSize + " " + rSpeed + " " + rCount);
            n = 1;
            UserInfo userInfo = UserInfo.builder()
                    .cpu(cpu)
                    .gpu(gpu)
                    .ram(ram)
                    .ramSize(rSize)
                    .ramSpeed(rSpeed)
                    .ramCount(rCount)
                    .build();
            save(userInfo);

            // SSE에 데이터를 담아서 객체 만들고 sink에 저장
            ServerSentEvent<String> event = ServerSentEvent.builder(userInfo.getCpuInfo()).build();
            sink.tryEmitNext(event);
            gpu = null;
            return new ResponseEntity<>(compareService.getMatchingGpu(), HttpStatus.OK);
        }
        return null;
        //return ResponseEntity.ok(data);
    }

    public ResponseEntity<UserInfo> save(@RequestBody UserInfo data) {
        return new ResponseEntity<>(userInfoService.save(data), HttpStatus.CREATED);
    }

    @GetMapping("/api/userInfoList")
    public ResponseEntity<List<UserInfo>> findAll() {
        return new ResponseEntity<>(userInfoService.findAll(), HttpStatus.OK);
    }

//    @GetMapping("/MySpec")
//    public CpuList getMatchingColumns() {
//        //System.out.println(compareService.getMatchingCpu());
//        return compareService.getMatchingCpu();
//    }

    @GetMapping(value = "/stream-data", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<ServerSentEvent<String>> streamData() {
        return sink.asFlux();
    }
}
