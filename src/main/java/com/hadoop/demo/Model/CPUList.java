package com.hadoop.demo.Model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Getter
@Setter
@Table (name = "cpu_list")
public class CPUList {

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
}
