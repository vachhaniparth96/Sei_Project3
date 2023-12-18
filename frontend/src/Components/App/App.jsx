import { Routes, Route } from "react-router-dom";

import Books from "../../Pages/Books";
import Home from "../../Pages/Home";
import BookDetails from "../../Pages/BookDetails";

function App() {
	return (
		<div>
			<header>Legendary Pages</header>
			<main>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/books" element={<Books />} />
					<Route path="/books/:id" element={<BookDetails />} />
				</Routes>
			</main>
		</div>
	);
}

export default App;
