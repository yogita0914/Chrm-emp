import React from "react";
import { useParams } from "react-router-dom";
import ProductPage from "../component/ProductPage/ProductPage";

function SeasonWearDetails() {
  const { seasonwear, id } = useParams();

  if (seasonwear && id) {
    console.log(seasonwear);
    return <ProductPage />;
  }
}

export default SeasonWearDetails;
