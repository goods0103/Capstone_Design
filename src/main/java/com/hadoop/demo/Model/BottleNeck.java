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

    @Column(name = "bottleneck_value")
    private Double bottleNeckValue;

    @Builder
    public BottleNeck(String cpuInfo, String gpuInfo, Double bottleNeckValue) {
        this.cpuInfo = cpuInfo;
        this.gpuInfo = gpuInfo;
        this.bottleNeckValue = bottleNeckValue;
    }
}
