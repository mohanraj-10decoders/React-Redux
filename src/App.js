import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment, incrementByAmount } from './Redux/employee';

function App() {
  const { employee } = useSelector((state) => state.employer);
  const dispatch = useDispatch();
  return (
    <div className='App'>
      <p>Redux app</p>
      <button onClick={() => dispatch(decrement())}>Dec</button>
      <span>{employee}</span>
      <button onClick={() => dispatch(increment())}>Inc</button>
      <div>
        <button onClick={() => dispatch(incrementByAmount(10))}>
          Incre by 10
        </button>
      </div>
    </div>
  );
}

export default App;
