import { Router } from 'preact-router';

import { Provider } from 'react-redux';
import Header from './header';

import { setupStore } from '../redux/store';

// Code-splitting is automated for `routes` directory
import Book from '../routes/book';
import Cafeteria from '../routes/cafeteria';
import Home from '../routes/home';

const store = setupStore();

const App = () => (
    <div id="app">
        <Provider store={store}>
            <Header />
            <Router>
                <Home path="/" />
                <Book path="/book/:id" />
                <Cafeteria path="/cafeteria" />
            </Router>
        </Provider>
    </div>
);

export default App;
