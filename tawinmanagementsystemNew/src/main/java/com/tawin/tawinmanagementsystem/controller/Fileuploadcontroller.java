package com.tawin.tawinmanagementsystem.controller;

import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.tawin.tawinmanagementsystem.helper.FileHelper;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class Fileuploadcontroller {

	@Autowired
	private FileHelper fileHelper;

	@PostMapping("/file-upload")
	public ResponseEntity<String> uploads(@RequestParam("file") MultipartFile file) {

		try {
			if (file.isEmpty()) {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Request must contain file");
			}

			boolean f = fileHelper.uploadFile(file);

			if (f) {

				return ResponseEntity.ok(ServletUriComponentsBuilder.fromCurrentContextPath().path("/images/")
						.path(file.getOriginalFilename()).toUriString());

			}

		} catch (Exception e) {

			e.printStackTrace();

		}

		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Some went wrong!");
	}

	@PostMapping("/file-upload-imageEmployees")
	public ResponseEntity<String> uploadsImageEmployee(@RequestParam("file") MultipartFile file) {
		
		try {
			if (file.isEmpty()) {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Request must contain file");
			}

			boolean f = fileHelper.uploadFileEmp(file);

			if (f) {

				return ResponseEntity.ok(ServletUriComponentsBuilder.fromCurrentContextPath().path("/imagesEmp/")
						.path(file.getOriginalFilename()).toUriString());

			}

		} catch (Exception e) {

			e.printStackTrace();

		}

		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Some went wrong!");
	}

	@PostMapping("/file-upload-pay")
	public ResponseEntity<String> uploadsImagePay(@RequestParam("file") MultipartFile file) {
		try {
			if (file.isEmpty()) {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Request must contain file");
			}

			boolean f = fileHelper.uploadFilePay(file);

			if (f) {

				return ResponseEntity.ok(ServletUriComponentsBuilder.fromCurrentContextPath().path("/imagesPay/")
						.path(file.getOriginalFilename()).toUriString());

			}

		} catch (Exception e) {

			e.printStackTrace();

		}

		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Some went wrong!");
	}

}