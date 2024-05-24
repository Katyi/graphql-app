import './authors.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_AUTHORS } from '../../queries/queries';
import { CREATE_AUTHOR } from '../../mutations/mutations';
import Author from '../../components/author/Author';

const Authors = () => {
  const { data, loading, error } = useQuery(GET_ALL_AUTHORS);
  const { refetch } = useQuery(GET_ALL_AUTHORS);
  const [createAuthor] = useMutation(CREATE_AUTHOR);
  const [authors, setAuthors] = useState([]);
  const [name, setName] = useState('');

  const addToAuthor = async (e) => {
    e.preventDefault();
    try {
      const authorData = {
        id: authors.length + 1,
        name: name,
      };
      await createAuthor({ variables: { input: authorData } });
      setName('');
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!loading) {
      setAuthors(data.Authors);
    }
  }, [data]);

  if (loading) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <h1>Error, try again</h1>;
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="authorsTitle">AUTHORS</h1>
      <div className="card">
        <div className='linksPart'>
          <Link className='authorsLink' to="/">HOME</Link>
          <Link className="authorsLink" to="/books">BOOKS</Link>
        </div>
        <form className="form" onSubmit={addToAuthor}>
          <label>Author</label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
          />
          <div className="btns">
            <button className="btn" type="submit">
              Create
            </button>
          </div>
        </form>
        <div className="authors">
          {authors?.map((author) => (
            <div key={author.id}>
              <Author author={author} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Authors;