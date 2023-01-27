package com.tawin.tawinmanagementsystem.repository;
import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.tawin.tawinmanagementsystem.entity.ERole;
import com.tawin.tawinmanagementsystem.entity.Role;





@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
  Optional<Role> findByName(ERole name);
}
