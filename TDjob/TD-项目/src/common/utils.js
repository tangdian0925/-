/* 引入加密依赖 */
import crypto from "crypto";
// import moment from "moment-timezone";
// import _ from "lodash";

export function setStorage(key, data) {
  if (!key) return;
  localStorage.setItem(key, JSON.stringify(data));
}

export function getStorage(key) {
  if (!key) return;
  let res = localStorage.getItem(key);
  try {
    return JSON.parse(res);
  } catch (err) {
    return res;
  }
}

export function cleanStorage(key) {
  if (!key) return;
  localStorage.removeItem(key);
}

/* 加密用户名，密码 */
export function encode(str) {
  const cipher = crypto.createCipher("aes192", "deliveryIsen");
  var crypted = cipher.update(str, "utf8", "hex");
  crypted += cipher.final("hex");
  return crypted;
}

/* 检测用户名 */
export function checkName(userName) {
  /* 4到16位，字母，数字，下划线，减号 */
  const pattern = /^[a-zA-Z0-9_-]{4,16}$/;

  return pattern.test(userName);
}

/* 检测密码 */
export function checkPassword(password) {
  /* 至少6位，至少1个大写字母，1个小写字母，1个数字，1个特殊符号 */
  const pattern = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;

  return pattern.test(password);
}

/* 检测确认密码 */
export function checkconfirmPassword(password) {
  const pattern = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;

  return pattern.test(password);
}

/* 验证餐馆是否关闭 */
// export function checkRestaurantClosed(restaurant) {
//   const date = new Date();
//   /* 纽约时间 */
//   const timezone = _.get(restaurant, "timezone");
//   const currentTime = moment.tz(date, timezone);
//   const newYorkTime = currentTime.hours() * 60 + currentTime.minutes();
//   /* 星期几 */
//   const currentWeek = currentTime.day();
//   /* 营业时间 */
//   const index = currentWeek - 1;
//   const bankingHour = _.get(restaurant, `hours[${index}]`);
//   /* 开始时间 */
//   const startHour = _.get(bankingHour, "start");
//   /* 结束时间 */
//   const endHour = _.get(bankingHour, "end");
//   /* 是否在营业时间 */
//   if (newYorkTime > endHour || newYorkTime < startHour) {
//     return false;
//   }
//   /* 是否人为关闭 */
//   const closed = _.get(restaurant, "closed", null);
//   if (closed !== null) {
//     return false;
//   }
//   return true;
// }
