import './home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container">
      <h1 className="homeTitle">SIMPLE CRUD WITH GRAPHQL</h1>
      <Link to="/authors" className="homeLink">
        OPEN AUTHORS LIST
      </Link>
      <Link to="/books" className="homeLink">
        OPEN BOOKS LIST
      </Link>
    </div>
  );
};

export default Home;
