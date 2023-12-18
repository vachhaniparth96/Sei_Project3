import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Books = () => {
	const [books, setBooks] = useState(null);
    const [sort, setSort] = useState("relevance");
    const location = useLocation();

    const handleSort = (e) => {
        setSort(e.target.value);
    }


    // useEffect(() => {
    //     handleSubmit();
    // }, []);

    console.log(sort);
    console.log(location.state.searchTerm);

	const getBooks = async () => {
		try {
			const response = await fetch(
				`https://www.googleapis.com/books/v1/volumes?q=${location.state.searchTerm}&orderBy=${sort}&startIndex=0&maxResults=40&key=AIzaSyAdE8yYtj0PJzx2ZsK9seCJTpRaOuF1bZo`
			);
            // const response = await fetch(`https://openlibrary.org/search.json?q=${location.state.searchTerm}&limit=40`);
			const data = await response.json();
			setBooks(data);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getBooks();
	}, []);
	console.log(books);
	// console.log(books.items[0].volumeInfo.title)

	const loading = () => (
		<div>
			<h1>Loading</h1>
		</div>
	);

	const loaded = () => (
		<div>
            <form> {/*onSubmit={handleSubmit}*/}
            Sort By: 
                <select onChange={handleSort}> {/*onChange={handleSort}*/}
                    <option value="relevance">Relevance</option>
                    <option value="newest">Newest</option>
                </select>
            </form>

            {/* Google Books map */}
			{books.items.map((book, idx) => (
				<div key={idx}>
                    <Link to={`/books/${book.id}`}>
                    <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
					<h2>{book.volumeInfo.title}</h2>
                    </Link>
                    <h3>{book.volumeInfo.authors}</h3>
				</div>
			))}

            {/* OpenLibrary map */}
            {/* {books.docs.map((book, idx) => (
                <div key={idx}>
                    <Link to={`/books/${book.key}`}>
                    <img src={`http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`} alt={book.title} />
                        <h2>{book.title}</h2>
                    </Link>
                    <h3>{book.author_name}</h3>
                </div>
            ))} */}
		</div>
	);

	return (
		<>
			<h1>Results: </h1>
			{/* {books ? console.log("loaded") : console.log("loading")} */}
			{books ? loaded() : loading()}
		</>
	);
};

export default Books;
