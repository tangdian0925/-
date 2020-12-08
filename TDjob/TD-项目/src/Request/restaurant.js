import request from "../common/request";
import { host } from "../common/config";

export async function rest() {
  const result = await request({
    url: `${host}/restaurant/location/-74.0059413,40.7127837`,
    method: "get"
  });

  return result;
}

export async function updateRest(data) {
  const result = await request({
    url: `${host}/restaurant`,
    method: "post",
    data
  });

  return result;
}
export async function tags() {
  const result = await request({
    url: `${host}/tags`,
    method: "get"
  });

  return result;
}
