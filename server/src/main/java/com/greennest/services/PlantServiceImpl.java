package com.greennest.services;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.greennest.custom_exceptions.ApiException;
import com.greennest.dao.PlantDao;
import com.greennest.dto.AddPlantDTO;
import com.greennest.dto.ApiResponse;
import com.greennest.entities.Plant;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class PlantServiceImpl implements PlantService {
	private final PlantDao plantDao;
	private final ModelMapper modelMapper;
	@Override
	public ApiResponse addPlant(AddPlantDTO dto) {
		Plant entity = modelMapper.map(dto, Plant.class);
		//unique name, set status: true(=> plant available)
		entity.setStatus(true);
		//invoke dao's method - save: insert
		Plant persistedPlant = plantDao.save(entity);
		return new ApiResponse("Added new plant with id: " + persistedPlant.getId());
	}
	@Override
	public List<Plant> getAllPlants() {
		return plantDao.findByStatusTrue();
	}
	@Override
	public Plant getPlant(Long id) {
		Plant entity = plantDao.fetchCompleteDetail(id);
		return entity;
	}
	@Override
	public ApiResponse updatePlant(String title, AddPlantDTO dto) {
		if(plantDao.existsByTitle(title))
			throw new ApiException("Duplicate Plant Name)
		return null;
	}
	@Override
	public ApiResponse deletePlant(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	

}
