import logo from './logo.svg';
import './App.css';
import StockContainer from './react/Stock/containers/stockContainer';
import { Provider } from 'react-redux';
import store from './react/store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <StockContainer></StockContainer>
      </div>
    </Provider>
  );
}

export default App;
