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
@IdClass(BottleNeckCompositeKey.class)
@Table(name = "bottleneck")
public class BottleNeck {

    @Id
    private String cpuInfo;

    @Id
    private String gpuInfo;

    @Column(name = "cpu_bottleneck_value")
    private int cpuBottleNeckValue;

    @Column(name = "gpu_bottleneck_value")
    private int gpuBottleNeckValue;

    @Builder
    public BottleNeck(String cpuInfo, String gpuInfo, int cpuBottleNeckValue, int gpuBottleNeckValue) {
        this.cpuInfo = cpuInfo;
        this.gpuInfo = gpuInfo;
        this.cpuBottleNeckValue = cpuBottleNeckValue;
        this.gpuBottleNeckValue = gpuBottleNeckValue;
    }
}
