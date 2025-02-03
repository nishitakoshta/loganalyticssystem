package com.example.loganalyticssystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;
@SpringBootApplication
@EnableElasticsearchRepositories(basePackages = "com.example.loganalyticssystem.repository")
public class LoganalyticssystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(LoganalyticssystemApplication.class, args);
	}

}
