package com.hadoop.demo.Model;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table (name = "userinfo")
public class UserInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "cpu_info")
    private String cpuInfo;

    @Column(name = "gpu_info")
    private String gpuInfo;

    @Column(name = "ram_type")
    private String ramType;
    @Column(name = "ram_size")
    private int ramSize;
    @Column(name = "ram_speed")
    private int ramSpeed;
    @Column(name = "ram_count")
    private int ramCount;

    public UserInfo(String cpu, String gpu, String ram, int ramSize, int ramSpeed, int ramCount) {
        cpuInfo = cpu; gpuInfo = gpu; ramType = ram; this.ramSize = ramSize; this.ramSpeed = ramSpeed;
        this.ramCount = ramCount;
    }

    public UserInfo() {

    }
}
