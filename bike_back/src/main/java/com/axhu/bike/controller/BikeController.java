package com.axhu.bike.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.axhu.bike.pojo.Bike;
import com.axhu.bike.service.BikeService;

@Controller
public class BikeController {
	
	@Autowired
	private BikeService bikeService;
	
	/**
	 * 增加单车
	 * @param bike
	 * @return
	 */
	@RequestMapping("/addBike")
	@ResponseBody
	public String add(@RequestBody Bike bike) {
		bikeService.save(bike);
		return "success ";
	}
}
