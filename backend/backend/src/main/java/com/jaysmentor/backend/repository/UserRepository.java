package com.jaysmentor.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.jaysmentor.backend.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    // You can add custom queries later, like:
    User findByEmail(String email);
}
