package com.hadoop.demo.Model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "gamelist")
public class GameList {

    @Id
    @JsonProperty("game_name")
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

    @Column(name = "recomended_game_cpu1")
    private String recomendedGameCpu1;

    @Column(name = "recomended_game_cpu2")
    private String recomendedGameCpu2;

    @Column(name = "recomended_game_gpu1")
    private String recomendedGameGpu1;

    @Column(name = "recomended_game_gpu2")
    private String recomendedGameGpu2;

    @Column(name = "minimum_game_ram")
    private Integer minimumGameRam;

    @Column(name = "recomended_game_ram")
    private Integer recomendedGameRam;

    @Column(name = "game_img")
    private String gameImg;

    @Builder
    public GameList(String gameName, int gameId, String minimumGameCpu1, String minimumGameCpu2, String minimumGameGpu1, String minimumGameGpu2, String recomendedGameCpu1, String recomendedGameCpu2, String recomendedGameGpu1, String recomendedGameGpu2, int minimumGameRam, int recomendedGameRam, String gameImg) {
        this.gameName = gameName;
        this.gameId = gameId;
        this.minimumGameCpu1 = minimumGameCpu1;
        this.minimumGameCpu2 = minimumGameCpu2;
        this.minimumGameGpu1 = minimumGameGpu1;
        this.minimumGameGpu2 = minimumGameGpu2;
        this.recomendedGameCpu1 = recomendedGameCpu1;
        this.recomendedGameCpu2 = recomendedGameCpu2;
        this.recomendedGameGpu1 = recomendedGameGpu1;
        this.recomendedGameGpu2 = recomendedGameGpu2;
        this.minimumGameRam = minimumGameRam;
        this.recomendedGameRam = recomendedGameRam;
        this.gameImg = gameImg;
    }

}
