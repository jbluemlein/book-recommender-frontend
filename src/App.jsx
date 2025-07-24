import React, { useEffect, useState } from 'react';

function App() {
  const [books, setBooks] = useState([]);
  const [tagFilter, setTagFilter] = useState('');

  useEffect(() => {
    fetch('https://book-recommender-backend.onrender.com/api/books')
      .then(res => res.json())
      .then(setBooks);
  }, []);

  const filtered = tagFilter
    ? books.filter(b => b.tags.includes(tagFilter))
    : books;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">📘 Book Recommender</h1>
      <input
        className="border p-2 w-full mb-4"
        placeholder="Filter by tag (e.g. horror, romance)"
        value={tagFilter}
        onChange={e => setTagFilter(e.target.value)}
      />
      {filtered.map(book => (
        <div key={book.id} className="border rounded p-4 mb-4">
          <h2 className="text-xl font-semibold">{book.title}</h2>
          <p className="italic">by {book.author}</p>
          <p className="text-sm mt-2">Tags: {book.tags.join(', ')}</p>
          <p className="mt-2">{book.description}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
