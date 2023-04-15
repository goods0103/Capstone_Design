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
@Table(name = "cpudetails")
public class CpuDetails {

    @Id
    private String cpuName;

    @Column(name = "class_type")
    private String classType;

    @Column(name = "socket")
    private String socket;

    @Column(name = "clock")
    private String clock;

    @Column(name = "turbo")
    private String turbo;

    @Column(name = "core")
    private int core;

    @Column(name = "tdp")
    private String tdp;

    @Column(name = "cache")
    private String cache;

    @Column(name = "other_name")
    private String otherName;

    @Column(name = "str")
    private int str;

    @Builder
    public CpuDetails(String cpuName, String classType, String socket, String clock,
                      String turbo, int core, String tdp, String cache,
                      String otherName, int str) {
        this.cpuName = cpuName;
        this.classType = classType;
        this.socket = socket;
        this.clock = clock;
        this.turbo = turbo;
        this.core = core;
        this.tdp = tdp;
        this.cache = cache;
        this.otherName = otherName;
        this.str = str;
    }
}
