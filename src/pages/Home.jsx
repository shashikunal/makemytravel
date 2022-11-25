import React from "react";
import SearchHotel from "../components/hotelsandCity/SearchHotel";
import Slider from "./sliders/Slider";
import Styles from "./_pages.module.css";
const Home = () => {
  return (
    <section id={Styles.pagesBlock}>
      <article>
        <Slider />
        <SearchHotel />
      </article>
    </section>
  );
};

export default Home;
