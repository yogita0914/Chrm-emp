const dressesData = [
  {
    id: 40400,
    name: "Elegant Long Maxi Dress - Wine",
    brand: "Unknown",
    price: 2200,
    originalPrice: 4400,
    discount: "50% off",
    size: "S, M, L, XL",
    images: [
      "https://i.ebayimg.com/images/g/-hMAAOSwR3xi2dTe/s-l400.jpg",
      "https://ahlabuy.com/img/p/1/5/7/5/9/3/0/1575930-large_default.jpg",
    ],
  },
  {
    id: 404002,
    name: "Flowy Teal Long Dress",
    brand: "Unknown",
    price: 3500,
    originalPrice: 7000,
    discount: "50% off",
    size: "S, M, L, XL",
    images: [
      "https://i.pinimg.com/originals/63/93/4e/63934ea2362d2153f693c23001071e24.jpg",
      "https://m.media-amazon.com/images/I/91FAtXUkkxL._AC_UY1100_.jpg",
    ],
  },
  {
    id: 404003,
    name: "Designer Lehenga For Weddings",
    brand: "Unknown",
    price: 15000,
    originalPrice: 30000,
    discount: "50% off",
    size: "M, L, XL",
    images: [
      "https://cfw43.rabbitloader.xyz/eyJjIjp0cnVlLCJoIjoibXltYW5kYXAuaW4iLCJ2IjozNTA3MDAwMTg5LCJyIjoxLCJpIjoiNmU2OWFlNDktYmRhYy00ZjY1LTYwNmItMTE5ZDM4MDQyNzAwIn0/wp-content/uploads/2022/12/Rajasthani-Bridal-Lehenga.jpg",

      "https://cygnusfashion.com/cdn/shop/products/KF-1229_2.jpg?v=1621667865",
    ],
  },
  {
    id: 404004,
    name: "Trendy And Beautiful Dresses For Women",
    brand: "Unknown",
    price: 5000,
    originalPrice: 10000,
    discount: "50% off",
    size: "S, M, L, XL",
    images: [
      "https://img.freepik.com/premium-photo/fashionable-hair-disheveled-braid-around-head-happy-beautiful-young-model-girl-summer-blossom-park_137237-1646.jpg",

      "https://i.pinimg.com/564x/9e/34/4d/9e344da3b339c0792706625d74180bdf.jpg",
    ],
  },
  {
    id: 404005,
    name: "Casual Long Floral Maxi Dress",
    brand: "Unknown",
    price: 3000,
    originalPrice: 6000,
    discount: "50% off",
    size: "S, M, L, XL",
    images: [
      "https://img4.dhresource.com/webp/m/0x0/f3/albu/km/m/06/5eea8544-9153-4eac-b079-56abb5d9460b.jpg",
      "https://m.media-amazon.com/images/I/81SjoGOOZAL._AC_UY1000_.jpg",
    ],
  },
  {
    id: 404006,
    name: "Elegant Maxi Dresses For Parties",
    brand: "Unknown",
    price: 5500,
    originalPrice: 11000,
    discount: "50% off",
    size: "S, M, L, XL",
    images: [
      "https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/d7d8e44a926ce25d9d1c59c69d310922.jpg?imageMogr2/auto-orient%7CimageView2/2/w/800/q/70/format/webp",

      "https://img.lazcdn.com/g/p/74e67ad68466d572c04f09a6b9a9cb14.jpg_720x720q80.jpg",
    ],
  },
  {
    id: 404007,
    name: "Party Wear Long Gown",
    brand: "Unknown",
    price: 7500,
    originalPrice: 15000,
    discount: "50% off",
    size: "S, M, L, XL",
    images: [
      "https://subhvastra.in/cdn/shop/files/photo_2023-09-16_11-39-34_800x.jpg?v=1697103095",

      "https://keziahfashions.com/wp-content/uploads/2024/08/party-long-dress-fawn-01081-1.jpg",
    ],
  },
  {
    id: 404008,
    name: "Traditional Sarees For Women",
    brand: "Unknown",
    price: 6000,
    originalPrice: 12000,
    discount: "50% off",
    size: "One Size",
    images: [
      "https://assets.ajio.com/medias/sys_master/root/20230731/7hIQ/64c7a11fa9b42d15c97bfb75/-1117Wx1400H-466399961-teal-MODEL.jpg",

      "https://5.imimg.com/data5/SELLER/Default/2024/10/458132988/NN/OF/PQ/10522266/ladies-traditional-saree-500x500.jpg",
    ],
  },
  {
    id: 404009,
    name: "Cotton Kurti And Pant Set",
    brand: "Unknown",
    price: 1900,
    originalPrice: 3800,
    discount: "50% off",
    size: "S, M, L, XL",
    images: [
      "https://stylum.in/cdn/shop/files/KPDBLUEKINZAL_1.jpg?v=1722249157&width=533",

      "https://5.imimg.com/data5/SELLER/Default/2022/2/HY/HX/XD/23366456/cotton-kurti-pant-dupatta-set.jpg",
    ],
  },
  {
    id: 4040010,
    name: "Elegant Long Frock for Events",
    brand: "Unknown",
    price: 9800,
    originalPrice: 19600,
    discount: "50% off",
    size: "S, M, L, XL",
    images: [
      "https://www.jiomart.com/images/product/500x630/rvtccoxqbu/sawalaji-fashion-designer-party-wear-gown-for-women-elegant-full-length-evening-dress-with-sequins-embellishments-perfect-for-special-occasions-weddings-proms-formal-events-great-for-traditional-events-festivals-blie-2xl-product-images-rvtccoxqbu-0-202410091735.jpg",

      "https://www.jiomart.com/images/product/original/rvm2he3a5u/sawalaji-fashion-designer-party-wear-gown-for-women-elegant-full-length-evening-dress-with-sequins-embellishments-perfect-for-special-occasions-weddings-proms-formal-events-great-for-traditional-events-festivals-black-l-product-images-rvm2he3a5u-7-202410091732.jpg?im=Resize=(1000,1000)",
    ],
  },
  {
    id: 4040011,
    name: "Fancy Bridal Lehenga",
    brand: "Unknown",
    price: 25000,
    originalPrice: 50000,
    discount: "50% off",
    size: "M, L, XL",
    images: [
      "https://i.ytimg.com/vi/RHYmKpWO7Kc/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBoETO1veJGnP5o0mp6OyV6c8ijXQ",

      "https://images.meesho.com/images/products/171160839/0avua_512.webp",
    ],
  },
  {
    id: 4040012,
    name: "Midi Dress for Casual Outings",
    brand: "Unknown",
    price: 3500,
    originalPrice: 7000,
    discount: "50% off",
    size: "S, M, L",
    images: [
      "https://www.jiomart.com/images/product/original/rvqld7eobf/my-swag-women-s-yellow-color-floral-print-sleeveless-daily-use-sheath-midi-dress-product-images-rvqld7eobf-0-202209221915.jpg?im=Resize=(500,630)",

      "https://img.tatacliq.com/images/i15//437Wx649H/MP000000020482591_437Wx649H_202312161819581.jpeg",
    ],
  },
  {
    id: 4040013,
    name: "Designer Kurti and Palazzo Set",
    brand: "Unknown",
    price: 2200,
    originalPrice: 4400,
    discount: "50% off",
    size: "S, M, L, XL",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeRw-nmx0Rt-y6u2lqyuE-M3JOYnWZo4nWWQ&s",

      "https://thechikanlabel.com/cdn/shop/files/RedKashishModalChikankariKurtiPalazzoSet_1.jpg?v=1723197174&width=836",
    ],
  },
  {
    id: 4040014,
    name: "Stunning Long Evening Gown",
    brand: "Unknown",
    price: 9000,
    originalPrice: 18000,
    discount: "50% off",
    size: "S, M, L, XL",
    images: [
      "https://img.freepik.com/premium-photo/elegance-unveiled-captivating-display-beautiful-luxurious-evening-gown-gracefully-adorning-mannequin-epitomizing-timeless-style-opulence-glamorous-chic-affair_771426-55193.jpg",

      "https://img.freepik.com/premium-photo/elegance-unveiled-captivating-display-beautiful-luxurious-evening-gown-gracefully-adorning-mannequin-epitomizing-timeless-style-opulence-glamorous-chic-affair_771426-55183.jpg?w=360",
    ],
  },
  {
    id: 4040015,
    name: "Long Party Dress",
    brand: "Unknown",
    price: 2000,
    originalPrice: 4000,
    discount: "50% off",
    size: "Kids Sizes",
    images: [
      "https://suvidhafashion.com/cdn/shop/files/1090_1_3a1bfc13-533a-4751-a0d3-d872ef9de9f5.jpg?v=1685168428&width=500",

      "https://suvidhafashion.com/cdn/shop/files/1051_2.jpg?v=1690273403&width=600",
    ],
  },
  {
    id: 4040016,
    name: "Georgette Lehenga For Wedding",
    brand: "Unknown",
    price: 12500,
    originalPrice: 25000,
    discount: "50% off",
    size: "M, L, XL",
    images: [
      "https://www.royalexport.in/product-img/wedding-wear-fox-georgette-leh-1726652165.jpg",
      "https://empress-clothing.com/cdn/shop/files/AAW2134.jpg?v=1714131942",
    ],
  },
];

export default dressesData;
