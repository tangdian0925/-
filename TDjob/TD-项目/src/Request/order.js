import request from "../common/request";
import { host } from "../common/config";

export async function Order({ start, end }) {
  const result = await request({
    url: `${host}/order?start=${start}&end=${end}`,
    method: "get"
  });

  return result;
}
