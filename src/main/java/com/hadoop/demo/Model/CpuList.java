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
@Table(name = "cpuList")
public class CpuList {

    @Id
    private String cpuName;

    @Column
    private int cpuMark;

    @Column
    private int rank;

    @Column
    private int cpuValue;

    @Column
    private int Price;


}
