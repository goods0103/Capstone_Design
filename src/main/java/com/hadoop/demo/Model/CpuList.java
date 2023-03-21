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
@Table(name = "cpu_list")
public class CpuList {

    @Id
    private String cpuname;

    @Column(name = "cpu_name")
    private int cpumark;

    @Column(name = "cpu_rank")
    private int cpurank;

    @Column(name = "cpu_value")
    private int cpuvalue;

    @Column(name = "price")
    private int price;


}
