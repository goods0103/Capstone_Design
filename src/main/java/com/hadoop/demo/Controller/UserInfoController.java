package com.hadoop.demo.Controller;

import com.hadoop.demo.Model.User;
import com.hadoop.demo.Model.UserInfo;
import com.hadoop.demo.Service.UserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@CrossOrigin
@RestController
public class UserInfoController {

    @Autowired
    UserInfoService userInfoService;

    private int n = 1;
    private String cpu, gpu, ram;
    private int rSize, rSpeed, rCount;

    @GetMapping("/insertSpec")
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
    public ResponseEntity<String> sendString(@RequestBody String data) {

        data = data.split("\"")[3].trim();
        System.out.println(n + "번째 cpu 정보 : " + data);
        switch (data.split(": ")[0]) {
            case "CPU Name":
                cpu = data.split(": ")[1].trim();
            case "GPU Name":
                gpu = data.split(": ")[1].trim();
            case "RAM Type":
                ram = data.split(": ")[1].trim();
            case "RAM Size":
                rSize = Integer.parseInt(data.split(": ")[1].trim());
            case "RAM Speed":
                rSpeed = Integer.parseInt(data.split(": ")[1].trim());
            case "RAM Count":
                rCount = Integer.parseInt(data.split(": ")[1].trim());
        }
        n++;
        if (n == 7) {
            n = 1;
            UserInfo userInfo = new UserInfo(cpu, gpu, ram, rSize, rSpeed, rCount);
            save(userInfo);
        }
        return ResponseEntity.ok(data);
    }

    public ResponseEntity<UserInfo> save(@RequestBody UserInfo data) {
        return new ResponseEntity<>(userInfoService.save(data), HttpStatus.CREATED);
    }

    @GetMapping("/api/userInfoList")
    public ResponseEntity<List<UserInfo>> findAll() {
        return new ResponseEntity<>(userInfoService.findAll(), HttpStatus.OK);
    }

}
