package com.hadoop.demo.Repository;

import com.hadoop.demo.Model.CpuList;
import com.hadoop.demo.Model.GameList;
import com.hadoop.demo.Model.GameListOrigin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameListOriginRepository extends JpaRepository<GameListOrigin, Long> {

    GameListOrigin findByGameName(String gameName);

    GameListOrigin findByGameId(int Id);
}
