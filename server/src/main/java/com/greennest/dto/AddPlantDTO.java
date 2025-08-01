package com.greennest.dto;

import com.greennest.entities.Properties;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class AddPlantDTO {
	private String title;
	private String description;
	private Properties properties;
	private double price;
	private int stock;
	private String imageUrl;
}
