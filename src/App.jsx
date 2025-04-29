import React from 'react';
import SearchContainer from './components/SearchContainer';
import BannerOferta from './components/BannerOferta';
import FiltroContainer from './components/FiltroContainer';
import CardsContainer from './components/CardsContainer';
import Pagination from './components/Pagination';
import Footer from './components/Footer';
import './styles/reset.css';
import './styles/style.css';
import Header_ from './components/Header_';
import Carousel from "./components/Carousel";

export default function App() {
  return (
    <div className="app">
      <Header_ />
      <main>
        <BannerOferta />
        <SearchContainer />
        <FiltroContainer />
        <CardsContainer />
        <Pagination />
        <button id="loadMore" className="btn-steam-link">Carregar mais</button>
      </main>
      <Footer />
    </div>
  );
}