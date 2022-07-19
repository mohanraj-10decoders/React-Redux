import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { ADD, DELETE } from './Redux/employee';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const { employee } = useSelector((state) => state.employer);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [showMovie, setShowMovie] = useState(false);
  const dispatch = useDispatch();

  const confirmDelete = () => {
    return window.confirm('Are you sure to delete?');
  };

  const getMovies = async () => {
    // fetch('https://62cfe492d9bf9f17057e92ff.mockapi.io/movies')
    //   .then((data) => data.json())
    //   .then((res) => setMovies([...data]));
    let result = await fetch(
      'https://62cfe492d9bf9f17057e92ff.mockapi.io/movies'
    );
    let data = await result.json();
    if (data) {
      setError(null);
      setMovies([...data]);
    }
  };
  const addMovie = () => {
    axios
      .post('https://62cfe492d9bf9f17057e92ff.mockapi.io/movie', {
        name: `Movie ${movies.length + 1}`,
        language: 'English',
        rating: 9,
        year: 2022,
      })
      .then((res) => {
        console.log('api post response', res);
        if (res.status == 200) {
          setError(null);
          getMovies();
        } else {
          throw Error('Unable to add data');
        }
      })
      .catch((err) => {
        setError('Unable to add the data');
        console.log(err.message);
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
        console.log('edit response', res);
        if (res.status == 200) {
          setError(null);
          getMovies();
        } else {
          throw Error('Unable to edit the data');
        }
      })
      .catch((err) => {
        setError('Unable to edit the data');
        console.log(err.message);
      });
  };
  const deleteMovie = (id) => {
    if (confirmDelete)
      axios
        .delete(`https://62cfe492d9bf9f17057e92ff.mockapi.io/movies/${id}`)
        .then((res) => {
          if (res.status == 200) {
            setError(null);
            getMovies();
          } else {
            throw Error('Unable to delete the data');
          }
        })
        .catch((err) => {
          setError('Unable to delete the data');
          console.log(err.message);
        });
  };
  return (
    <div className='App'>
      <div>
        <button onClick={() => setShowMovie(!showMovie)}>
          {showMovie ? 'Employees' : 'Movies'}
        </button>
      </div>
      {!showMovie && (
        <>
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
            ADD Employee
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
                    onClick={() => {
                      if (confirmDelete()) dispatch(DELETE({ id: emp.id }));
                    }}
                  >
                    DELETE
                  </button>
                </div>
              );
            })}
          </section>
        </>
      )}
      {showMovie && (
        <>
          <button onClick={() => getMovies()} className='getMoviesbutton'>
            GET MOVIES
          </button>
          <div className='errorMessage'>
            {error && <span className='span'>{error}</span>}
          </div>
          {!!movies.length && (
            <section className='allMoviesContainer'>
              <button onClick={() => addMovie()} className='addMovieButton'>
                Add movie
              </button>
              <div className='allMovies'>
                {movies.map((movie) => {
                  return (
                    <section className='movieCard'>
                      <span className='movie' key={movie.id}>
                        {movie.name}
                      </span>
                      <div className='buttons'>
                        <button
                          className='movieEditbutton'
                          onClick={() => editMovie(movie.id)}
                        >
                          {' '}
                          EDIT
                        </button>
                        <button
                          className='movieDeleteButton'
                          onClick={() => {
                            if (confirmDelete()) deleteMovie(movie.id);
                          }}
                        >
                          {' '}
                          DEL
                        </button>
                      </div>
                    </section>
                  );
                })}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}

export default App;
