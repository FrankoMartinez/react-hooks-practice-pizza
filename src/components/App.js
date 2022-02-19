import React, { useState, useEffect } from "react";
import Header from "./Header";
import PizzaForm from "./PizzaForm";
import PizzaList from "./PizzaList";

function App() {
  const [pizzas, setPizzas] = useState([])
  const [selectedPizza, setSelectedPizza] = useState([])

  // Fetch to the pizza api and set the pizzas to data returned
  useEffect(() => {
    fetch('http://localhost:3001/pizzas')
    .then((res) => res.json())
    .then((pizzas) => setPizzas(pizzas))
  }, [])

  // When you change the form inputs it will update the pizzas and display the updated pizza
  function handleChange(name, value) {
    setSelectedPizza({
      ...selectedPizza,
      [name]: value,
    })
  }

  function handleEditPizza(updatePizza) {
    const updatedPizzas = pizzas.map((pizza) => 
    pizza.id === updatePizza.id ? updatePizza: pizza
    )
    setSelectedPizza(updatePizza)
    setPizzas(updatedPizzas)
  }

  return (
    <>
      <Header />
      <PizzaForm 
        selectedPizza={selectedPizza}
        onChangeForm={handleChange}
        onEditPizza={handleEditPizza}
      />
      <PizzaList pizzas={pizzas} setSelectedPizza={setSelectedPizza} />
    </>
  );
}

export default App;
