package com.tawin.tawinmanagementsystem.controller;

import org.springframework.core.io.ByteArrayResource;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/menu")
public class ImageUploadControllor {
    @RequestMapping(value = "getimages/{menu_Pic}", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<ByteArrayResource> getImage(@PathVariable("menu_Pic") String menu_Pic) {
        if (!menu_Pic.equals("") || menu_Pic != null) {
            try {
                Path filename = Paths.get("uploads", menu_Pic);
                byte[] buffer = Files.readAllBytes(filename);
                ByteArrayResource byteArrayResource = new ByteArrayResource(buffer);
                return ResponseEntity.ok()
                        .contentLength(buffer.length)
                        .contentType(MediaType.parseMediaType("image/png"))
                        .body(byteArrayResource);
            } catch (Exception e) {
            }
        }
        return ResponseEntity.badRequest().build();
    }

    @RequestMapping(value = "getimagesEmp/{img}", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<ByteArrayResource> getImageEmp(@PathVariable("img") String img) {
        if (!img.equals("") || img != null) {
        	System.out.println("not null");
            try {
                Path filename = Paths.get("imageEmp", img);
                byte[] buffer = Files.readAllBytes(filename);
                ByteArrayResource byteArrayResource = new ByteArrayResource(buffer);
                return ResponseEntity.ok()
                        .contentLength(buffer.length)
                        .contentType(
                            MediaType.IMAGE_JPEG
                            )
                        .body(byteArrayResource);
            } catch (Exception e) {
            }
        }
        return ResponseEntity.badRequest().build();
    }
    @RequestMapping(value = "getimagesPay/{img}", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<ByteArrayResource> getImagePay(@PathVariable("img") String img) {
        if (!img.equals("") || img != null) {
            try {
                Path filename = Paths.get("imagePay", img);
                byte[] buffer = Files.readAllBytes(filename);
                ByteArrayResource byteArrayResource = new ByteArrayResource(buffer);
                return ResponseEntity.ok()
                        .contentLength(buffer.length)
                        .contentType(
                            MediaType.IMAGE_JPEG
                            )
                        .body(byteArrayResource);
            } catch (Exception e) {
            }
        }
        return ResponseEntity.badRequest().build();
    }
}
