import './Dashboard.scss';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import helpers from '../data/helpers';

const Dashboard = () => {
	const [stats, setStats] = useState('');
	const [prices, setPrices] = useState('');
	const [inputLodge, setInputLodge] = useState('');
	const [inputParquet, setInputParquet] = useState('');

	// GET STATISTICS
	const getData = async () => {
		try {
			const response = await axios.get(helpers.apiLink + 'dashboard');
			setStats(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	// GET PRICES

	const getPrices = async () => {
		try {
			const response = await axios.get(helpers.apiLink + 'prices');
			setPrices(response.data);

		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getData();
		getPrices();
	}, []);

	// RESET SEATS
	const resetSeats = async () => {
		try {
			await axios.put(helpers.apiLink + 'resetseats');
			getData();
		} catch (error) {
			console.log(error);
		}
	};

	// Change PRICES

	const changePrices = async (e) => {
		e.preventDefault();
		try {
			const prices = {
				lodge: inputLodge,
				parquet: inputParquet
			}
			const response = await axios.put(helpers.apiLink + 'priceupdate', prices);
			setPrices(response.data);
			getData();
		}
		catch (error) {
			console.log(error)
		}
	}

	return (
		<div className='dashboard'>
			<h1 className='dashboard__heading'>Commando Control</h1>
			<div className='dashboard__grid'>
				<div className='dashboard__free-seats'>
					<p>Free Seats</p>
					<span>{stats.freeSeats}</span>
				</div>
				<div className='dashboard__stats__grid'>
					<div className='dashboard__stats__flex'>
						<p>Gross lodge</p>
						<span>{stats.grossLodge} $</span>
					</div>
					<div className='dashboard__stats__flex'>
						<p>Gross parquet</p>
						<span>{stats.grossParquet} $</span>
					</div>
					<div className='dashboard__stats__flex'>
						<p>Gross Total</p>
						<span>{stats.grossTotal} $</span>
					</div>
				</div>
			</div>
			<div className='dashboard__prices'>
				<h2>Current Prices</h2>
				<div className='dashboard__prices--current'>
					<span>Lodge</span>
					<span>{prices.lodge} $</span>
					<span>Parquet</span>
					<span>{prices.parquet} $</span>
				</div>
				<h2>Set new Prices</h2>
				<form onSubmit={changePrices}>
					<div>
						<label htmlFor='price__lodge'>Price Lodge</label>
						<input
							type='number'
							id='price__lodge'
							value={inputLodge}
							onChange={(e) => setInputLodge(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor='price__parquet'>Price Parquet</label>
						<input
							type='number'
							id='price__parquet'
							value={inputParquet}
							onChange={(e) => setInputParquet(e.target.value)}
						/>
					</div>
					<input type='submit' value='Set Prices'/>
				</form>
			</div>
			<div className='dashboard__btns'>
				<button onClick={resetSeats}>Reset Seats</button>
				<Link to={'/'}>
					<button>Back to Home</button>
				</Link>
			</div>
		</div>
	);
};

export default Dashboard;
