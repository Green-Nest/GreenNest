package com.greennest.exception_handler;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.greennest.custom_exceptions.ApiException;
import com.greennest.custom_exceptions.ResourceNotFoundException;
import com.greennest.dto.ApiResponse;

@RestControllerAdvice
public class GlobalExceptionHandler {
	@ExceptionHandler(ApiException.class)
	public ResponseEntity<?> handleApiException(ApiException e){
		System.out.println("in handle api exc");
		return ResponseEntity.status(HttpStatus.CONFLICT).body(new ApiResponse(e.getMessage()));
	}
	
	public ResponseEntity<?> handleResourceNotFoundException(ResourceNotFoundException e){
		System.out.println("in handle res not found exc");
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage()));
	}
	
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<?> handleArgumentNotValidException(MethodArgumentNotValidException e){
		System.out.println("in handle P.L validation failures @Valid");
		//create Map of rejected fields n error msg
		//eg. firstname - mandatory field...
		//1. get list of rejected fields
		List<FieldError> fieldErrors = e.getFieldErrors();
		
		//2. Convert -> Map<key - string fieldname, value - string err msg>
		Map<String, String> errorMap=new HashMap<>();
		fieldErrors.forEach(fieldError -> 
		errorMap.put(fieldError.getField(), fieldError.getDefaultMessage()));
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMap);
	}
	
	//equivalent to catch-all
	@ExceptionHandler(Exception.class)
	public ResponseEntity<?> handleException(Exception e){
		System.out.println("in catch all exc " + e);
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
	}
//	public ResponseEntity<?> handleAuthenticationException(AuthenticationException e){
//		System.out.println("in catch all exc " + e);
//		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiResponse(e.getMessage()));
//	}
	
}
