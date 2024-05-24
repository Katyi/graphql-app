import './books.css';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_AUTHORS, GET_ALL_BOOKS } from '../../queries/queries';
import { CREATE_BOOK } from '../../mutations/mutations';
import Book from '../../components/book/Book';

const Books = () => {
  const { data, loading, error, refetch } = useQuery(GET_ALL_AUTHORS);
  const {
    data: booksData,
    loading: loadingBooksData,
    error: errorBooksData,
    refetch: refetchBooksData,
  } = useQuery(GET_ALL_BOOKS);
  const [createBook] = useMutation(CREATE_BOOK);

  const [authors, setAuthors] = useState([]);
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [authorId, setAuthorId] = useState('');

  const handleChange = (e) => {
    setAuthorId(e.target.value);
  };

  const addToBook = async (e) => {
    e.preventDefault();
    try {
      const authorData = {
        id: books.length + 1,
        title: title,
        authorId: authorId,
      };
      await createBook({ variables: { input: authorData } });
      setTitle('');
      setAuthorId('');
      refetch();
      refetchBooksData();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!loading) {
      setAuthors(data.Authors);
    }
  }, [data]);

  useEffect(() => {
    if (!loadingBooksData) {
      setBooks(booksData.Books);
    }
  }, [booksData]);

  if (loadingBooksData) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (errorBooksData) {
    return (
      <div className="error">
        <h1>Error, try again</h1>;
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="booksTitle">BOOKS</h1>
      <div className="card">
        <div className="linksPart">
          <Link className="authorsLink" to="/">
            HOME
          </Link>
          <Link className="authorsLink" to="/authors">
            AUTHORS
          </Link>
        </div>
        <form className="form" onSubmit={addToBook}>
          <div className="formInps">
            <div className="formInpsRow">
              <label>Book</label>
              <input
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
              />
            </div>
            <div className="formInpsRow">
              <label>Author</label>
              <Select
                style={{ width: '300px', height: '30px', background: '#fff' }}
                value={authorId}
                onChange={handleChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
              >
                {authors.map((author) => (
                  <MenuItem key={author.id} value={author.id}>
                    {author.name}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </div>
          <div className="btns">
            <button className="btn" type="submit">
              Create
            </button>
          </div>
        </form>
        <div className="books">
          {books?.map((book, index) => (
            <div key={index}>
              <Book authors={authors} book={book} index={index} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Books;