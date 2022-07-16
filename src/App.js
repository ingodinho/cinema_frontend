import './App.scss';
import Home from './pages/Home';
import Dashboard from './components/Dashboard';
import { Routes, Route } from 'react-router-dom';

function App() {
	return (
		<div className='App'>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/dashboard' element={<Dashboard />} />
			</Routes>
		</div>
	);
}

export default App;