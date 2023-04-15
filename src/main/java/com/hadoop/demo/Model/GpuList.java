package com.hadoop.demo.Model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "gpulist")
public class GpuList {


    @Id
    private String gpuName;

    @Column(name = "gpu_id")
    private int gpuId;

    @Column(name = "gpu_mark")
    private int gpuMark;

    @Column(name = "gpu_rank")
    private int gpuRank;

    @Column(name = "gpu_value")
    private double gpuValue;

    @Column(name = "gpu_price")
    private int gpuPrice;

    @Column(name = "image_url")
    private String gpuUrl;

    @Builder // 7.
    public GpuList(int gpuId, String gpuName, int gpuMark, int gpuRank, double gpuValue, int gpuPrice, String gpuUrl) {
        this.gpuId = gpuId;
        this.gpuName = gpuName;
        this.gpuMark = gpuMark;
        this.gpuRank = gpuRank;
        this.gpuValue = gpuValue;
        this.gpuPrice = gpuPrice;
        this.gpuUrl = gpuUrl;
    }

}
