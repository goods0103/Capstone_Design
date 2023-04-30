package com.hadoop.demo.Model;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "gamelist")
public class GameList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int gameId2;

    @Column(name = "game_name")
    private String gameName;

    @Column(name = "game_id")
    private int gameId;

    @Column(name = "minimum_game_cpu1")
    private String minimumGameCpu1;

    @Column(name = "minimum_game_cpu2")
    private String minimumGameCpu2;

    @Column(name = "minimum_game_gpu1")
    private String minimumGameGpu1;

    @Column(name = "minimum_game_gpu2")
    private String minimumGameGpu2;

    @Column(name = "recommended_game_cpu1")
    private String recommendedGameCpu1;

    @Column(name = "recommended_game_cpu2")
    private String recommendedGameCpu2;

    @Column(name = "recommended_game_gpu1")
    private String recommendedGameGpu1;

    @Column(name = "recommended_game_gpu2")
    private String recommendedGameGpu2;

    @Column(name = "minimum_game_ram")
    private Integer minimumGameRam;

    @Column(name = "recommended_game_ram")
    private Integer recommendedGameRam;

    @Column(name = "game_img")
    private String gameImg;

    @Builder
    public GameList(int gameId2, String gameName, int gameId, String minimumGameCpu1, String minimumGameCpu2, String minimumGameGpu1, String minimumGameGpu2, String recommendedGameCpu1, String recommendedGameCpu2, String recommendedGameGpu1, String recommendedGameGpu2, Integer minimumGameRam, Integer recommendedGameRam, String gameImg) {
        this.gameId2 = gameId2;
        this.gameName = gameName;
        this.gameId = gameId;
        this.minimumGameCpu1 = minimumGameCpu1;
        this.minimumGameCpu2 = minimumGameCpu2;
        this.minimumGameGpu1 = minimumGameGpu1;
        this.minimumGameGpu2 = minimumGameGpu2;
        this.recommendedGameCpu1 = recommendedGameCpu1;
        this.recommendedGameCpu2 = recommendedGameCpu2;
        this.recommendedGameGpu1 = recommendedGameGpu1;
        this.recommendedGameGpu2 = recommendedGameGpu2;
        this.minimumGameRam = minimumGameRam;
        this.recommendedGameRam = recommendedGameRam;
        this.gameImg = gameImg;
    }





}
