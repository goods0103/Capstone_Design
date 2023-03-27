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
@Table(name = "cpulist")
public class CpuList {


    @Id
    @JsonProperty("cpu_name")
    private String cpuName;

    @Column(name = "cpu_id")
    @JsonProperty("cpu_id")
    private int cpu_id;

    @Column(name = "cpu_mark")
    @JsonProperty("cpu_mark")
    private int cpu_mark;

    @Column(name = "cpu_rank")
    @JsonProperty("cpu_rank")
    private int cpu_rank;

    @Column(name = "cpu_value")
    @JsonProperty("cpu_value")
    private double cpu_value;

    @Column(name = "cpu_price")
    @JsonProperty("cpu_price")
    private int cpu_price;

    @Builder // 7.
    public CpuList(int cpu_id, String cpuName, int cpu_mark, int cpu_rank, double cpu_value, int cpu_price) {
        this.cpu_id = cpu_id;
        this.cpuName = cpuName;
        this.cpu_mark = cpu_mark;
        this.cpu_rank = cpu_rank;
        this.cpu_value = cpu_value;
        this.cpu_price  = cpu_price;
    }

}
