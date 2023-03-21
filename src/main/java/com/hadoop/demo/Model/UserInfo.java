package com.hadoop.demo.Model;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table (name = "userInfo")
public class UserInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "cpuInfo")
    private String cpuInfo;

    @Column(name = "gpuInfo")
    private String gpuInfo;

    @Column(name = "ramType")
    private String ramType;
    @Column(name = "ramSize")
    private int ramSize;
    @Column(name = "ramSpeed")
    private int ramSpeed;
    @Column(name = "ramCount")
    private int ramCount;

    public UserInfo(String cpu, String gpu, String ram, int ramSize, int ramSpeed, int ramCount) {
        cpuInfo = cpu; gpuInfo = gpu; ramType = ram; this.ramSize = ramSize; this.ramSpeed = ramSpeed;
        this.ramCount = ramCount;
    }

    public UserInfo() {

    }
}
