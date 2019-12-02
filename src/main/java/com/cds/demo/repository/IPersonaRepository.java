package com.cds.demo.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.cds.demo.entity.Persona;

@Repository
public interface IPersonaRepository extends CrudRepository<Persona,Integer>{

}
