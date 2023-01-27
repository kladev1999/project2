package com.tawin.tawinmanagementsystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class })
public class TawinmanagementsystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(TawinmanagementsystemApplication.class, args);
	}

	

}
