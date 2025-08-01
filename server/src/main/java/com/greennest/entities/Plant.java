package com.greennest.entities;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@NoArgsConstructor
@ToString
@Getter
@Setter
public class Plant extends BaseEntity{
	
	private String title;
	private String description;
	
	@OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "properties_id")
	private Properties properties;
	
	private double price;
	private int stock;
	@Column(name="image_url")
	private String imageUrl;
	private boolean status;
	public Plant(String title, String description, Properties properties, double price, int stock, String imageUrl) {
		this.title = title;
		this.description = description;
		this.properties = properties;
		this.price = price;
		this.stock = stock;
		this.imageUrl = imageUrl;
	}
}