package com.greennest.services;

import java.util.List;

import com.greennest.dto.AddPlantDTO;
import com.greennest.dto.ApiResponse;
import com.greennest.entities.Plant;

public interface PlantService {
	List<Plant> getAllPlants();
	Plant getPlant(Long id);
	ApiResponse addPlant(AddPlantDTO plant);
	ApiResponse updatePlant(String title, AddPlantDTO dto);
	ApiResponse deletePlant(Long id);
}
