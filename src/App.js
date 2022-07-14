import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { ADD, DELETE } from './Redux/employee';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const { employee } = useSelector((state) => state.employer);
  const [movies, setMovies] = useState([]);
  const dispatch = useDispatch();

  const getMovies = () => {
    fetch('https://62cfe492d9bf9f17057e92ff.mockapi.io/movies')
      .then((data) => data.json())
      .then((res) => setMovies([...res]));
  };
  const addMovie = () => {
    axios
      .post('https://62cfe492d9bf9f17057e92ff.mockapi.io/movies', {
        name: `Movie ${movies.length + 1}`,
        language: 'English',
        rating: 9,
        year: 2022,
      })
      .then((res) => {
        console.log('api post response', res);
        if (res.status == 201) {
          getMovies();
        }
      });
  };
  const editMovie = (id) => {
    axios
      .put(`https://62cfe492d9bf9f17057e92ff.mockapi.io/movies/${id}`, {
        name: 'Edited',
        language: 'Tamil',
        rating: 5,
        year: 2016,
      })
      .then((res) => {
        if (res.status == 200) {
          getMovies();
        }
      });
  };
  const deleteMovie = (id) => {
    axios
      .delete(`https://62cfe492d9bf9f17057e92ff.mockapi.io/movies/${id}`)
      .then((res) => {
        if (res.status == 200) {
          getMovies();
        }
      });
  };
  return (
    <div className='App'>
      <p>Employee details</p>
      <button
        className='addButton'
        onClick={() =>
          dispatch(
            ADD({
              name: 'new',
              tech: 'new',
              mobile: (employee.length + 1) * 1000,
            })
          )
        }
      >
        ADD
      </button>
      <section className='section'>
        {employee.map((emp) => {
          return (
            <div key={emp.id} className='card'>
              <p>
                <strong>Name </strong>
                <span>{emp.name}</span>
              </p>
              <p>
                <strong>Tech </strong>
                <span>{emp.tech}</span>
              </p>
              <p>
                <strong>Mobile </strong>
                <span>{emp.mobile}</span>
              </p>
              <button
                className='deleteButton'
                onClick={() => dispatch(DELETE({ id: emp.id }))}
              >
                DELETE
              </button>
            </div>
          );
        })}
      </section>
      <button onClick={() => getMovies()} className='getMoviesbutton'>
        GET MOVIES
      </button>
      {!!movies.length && (
        <section className='allMoviesContainer'>
          <button onClick={() => addMovie()} className='addMovieButton'>
            Add movie
          </button>
          <div className='allMovies'>
            {movies.map((movie) => {
              return (
                <span className='movie' key={movie.id}>
                  {movie.name}
                  <button
                    className='movieEditbutton'
                    onClick={() => editMovie(movie.id)}
                  >
                    {' '}
                    EDIT
                  </button>
                  <button
                    className='movieDeleteButton'
                    onClick={() => deleteMovie(movie.id)}
                  >
                    {' '}
                    DEL
                  </button>
                </span>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}

export default App;
