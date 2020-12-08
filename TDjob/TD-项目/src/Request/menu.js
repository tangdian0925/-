import request from "../common/request";
import { host } from "../common/config";

export async function food({ id, page, limit, keyword }) {
  const result = await request({
    url: `${host}/food?restaurantId=${id}&page=${page}&limit=${limit}&keyword=${keyword}`,
    method: "get"
  });
  return result;
}
export async function foodClose(data) {
  const result = await request({
    url: `${host}/food`,
    method: "post",
    data
  });
  return result;
}
