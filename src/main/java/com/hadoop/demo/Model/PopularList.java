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
@Table(name = "popularlist")
public class PopularList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "cpu_name")
    private String cpuName;

    @Column(name = "gpu_name")
    private String gpuName;

    @Builder
    public PopularList(String cpuName, String gpuName) {
        this.cpuName = cpuName;
        this.gpuName = gpuName;
    }
}
