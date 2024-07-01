import axios from 'axios'

export  const fetchProduct = async (setProducts) => {
    try {
      const response = await axios.get("http://localhost:5500/inventory");
      console.log(response.data);
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };