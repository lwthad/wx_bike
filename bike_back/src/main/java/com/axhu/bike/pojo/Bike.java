package com.axhu.bike.pojo;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

//声明本Bike和mongo的"bike"collection关联起来
@Document(collection="bike")
public class Bike {
	@Id
	private String id;
	private double longitude;
	private double latitude;
	@Indexed
	private Long bikeNo;
	private int status;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public double getLongitude() {
		return longitude;
	}
	public void setLongitude(double longitude) {
		this.longitude = longitude;
	}
	public double getLatitude() {
		return latitude;
	}
	public void setLatitude(double latitude) {
		this.latitude = latitude;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public Long getBikeNo() {
		return bikeNo;
	}
	public void setBikeNo(Long bikeNo) {
		this.bikeNo = bikeNo;
	}
	
}
