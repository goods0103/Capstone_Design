package com.hadoop.demo.Model;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table (name = "userinfo")
public class UserInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ip_address")
    private String ipAddress;
    @Column(name = "cpu_info")
    private String cpuInfo;
    @Column(name = "gpu_info")
    private String gpuInfo;

    @Column(name = "ram_manu")
    private String ramManu;
    @Column(name = "ram_partnum")
    private String ramPartNum;
    @Column(name = "ram_type")
    private String ramType;
    @Column(name = "ram_size")
    private int ramSize;
    @Column(name = "ram_speed")
    private int ramSpeed;
    @Column(name = "ram_count")
    private int ramCount;

    @Builder
    public UserInfo(String ipAddress, String cpuInfo, String gpuInfo,
                    String ramManu, String ramPartNum, String ramType,
                    int ramSize, int ramSpeed, int ramCount) {
        this.ipAddress = ipAddress;
        this.cpuInfo = cpuInfo;        this.gpuInfo = gpuInfo;
        this.ramManu = ramManu;        this.ramPartNum = ramPartNum;
        this.ramType = ramType;        this.ramSize = ramSize;
        this.ramSpeed = ramSpeed;        this.ramCount = ramCount;
    }

}
