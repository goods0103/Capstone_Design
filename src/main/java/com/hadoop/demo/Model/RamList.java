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
@Table(name = "ramlist", indexes = @Index(name = "idx_ram_name", columnList = "ram_name"))
public class RamList {

    @Id
    @Column(name = "ram_name")
    private String ramName;

    @Column(name = "ram_id")
    private int ramId;

    @Column(name = "ram_type")
    private String ramType;

    @Column(name = "ram_size")
    private int ramSize;

    @Column(name = "ram_latency")
    private int ramLatency;

    @Column(name = "ram_read")
    private double ramRead;

    @Column(name = "ram_write")
    private double ramWrite;

    @Builder
    public RamList(String ramName, int ramId, String ramType, int ramSize, int ramLatency, double ramRead, double ramWrite) {
        this.ramName = ramName;
        this.ramId = ramId;
        this.ramType = ramType;
        this.ramSize = ramSize;
        this.ramLatency = ramLatency;
        this.ramRead = ramRead;
        this.ramWrite = ramWrite;
    }

}
