package com.hadoop.demo.Model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "cpulist", indexes = @Index(name = "idx_cpu_name", columnList = "cpu_name"))
public class CpuList {

    @Id
    @Column(name = "cpu_name")
    private String cpuName;

    @Column(name = "cpu_id")
    private int cpuId;

    @Column(name = "cpu_mark")
    private int cpuMark;

    @Column(name = "cpu_rank")
    private int cpuRank;

    @Column(name = "cpu_value")
    private double cpuValue;

    @Column(name = "cpu_price")
    private int cpuPrice;

    @Column(name = "image_url")
    private String cpuUrl;

    @Builder // 7.
    public CpuList(int cpuId, String cpuName, int cpuMark, int cpuRank, double cpuValue, int cpuPrice, String cpuUrl) {
        this.cpuId = cpuId;
        this.cpuName = cpuName;
        this.cpuMark = cpuMark;
        this.cpuRank = cpuRank;
        this.cpuValue = cpuValue;
        this.cpuPrice = cpuPrice;
        this.cpuUrl = cpuUrl;
    }

}
