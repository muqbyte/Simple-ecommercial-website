import React from 'react'
import data from "../data/foods.json"
import ItemCard from './itemCard'
import '../assets/font.css'

const foodCard=()=> {
  return (

    <section  className="px-2 py-4">

        <div className="pb-4 ">
            <p style={{fontFamily: "Quicksand, serif", fontWeight:"bold"}}>Main Dishes</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.map((item) => (
          <ItemCard
            key={item.id}
            cartId={item.id}
            caption={item.caption}
            title={item.title}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </section>
  )
}

export default foodCard
