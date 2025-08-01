package com.greennest.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.greennest.dto.AddPlantDTO;
import com.greennest.entities.Plant;
import com.greennest.services.PlantService;

import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/plants")
//@CrossOrigin(origins="http://localhost:3000")
@AllArgsConstructor
public class PlantController {
	private final PlantService plantService;
	
	@GetMapping
	public ResponseEntity<?> listAvailableRestaurants(){
		System.out.println("in list");
		List<Plant> plants = plantService.getAllPlants();
		if(plants.isEmpty())
			return ResponseEntity
					.status(HttpStatus.NO_CONTENT).build();
		return ResponseEntity.ok(plants);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> getPlant(@PathVariable Long id){
		System.out.println("in get" + id);
		Plant plant = plantService.getPlant(id);
		if(plant == null)
			return ResponseEntity
					.status(HttpStatus.NO_CONTENT).build();
		return ResponseEntity
				.ok(plant);
	}
	
	@PostMapping
	@Operation(description = "Add new Restaurant")
	public ResponseEntity<?> addNewPlant(@RequestBody AddPlantDTO dto){
		System.out.println("in dto: " + dto);
		//call service method
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(plantService.addPlant(dto));
	}
}
