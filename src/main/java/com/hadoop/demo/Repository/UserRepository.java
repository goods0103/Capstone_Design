package com.hadoop.demo.Repository;
import com.hadoop.demo.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

}