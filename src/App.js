import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import data from './data';

// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';
import ProductContext from './contexts/ProductContext.js';
import CartContext from './contexts/CartContext.js';
import useLocalStorage from './hooks/useLocalSotarge.js';

function App() {
	const [products] = useState(data);
	const [cart, setCart] = useLocalStorage('cart', []);

	const addItem = item => {
		// add the given item to the cart
		setCart(cart => [...cart, item]);
		console.log(cart);
	};

	const removeItem = props => {
		const filteredCart = cart.filter(item => {
			return item.id !== props
		})
		setCart(filteredCart);
	}
	return (
		<div className="App">
			<ProductContext.Provider value={{ products, addItem }}>
				<CartContext.Provider value={{ cart, removeItem }}>
					<Navigation/>

					{/* Routes */}
					<Route exact path="/" component={Products}/>

					<Route path="/cart" component={ShoppingCart}/>
				</CartContext.Provider>
			</ProductContext.Provider>
		</div>
	);
}

export default App;
