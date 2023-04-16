package com.hadoop.demo.Controller;

import org.springframework.web.bind.annotation.*;
import java.lang.management.ManagementFactory;
import java.lang.management.OperatingSystemMXBean;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin
@RestController
public class HomeController {

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

}
