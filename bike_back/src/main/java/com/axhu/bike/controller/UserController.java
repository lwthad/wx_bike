package com.axhu.bike.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.axhu.bike.pojo.User;
import com.axhu.bike.service.UserService;

@Controller
public class UserController {
	@Autowired
	private UserService userService;
	
	/**
	 * 获取验证码
	 * @param phoneNum
	 * @param countryCode
	 * @return
	 */
	@RequestMapping("/user/genCode")
	@ResponseBody
	public boolean genVerifyCode(String phoneNum, String countryCode) {
		boolean flag = userService.sendMsg(countryCode, phoneNum);
		return flag;
	}
	
	/**
	 * 检验验证码和手机的正确性
	 * @param phoneNum
	 * @param verifyCode
	 * @return
	 */
	@RequestMapping("/user/verify")
	@ResponseBody
	public boolean verify(String phoneNum, String verifyCode) {
		boolean status = userService.verify(phoneNum,verifyCode);
		return status;
	}
	
	@RequestMapping("/user/register")
	@ResponseBody
	public boolean register(@RequestBody User user) { //@RequestBody： 将接收到的json数据set到pojo中
		boolean flag = true;
		try {
			userService.register(user);
		} catch (Exception e) {
			flag = false;
			e.printStackTrace();
		}
		return flag;
	}
}
