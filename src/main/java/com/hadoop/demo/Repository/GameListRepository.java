package com.hadoop.demo.Repository;

import com.hadoop.demo.Model.GameList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameListRepository extends JpaRepository<GameList, Long> {

    GameList findByGameName(String gameName);
}
