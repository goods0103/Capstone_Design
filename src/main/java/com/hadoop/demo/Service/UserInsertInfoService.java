package com.hadoop.demo.Service;

import com.hadoop.demo.Model.CpuList;
import com.hadoop.demo.Model.GpuList;
import com.hadoop.demo.Model.RamList;
import com.hadoop.demo.Model.UserInsertInfo;
import com.hadoop.demo.Repository.CpuListRepository;
import com.hadoop.demo.Repository.GpuListRepository;
import com.hadoop.demo.Repository.RamListRepository;
import com.hadoop.demo.Repository.UserInsertInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@Service
public class UserInsertInfoService {

    @Autowired
    private UserInsertInfoRepository userInsertInfoRepository;
    @Autowired
    private CpuListRepository cpuListRepository;
    @Autowired
    private GpuListRepository gpuListRepository;
    @Autowired
    private RamListRepository ramListRepository;
    @Autowired
    private CompareService compareService;

    public UserInsertInfo save(UserInsertInfo userInsertInfo) {
        return userInsertInfoRepository.save(userInsertInfo);
    }

    public List<UserInsertInfo> findAll() { return userInsertInfoRepository.findAll();}

    public List<CpuList> searchSelectCpuByRank(int cpuId) {
        List<CpuList> similarCpu = new ArrayList<>();

        List<CpuList> sortedCpuList = cpuListRepository.findByOrderByCpuRankAsc();

        int findRank = cpuListRepository.findByCpuId(cpuId).getCpuRank();

        int startRank = Math.max(findRank - 4, 1); // 랭크가 1보다 작아지는 경우를 처리해줍니다.
        int endRank = Math.min(findRank + 5, sortedCpuList.size()); // 랭크가 size보다 커지는 경우를 처리해줍니다.

        for(int i = startRank; i <= endRank; i++){
            similarCpu.add(sortedCpuList.get(i-1));
        }
        // 선택한 랭크가 5보다 작은 경우 부족한 만큼 이전 랭크를 채웁니다.
        while(similarCpu.size() < 10 && startRank > 1) {
            similarCpu.add(sortedCpuList.get(--startRank-1));
        }
        // 선택한 랭크가 size-5보다 큰 경우 부족한 만큼 다음 랭크를 채웁니다.
        while(similarCpu.size() < 10 && endRank < sortedCpuList.size()) {
            similarCpu.add(sortedCpuList.get(++endRank-1));
        }

        return similarCpu;
    }

    public List<GpuList> searchSelectGpuByRank(int gpuId) {
        List<GpuList> similarGpu = new ArrayList<>();

        List<GpuList> sortedGpuList = gpuListRepository.findByOrderByGpuRankAsc();

        int findRank = gpuListRepository.findByGpuId(gpuId).getGpuRank();

        int startRank = Math.max(findRank - 4, 1); // 랭크가 1보다 작아지는 경우를 처리해줍니다.
        int endRank = Math.min(findRank + 5, sortedGpuList.size()); // 랭크가 size보다 커지는 경우를 처리해줍니다.

        for(int i = startRank; i <= endRank; i++){
            similarGpu.add(sortedGpuList.get(i-1));
        }
        // 선택한 랭크가 5보다 작은 경우 부족한 만큼 이전 랭크를 채웁니다.
        while(similarGpu.size() < 10 && startRank > 1) {
            similarGpu.add(sortedGpuList.get(--startRank-1));
        }
        // 선택한 랭크가 size-5보다 큰 경우 부족한 만큼 다음 랭크를 채웁니다.
        while(similarGpu.size() < 10 && endRank < sortedGpuList.size()) {
            similarGpu.add(sortedGpuList.get(++endRank-1));
        }

        return similarGpu;
    }

    public List<String> searchSelectRamByRank() {
        List<String> similarRam = new ArrayList<>();

        List<UserInsertInfo> userinsertinfo = userInsertInfoRepository.findAll();
        List<RamList> RamList = ramListRepository.findAll();

        String lastIndex = userinsertinfo.get(userinsertinfo.size()-1).getSelectedRam();

        double findReadSpeed = ramListRepository.findByRamName(lastIndex).getRamRead();

        return similarRam;
    }

    public List<String> searchPossessCpuByRank() {
        List<String> similarCpu = new ArrayList<>();

        List<UserInsertInfo> userinsertinfo = userInsertInfoRepository.findAll();
        List<CpuList> sortedCpuList = cpuListRepository.findByOrderByCpuRankAsc();

        String userCpu = compareService.getMatchingCpu().getCpuName();

        int findRank = cpuListRepository.findByCpuName(userCpu).getCpuRank();

        int startRank = Math.max(findRank - 4, 1); // 랭크가 1보다 작아지는 경우를 처리해줍니다.
        int endRank = Math.min(findRank + 5, sortedCpuList.size()); // 랭크가 size보다 커지는 경우를 처리해줍니다.

        for(int i = startRank; i <= endRank; i++){
            similarCpu.add(sortedCpuList.get(i-1).getCpuName());
        }
        // 선택한 랭크가 5보다 작은 경우 부족한 만큼 이전 랭크를 채웁니다.
        while(similarCpu.size() < 10 && startRank > 1) {
            similarCpu.add(sortedCpuList.get(--startRank-1).getCpuName());
        }
        // 선택한 랭크가 size-5보다 큰 경우 부족한 만큼 다음 랭크를 채웁니다.
        while(similarCpu.size() < 10 && endRank < sortedCpuList.size()) {
            similarCpu.add(sortedCpuList.get(++endRank-1).getCpuName());
        }

        return similarCpu;
    }

    public List<String> searchPossessGpuByRank() {
        List<String> similarGpu = new ArrayList<>();

        List<UserInsertInfo> userinsertinfo = userInsertInfoRepository.findAll();
        List<GpuList> sortedGpuList = gpuListRepository.findByOrderByGpuRankAsc();

        String userGpu = compareService.getMatchingGpu().getGpuName();

        int findRank = gpuListRepository.findByGpuName(userGpu).getGpuRank();

        int startRank = Math.max(findRank - 4, 1); // 랭크가 1보다 작아지는 경우를 처리해줍니다.
        int endRank = Math.min(findRank + 5, sortedGpuList.size()); // 랭크가 size보다 커지는 경우를 처리해줍니다.

        for(int i = startRank; i <= endRank; i++){
            similarGpu.add(sortedGpuList.get(i-1).getGpuName());
        }
        // 선택한 랭크가 5보다 작은 경우 부족한 만큼 이전 랭크를 채웁니다.
        while(similarGpu.size() < 10 && startRank > 1) {
            similarGpu.add(sortedGpuList.get(--startRank-1).getGpuName());
        }
        // 선택한 랭크가 size-5보다 큰 경우 부족한 만큼 다음 랭크를 채웁니다.
        while(similarGpu.size() < 10 && endRank < sortedGpuList.size()) {
            similarGpu.add(sortedGpuList.get(++endRank-1).getGpuName());
        }

        return similarGpu;
    }

    public List<CpuList> searchSelectCpuByValue(int cpuId) {
        List<CpuList> similarCpu = new ArrayList<>();

        List<CpuList> sortedList = cpuListRepository.findByCpuValueNotOrderByCpuValueAsc(0);

        double findValue = cpuListRepository.findByCpuId(cpuId).getCpuValue();
        if(findValue == 0){
            System.out.println("선택한 value 가 0입니다");
            similarCpu.add(cpuListRepository.findByCpuId(cpuId));
        }
        else{
            //알고리즘
            Collections.sort(sortedList, Comparator.comparingDouble(cpu -> Math.abs(cpu.getCpuValue() - findValue)));

            int i = 0;
            while (similarCpu.size() < 10 && i < sortedList.size()) {
                CpuList cpu = sortedList.get(i++);
                similarCpu.add(cpu);
            }
        }

        return similarCpu;
    }

    public List<GpuList> searchSelectGpuByValue(int gpuId) {
        List<GpuList> similarGpu = new ArrayList<>();

        List<GpuList> sortedList = gpuListRepository.findByGpuValueNotOrderByGpuValueAsc(0);

        double findValue = gpuListRepository.findByGpuId(gpuId).getGpuValue();

        if(findValue == 0){
            System.out.println("선택한 value 가 0입니다");
            similarGpu.add(gpuListRepository.findByGpuId(gpuId));
        }
        else{
            //알고리즘
            Collections.sort(sortedList, Comparator.comparingDouble(cpu -> Math.abs(cpu.getGpuValue() - findValue)));

            int i = 0;
            while (similarGpu.size() < 10 && i < sortedList.size()) {
                GpuList gpu = sortedList.get(i++);
                similarGpu.add(gpu);
            }
        }

        return similarGpu;
    }

    public List<String> searchPossessCpuByValue() {
        List<String> similarCpu = new ArrayList<>();

        List<UserInsertInfo> userinsertinfo = userInsertInfoRepository.findAll();
        List<CpuList> sortedList = cpuListRepository.findByCpuValueNotOrderByCpuValueAsc(0);

        String userCpu = compareService.getMatchingCpu().getCpuName();

        double findValue = cpuListRepository.findByCpuName(userCpu).getCpuValue();
        if(findValue == 0){
            System.out.println("선택한 value 가 0입니다");
            similarCpu.add(userCpu);
        }
        else{
            //알고리즘
            Collections.sort(sortedList, Comparator.comparingDouble(cpu -> Math.abs(cpu.getCpuValue() - findValue)));

            int i = 0;
            while (similarCpu.size() < 10 && i < sortedList.size()) {
                CpuList cpu = sortedList.get(i++);
                similarCpu.add(cpu.getCpuName());
            }
        }

        return similarCpu;
    }

    public List<String> searchPossessGpuByValue() {
        List<String> similarGpu = new ArrayList<>();

        List<UserInsertInfo> userinsertinfo = userInsertInfoRepository.findAll();
        List<GpuList> sortedList = gpuListRepository.findByGpuValueNotOrderByGpuValueAsc(0);

        String userGpu = compareService.getMatchingGpu().getGpuName();

        double findValue = gpuListRepository.findByGpuName(userGpu).getGpuValue();
        if(findValue == 0){
            System.out.println("선택한 value 가 0입니다");
            similarGpu.add(userGpu);
        }
        else{
            //알고리즘
            Collections.sort(sortedList, Comparator.comparingDouble(cpu -> Math.abs(cpu.getGpuValue() - findValue)));

            int i = 0;
            while (similarGpu.size() < 10 && i < sortedList.size()) {
                GpuList gpu = sortedList.get(i++);
                similarGpu.add(gpu.getGpuName());
            }
        }

        return similarGpu;
    }


}
