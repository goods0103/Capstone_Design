package com.hadoop.demo.Model;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "gamelist", indexes = @Index(name = "idx_game_name", columnList = "game_name"))
public class GameList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int gameId2;

    @Column(name = "game_name")
    private String gameName;

    @Column(name = "game_id")
    private int gameId;

    @Column(name = "minimum_game_cpu")
    private String minimumGameCpu;

    @Column(name = "minimum_game_gpu")
    private String minimumGameGpu;

    @Column(name = "recommended_game_cpu")
    private String recommendedGameCpu;

    @Column(name = "recommended_game_gpu")
    private String recommendedGameGpu;

    @Column(name = "minimum_game_ram")
    private Integer minimumGameRam;

    @Column(name = "recommended_game_ram")
    private Integer recommendedGameRam;

    @Column(name = "game_img")
    private String gameImg;

    @Column(name = "min_state")
    private int minState;

    @Column(name = "rec_state")
    private int recState;

    @Column(name = "test_count")
    private int testCount;

    @Builder

    public GameList(int gameId2, String gameName, int gameId, String minimumGameCpu, String minimumGameGpu, String recommendedGameCpu, String recommendedGameGpu, Integer minimumGameRam, Integer recommendedGameRam, String gameImg, int minState, int recState) {
        this.gameId2 = gameId2;
        this.gameName = gameName;
        this.gameId = gameId;
        this.minimumGameCpu = minimumGameCpu;
        this.minimumGameGpu = minimumGameGpu;
        this.recommendedGameCpu = recommendedGameCpu;
        this.recommendedGameGpu = recommendedGameGpu;
        this.minimumGameRam = minimumGameRam;
        this.recommendedGameRam = recommendedGameRam;
        this.gameImg = gameImg;
        this.minState = minState;
        this.recState = recState;
    }

}
