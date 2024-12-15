package com.crudapplication.crudapplication.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.crudapplication.crudapplication.entity.Students;

@Repository
public interface StudentRepo extends JpaRepository <Students, Integer> {

}
