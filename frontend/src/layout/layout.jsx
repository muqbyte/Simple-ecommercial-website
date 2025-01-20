import React from 'react';
import TopBar from '../components/topBar';
import { Outlet } from 'react-router-dom';
import FoodCard from '../components/foodCard';
import DrinkCard from '../components/drinks';
import '../assets/font.css'

const Layout = () => {
  return (
    <div>
      <TopBar />
        <FoodCard/>
        <DrinkCard/>
      <main className="mt-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
