package com.greennest.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@NoArgsConstructor
@ToString
@Getter
@Setter
public class Properties {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="is_vegetable")
	private boolean isVegetable;
	
	@Column(name="is_flowering")
	private boolean isFlowering;
	
	@Column(name="is_grass")
	private boolean isGrass;
	
	@Column(name="is_herb")
	private boolean isHerb;
	
	@Column(name="is_tree")
	private boolean isTree;
	
	@Column(name="is_indoor")
	private boolean isIndoor;
	
	@Column(name="is_outdoor")
	private boolean isOutdoor;
	
	@Column(name="is_low_maintenance")
	private boolean isLowMaintenance;
	
	@Column(name="is_low_light")
	private boolean isLowLight;
	
	@Column(name="is_hanging")
	private boolean isHanging;
	
	@Column(name="is_aromatic")
	private boolean isAromatic;
	
	@Column(name="is_medicinal")
	private boolean isMedicinal;
	
	public Properties(boolean isVegetable, boolean isFlowering, boolean isGrass, boolean isHerb, boolean isTree, boolean isIndoor, boolean isOutdoor, boolean isLowMaintenance, boolean isLowLight, boolean isHanging, boolean isAromatic, boolean isMedicinal) {
		this.isVegetable = isVegetable;
		this.isFlowering = isFlowering;
		this.isGrass = isGrass;
		this.isHerb = isHerb;
		this.isTree = isTree;
		this.isIndoor = isIndoor;
		this.isOutdoor = isOutdoor;
		this.isLowMaintenance = isLowMaintenance;
		this.isLowLight = isLowLight;
		this.isHanging = isHanging;
		this.isAromatic = isAromatic;
		this.isMedicinal = isMedicinal;
	}
}

	
