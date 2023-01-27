package com.tawin.tawinmanagementsystem.respone;

import java.util.List;

public class JwtResponse {
	private String token;
	private String type = "Bearer";
	private Long id;
	private String username;
	private String name_Emp;
	private String phone;
	private String address;
	private String line;
	private String image;
	private List<String> roles;

	public JwtResponse(String accessToken, Long id, String username, String phone, String name_Emp,
			String address, String line, String image, List<String> roles) {
		this.token = accessToken;
		this.id = id;
		this.username = username;
		this.phone = phone;
		this.name_Emp = name_Emp;
		this.address = address;
		this.line = line;
		this.image = image;
		this.roles = roles;
	}



	public String getAccessToken() {
		return token;
	}

	public void setAccessToken(String accessToken) {
		this.token = accessToken;
	}

	public String getTokenType() {
		return type;
	}

	public void setTokenType(String tokenType) {
		this.type = tokenType;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getName_Emp() {
		return name_Emp;
	}

	public void setName_Emp(String name_Emp) {
		this.name_Emp = name_Emp;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getLine() {
		return line;
	}

	public void setLine(String line) {
		this.line = line;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public List<String> getRoles() {
		return roles;
	}
}
