import axios from "./axios";
import Cookies from "js-cookie";
import convertImageToBase64 from "./imageConverter";

export const getPlanktons = async () => {
  try {
    const access_token = Cookies.get("token");
    console.log(access_token);

    const response = await axios.get("planktons/", {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const data = response.data;
    console.log(data);

    if (typeof data === "object" && data !== null) {
      const productsArray = Object.values(data);
      if (Array.isArray(productsArray)) {
        return productsArray;
      } else {
        console.error(
          "API response cannot be transformed into an array:",
          data
        );
        return [];
      }
    } else {
      console.error("API response is not an object:", data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getOnePlankton = async (plankton_id: number) => {
  try {
    const access_token = Cookies.get("token");

    const response = await axios.get(`/planktons/${plankton_id}`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    console.log(response);

    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const createPlankton = async (data: {
  name: string;
  description: string;
  picture: string;
  localisation: string;
}) => {
  try {
    const access_token = Cookies.get("token");
    console.log(access_token);

    console.log(data.picture);

    const base64Image = await convertImageToBase64(data.picture);

    const response = await axios.post(
      "planktons/",
      {
        name: data.name,
        description: data.description,
        picture: base64Image,
        localisation: data.localisation,
      },
      { headers: { Authorization: `Bearer ${access_token}` } }
    );
    console.log(`response: ${response.data}`);

    return response.data;
  } catch (error) {
    console.error("Error adding plankton:", error);
    throw error;
  }
};
