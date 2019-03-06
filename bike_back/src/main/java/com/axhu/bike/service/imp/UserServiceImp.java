package com.axhu.bike.service.imp;

import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import com.axhu.bike.pojo.User;
import com.axhu.bike.service.UserService;
import com.github.qcloudsms.SmsSingleSender;
import com.github.qcloudsms.SmsSingleSenderResult;

@Service
public class UserServiceImp implements UserService {
	
	@Autowired  //引入reds接口
	private StringRedisTemplate stringRedisTemplate;
	
	@Autowired  //引入mongodb接口
	private MongoTemplate mongoTemplate;
	
	@Override
	public boolean sendMsg(String countryCode, String phoneNum) {
		boolean flag = true;
		
		//调用腾讯云的短信API
		int appid = Integer.parseInt(stringRedisTemplate.opsForValue().get("appid")); 
		String appkey = stringRedisTemplate.opsForValue().get("appkey");
		//生成一个随机的数字（4位）
		String code = (int)((Math.random() * 9 + 1 ) * 1000) + "";
		//指定模板ID单发短信
		SmsSingleSender ssender = new SmsSingleSender(appid, appkey);
	    SmsSingleSenderResult result = null;
		try {
			//向对应手机号的用户发送短信
			result = ssender.send(0, countryCode, phoneNum,"" + code, "","");
			//将发送的手机号作为key,验证码作为value保存到redis中 设置60秒失效
			stringRedisTemplate.opsForValue().set(phoneNum, code, 60, TimeUnit.SECONDS);
		} catch (Exception e) {
			flag = false;
			e.printStackTrace();
		}
	    System.out.println("短信发送反馈: "+result); 
		return flag;
	}

	
	@Override
	public boolean verify(String phoneNum, String verifyCode) {
		boolean flag = false;
		//调用RedisTemplate，根据手机号的key，查找对应的验证码
		//查询Redis中保存的验证码
		String code = stringRedisTemplate.opsForValue().get(phoneNum);
		//将前台的验证码和Redis的进行比较
		if(code != null && code.equals(verifyCode)) {
			flag = true;
		}
		return flag;
	}


	@Override
	public void register(User user) {
		//将用户信息插入mongoDB
		mongoTemplate.insert(user,"users");
	}

}
