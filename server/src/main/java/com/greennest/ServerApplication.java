package com.greennest;


import org.modelmapper.Condition;
import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
	}
	@Bean
	ModelMapper modelMapper() {
		System.out.println("creating model mapper");
		Condition<?, ?> condition = ctx ->{
			Object sourceValue = ctx.getSource();
			if(sourceValue == null) return false;
			if(sourceValue instanceof Number) return ((Number) sourceValue).doubleValue() != 0.0;
			if(sourceValue instanceof Boolean) return (Boolean) sourceValue;
			if(sourceValue instanceof Character) return (Character) sourceValue != '\u0000';
			return true;
		};
		ModelMapper mapper = new ModelMapper();
		mapper.getConfiguration()
		.setMatchingStrategy(MatchingStrategies.STRICT)
		//transfer not null props
		.setPropertyCondition(Conditions.isNotNull())
		.setPropertyCondition(condition);
		return mapper;
	}

}
