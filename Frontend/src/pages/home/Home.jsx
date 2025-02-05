import Banner from "../../component/home/Banner";
import Bestseller from "../../component/home/Bestseller";
import CardList from "../../component/home/CardList";
import Carousel from "../../component/home/Carousel";
import Collections from "../../component/home/Collections";
import Products from "../../component/home/Products";
import Trending from "../../component/home/Trending";

const images = [
  "https://th.bing.com/th/id/R.76fc452da5c43dfd56d5ecb16d2bfaee?rik=O3qywCkjVryi5Q&riu=http%3a%2f%2fcitywestshoppingcentre.com%2fapp%2fuploads%2f2017%2f04%2fWoman-Shopping-Banner.jpg&ehk=f51KA0DgiwyUWBfb1HSSlawurrqZaQVx%2fMpZlmiBwy8%3d&risl=&pid=ImgRaw&r=0",
  "https://img.freepik.com/premium-vector/ad-banner-beauty-product_317442-1871.jpg?w=2000",
  "https://zola.in/cdn/shop/articles/dress_Banner.jpg?v=1686032761",
];
const Home = () => {
  return (
    <>
      <Carousel images={images} autoPlay={true} autoPlayInterval={3000} />
      <Products />
      <Banner />
      <CardList />
      <Collections />
      <Bestseller />
      <Trending />
    </>
  );
};

export default Home;
