/*
 * @Description: 这是***页面（组件）
 * @Date: 2023-01-19 17:31:57
 * @Author: linguanyuan
 * @LastEditors: linguanyuan
 * @LastEditTime: 2023-02-03 16:20:23
 */
import axios from "@/util/axios";

export const getUser = (data) => axios.get( "/api/getUser"); // 用户数据

export const imgCode = (data) => axios.get( "/api/imgcode"); // 图形验证码

export const sms = (data) => axios.post( "/api/userSms", data); // 图形验证码
