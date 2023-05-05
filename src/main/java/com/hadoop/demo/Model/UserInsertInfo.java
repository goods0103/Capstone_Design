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
@Table(name = "userinsertinfo")
public class UserInsertInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "ip_address")
    private String ipAddress;

    @Column(name = "selected_cpu")
    private String selectedCpu;

    @Column(name = "selected_gpu")
    private String selectedGpu;

    @Column(name = "selected_ram")
    private String selectedRam;

    @Builder
    public UserInsertInfo(String ipAddress, String selectedCpu, String selectedGpu, String selectedRam) {
        this.ipAddress = ipAddress;
        this.selectedCpu = selectedCpu;
        this.selectedGpu = selectedGpu;
        this.selectedRam = selectedRam;
    }

}
