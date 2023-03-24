package com.hadoop.demo.Model;

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
    private String cpu_name;

    @Column(name = "cpu_mark")
    private int cpu_mark;

    @Column(name = "cpu_rank")
    private int cpu_rank;

    @Column(name = "cpu_value")
    private double cpu_value;

    @Column(name = "cpu_price")
    private int cpu_price;

    @Builder // 7.
    public CpuList(String cpu_name, int cpu_mark, int cpu_rank, double cpu_value, int cpu_price) {
        this.cpu_name = cpu_name;
        this.cpu_mark = cpu_mark;
        this.cpu_rank = cpu_rank;
        this.cpu_value = cpu_value;
        this.cpu_price  = cpu_price;
    }

}
