package com.greennest.dto;

import com.greennest.entities.Properties;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PlantDTO extends BaseDTO{
	private String title;
	private String description;
	private Properties properties;
	private double price;
	private int stock;
	private String imageUrl;
}
