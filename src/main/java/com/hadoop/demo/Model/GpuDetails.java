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
@Table(name = "gpudetails")
public class GpuDetails {

    @Id
    private String gpuName;

    @Column(name = "memory_size")
    private String memorySize;

    @Column(name = "core_clock")
    private String coreClock;

    @Column(name = "memory_clock")
    private String memoryClock;

    @Column(name = "category")
    private String category;

    @Column(name = "tdp")
    private String tdp;

    @Column(name = "other_name")
    private String otherName;


    @Builder
    public GpuDetails(String gpuName, String memorySize, String coreClock, String memoryClock,
                      String category, String tdp, String otherName) {
        this.gpuName = gpuName;
        this.memorySize = memorySize;
        this.coreClock = coreClock;
        this.memoryClock = memoryClock;
        this.category = category;
        this.tdp = tdp;
        this.otherName = otherName;
    }
}
