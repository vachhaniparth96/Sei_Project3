
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [bestSellers, setBestSellers] = useState(null); 
    const history = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        history("/books", { state: {
            searchTerm: searchTerm
            } 
        });
    };

    const getBestSellers = async () => {
        try{
            const response = await fetch(
                `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=2F3wpNtKBnaGUi39xzBudafBByjUYYnR` //replace API key with process.env if refactoring code
            );
            const data = await response.json();
            setBestSellers(data);
        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        getBestSellers();
    }, []);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search for a book or author"
                />
                <button type="submit">Search</button>
            </form>

            <h1>Current NYT Best Sellers: </h1>
            {bestSellers ? (
                <div>
                    {bestSellers.results.books.map((book, idx) => (
                        <div key={idx}>
                            <h2>{book.title}</h2>
                            <h3>{book.author}</h3>
                            <img src={book.book_image} alt={book.title} />
                            <h3>{book.description}</h3>
                        </div>
                    ))}
                </div>
            ) : (
                <h1>Loading...</h1>
            )}
        </div>
    );
};

export default Home;