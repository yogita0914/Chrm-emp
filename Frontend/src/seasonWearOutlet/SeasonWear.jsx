import React from "react";
import Winterwear from "../pages/clothes/winterwear/WinterWear";
import SummerWear from "../pages/clothes/SummerWear/Summerwear";
import BottomWear from "../pages/clothes/bottomwear/BottomWear";
import Top from "../pages/clothes/tops/Tops";
import Dresses from "../pages/clothes/dresses/Dresses";
import Sneakers from "../pages/Shoes/Sneakers/Sneakers";
import Lipstick from "../pages/makeup/lipstick/Lipstick";
import Eyeshadow from "../pages/makeup/eyeshadow/Eyeshadow";
import Home from "../pages/home/Home";
import { useParams } from "react-router-dom";
import Heels from "../pages/Shoes/Heels/Heels";
import Sports from "../pages/Shoes/sports/Sports";
import Mascara from "../pages/makeup/Mascara/Mascara";
import Blush from "../pages/makeup/blush/Blush";
import Foundation from "../pages/makeup/foundation/foundation";
import FormalShoes from "../pages/Shoes/formalshoes/FormalShoes";

function SeasonWear() {
  const { seasonwear } = useParams();
  console.log(seasonwear);

  // Conditionally render based on the seasonwear
  switch (seasonwear) {
    case "winterwear":
      return <Winterwear />;
    case "summerwear":
      return <SummerWear />;
    case "bottomwear":
      return <BottomWear />;
    case "tops":
      return <Top />;
    case "dresses":
      return <Dresses />;

    case "heels":
      return <Heels />;
    case "sneakers":
      return <Sneakers />;
    case "formals":
      return <FormalShoes />;
    case "sports":
      return <Sports />;

    case "lipstick":
      return <Lipstick />;
    case "eyeshadow":
      return <Eyeshadow />;
    case "mascara":
      return <Mascara />;
    case "blush":
      return <Blush />;
    case "foundation":
      return <Foundation />;

    default:
      return <Home />;
  }
}

export default SeasonWear;
