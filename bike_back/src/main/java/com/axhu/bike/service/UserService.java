package com.axhu.bike.service;

import com.axhu.bike.pojo.User;

public interface UserService {
	/**
	 * 生成验证码
	 * @param countryCode
	 * @param phoneNum
	 * @return
	 */
	boolean sendMsg(String countryCode, String phoneNum);
	/**
	 * 校验验证码
	 * @param phoneNum
	 * @param verifyCode
	 * @return
	 */
	boolean verify(String phoneNum, String verifyCode);
	/**
	 * 注册用户
	 * @param user
	 * @return
	 */
	void register(User user);
}
