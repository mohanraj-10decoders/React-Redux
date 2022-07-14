import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { ADD, DELETE } from './Redux/employee';

function App() {
  const { employee } = useSelector((state) => state.employer);
  const dispatch = useDispatch();
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
    </div>
  );
}

export default App;
