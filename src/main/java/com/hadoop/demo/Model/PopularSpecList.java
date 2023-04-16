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
@Table(name = "popularspeclist")
public class PopularSpecList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "cpu_rank")
    private int cpuRank;

    @Column(name = "gpu_rank")
    private int gpuRank;

    @Column(name = "cpu_name")
    private String cpuName;

    @Column(name = "gpu_name")
    private String gpuName;

    @Column(name = "cpu_image")
    private String cpuImage;

    @Column(name = "gpu_image")
    private String gpuImage;

    @Column(name = "cpu_price")
    private int cpuPrice;

    @Column(name = "gpu_price")
    private int gpuPrice;

    @Builder
    public PopularSpecList(long id, int cpuRank, int gpuRank, String cpuName, String gpuName, String cpuImage, String gpuImage, int cpuPrice, int gpuPrice) {
        this.id = id;
        this.cpuRank = cpuRank;
        this.gpuRank = gpuRank;
        this.cpuName = cpuName;
        this.gpuName = gpuName;
        this.cpuImage = cpuImage;
        this.gpuImage = gpuImage;
        this.cpuPrice = cpuPrice;
        this.gpuPrice = gpuPrice;
    }
}
