import { useEffect, useState } from "react";
import axios from "axios";
export default function useCheckAreDiscount(props) {
  const [discount, setDiscount] = useState(null);
  const fetchDiscount = async () => {
    return await axios
      .get(`/api/programs/are_discount/`)
      .then((res) => {
        setDiscount(res.data);
      })
      .catch((err) => {
        setDiscount(false);
      });
  };
  useEffect(() => {
    fetchDiscount();
  }, []);
  return [discount, fetchDiscount];
}
