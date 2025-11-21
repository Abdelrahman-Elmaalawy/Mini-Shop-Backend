import api from "../../axios"; 
import mobile1 from "../assets/mobile-.png";
import mobile2 from "../assets/mobile2-.png";
import mobile3 from "../assets/mobile3-.png";
import watch1 from "../assets/watch-.png";
import watch2 from "../assets/watch2-.png";
import watch3 from "../assets/watch3-.png";

export const mobilePlaceholder = [mobile1, mobile2, mobile3];
export const watchPlaceholder = [watch1, watch2, watch3];

export const getProducts = (page = 1, category = "", perPage = 12) => {
  let url = `/products?page=${page}&per_page=${perPage}`;
  if (category) {
    url += `&category=${category}`;
  }
  return api.get(url);
};
