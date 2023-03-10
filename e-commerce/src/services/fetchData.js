import axios from "axios";

async function fetchPopularCategory(url, setPopularCategory) {
  const result = await axios.get(url);
  setPopularCategory(result.data);
}

async function fetchProducts(url, setProducts) {
  const result = await axios.get(url);
  setProducts(result.data);
}

export { fetchPopularCategory, fetchProducts };
