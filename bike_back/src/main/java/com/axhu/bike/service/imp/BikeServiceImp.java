package com.axhu.bike.service.imp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import com.axhu.bike.pojo.Bike;
import com.axhu.bike.service.BikeService;

@Service
public  class BikeServiceImp implements BikeService {
	
	@Autowired  //引入mongodb接口
	private MongoTemplate mongoTemplate;
	
	@Override
	public void save(Bike bike) {
		//调用mongo的具体业务
		mongoTemplate.insert(bike,"bike");
	}
	
}
