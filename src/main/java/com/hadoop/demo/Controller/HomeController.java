package com.hadoop.demo.Controller;

import com.hadoop.demo.Model.User;
import com.hadoop.demo.Service.UserService;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.web.bind.annotation.*;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.lang.management.ManagementFactory;
import java.lang.management.OperatingSystemMXBean;
import java.util.*;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class HomeController {

    @Autowired //Bean으로 등록된 클래스들을 스프링을 시작할 때 (서버를 켤 때)자동으로 주입
    private UserService userService;


    @GetMapping("/apex-legends/system-requirements")
    public String getSystemRequirements() throws IOException {
        String url = "https://www.systemrequirementslab.com/requirements/call-of-duty-warzone/19566";
        Document document = Jsoup.connect(url).get();
        Element systemReq = document.selectFirst("col col-8");
        Elements systemReqList = systemReq.select("li");

        StringBuilder result = new StringBuilder();
        for (Element systemReqItem : systemReqList) {
            result.append(systemReqItem.text()).append("\n");
        }

        return result.toString();
    }

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
            System.out.println("cpu 정보 : " + data);
            return ResponseEntity.ok(data);
        }
    @GetMapping("/api/data")
    public Map<String, String> getCPUInfo() {
        OperatingSystemMXBean osBean = ManagementFactory.getOperatingSystemMXBean();

        Map<String, String> data = new HashMap<>();
        data.put("Arch", osBean.getArch());
        System.out.println(osBean.getArch());
        data.put("AvailableProcessors", String.valueOf(osBean.getAvailableProcessors()));
        data.put("Name", osBean.getName());
        System.out.println(osBean.getName());
        data.put("Version", osBean.getVersion());

        return data;
    }

    @GetMapping("/api/userlist")
    public ResponseEntity<List<User>> findAll() {
        return new ResponseEntity<>(userService.findAll(), HttpStatus.OK);
    }
    @GetMapping("/api/signup/{id}")
    public ResponseEntity<User> findById(@PathVariable Long id) {
        Optional<User> optionalUser = userService.findById(id);
        if (optionalUser.isPresent()) {
            return new ResponseEntity<>(optionalUser.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @PostMapping("/api/signup")
    public ResponseEntity<User> save(@RequestBody User user) {
        System.out.println("successfully response!");
        return new ResponseEntity<>(userService.save(user), HttpStatus.CREATED);
    }
    @DeleteMapping("/api/signup/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {
        userService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

//    public ResponseEntity<?> registerUser(@RequestBody SignupRequest signupRequest) {
//        if (userService.existsByEmail(signupRequest.getEmail())) {
//            return new ResponseEntity<>(new ApiResponse(false, "Email address already in use!"), HttpStatus.BAD_REQUEST);
//        }
//
//        User user = new User(signupRequest.getEmail(), signupRequest.getPassword());
//
//        userService.save(user);
//
//        return ResponseEntity.ok(new ApiResponse(true, "User registered successfully"));
//    }

}
