import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import helpers from '../data/helpers';

import Seat from '../components/Seat';

const Home = () => {
	const [seatAllocation, setSeatAllocation] = useState([]);

	useEffect(() => {
		const getSeats = async () => {
      try {
        const response = await axios.get(helpers.apiLink + 'seatallocation');
        setSeatAllocation(response.data);
      }
      catch (error) {
        console.log(error);
      }
		};
		getSeats();
	},[]);

  const changeReserved = async (id) => {
    const response = await axios.put(helpers.apiLink + `seatreservation/${id}`);
    setSeatAllocation(response.data);
  }

  const stylesGrid={
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 30px)',
    gap: '10px'
  }

	return (
		<div className='home'>
      <img src="img/geoffrey-moffett-TFRezw7pQwI-unsplash.jpeg" alt="title" className='hero'/>
			<h1>Book your Seat</h1>
      <div className='screen'>Screen</div>
      <section className="seat__allocation">
        {seatAllocation.map(seat => 
          <Seat 
            key={seat.id}
            id={seat.id}
            level={seat.class}
            reserved={seat.reserved}
            changeReserved={changeReserved}
          />
          )}
      </section>
      <div className="legend__flex">
        <div className='legend'><span>Lodge :</span> <div className='seat' style={{backgroundColor: 'blue'}}></div></div>
        <div className='legend'><span>Parquet :</span> <div className='seat' style={{backgroundColor: 'yellow'}}></div></div>
        <div className='legend'><span>Reserved :</span> <div className='seat' style={{backgroundColor: 'red'}}></div></div>
      </div>
      <Link to={'/dashboard'}>TO THE DASHBOARD</Link>
      <p>Please use this only if you are the admin. Pleeeease</p>
		</div>
	);
};

export default Home;
