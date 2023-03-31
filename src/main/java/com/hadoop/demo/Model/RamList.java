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
@Table(name = "ramlist")
public class RamList {


    @Id
    @JsonProperty("ram_name")
    private String ramName;

    @Column(name = "ram_id")
    @JsonProperty("ram_id")
    private int ramId;

    @Column(name = "ram_type")
    @JsonProperty("ram_type")
    private String ramType;

    @Column(name = "ram_size")
    @JsonProperty("ram_size")
    private int ramSize;

    @Column(name = "ram_latency")
    @JsonProperty("ram_latency")
    private int ramLatency;

    @Column(name = "ram_read")
    @JsonProperty("ram_read")
    private double ramRead;

    @Column(name = "ram_write")
    @JsonProperty("ram_write")
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
