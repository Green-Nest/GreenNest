package com.greennest.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.greennest.entities.Plant;

public interface PlantDao extends JpaRepository<Plant, Long>{
	//derived finder method
	List<Plant> findByStatusTrue();
	boolean existsByTitle(String title);
	@Query("select p from Plant p left join fetch p.properties where p.id=:id and p.status=true")
	Plant fetchCompleteDetail(Long id);
}
