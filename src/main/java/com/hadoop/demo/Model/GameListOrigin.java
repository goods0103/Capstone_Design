package com.hadoop.demo.Model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "gamelistorigin")
public class GameListOrigin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int gameOriginId;

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
    private String minimumGameRam;

    @Column(name = "recommended_game_ram")
    private String recommendedGameRam;


    @Builder
    public GameListOrigin(int gameOriginId, String gameName, int gameId, String minimumGameCpu, String minimumGameGpu,
                          String recommendedGameCpu, String recommendedGameGpu,
                          String minimumGameRam, String recommendedGameRam) {
        this.gameOriginId = gameOriginId;
        this.gameName = gameName;
        this.gameId = gameId;
        this.minimumGameCpu = minimumGameCpu;
        this.minimumGameGpu = minimumGameGpu;
        this.recommendedGameCpu = recommendedGameCpu;
        this.recommendedGameGpu = recommendedGameGpu;
        this.minimumGameRam = minimumGameRam;
        this.recommendedGameRam = recommendedGameRam;
    }

}
