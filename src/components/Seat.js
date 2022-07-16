const Seat = ({id, level, reserved, changeReserved}) => {

const getColor = () => {
  if(reserved) return 'red';
  else if(level === 'lodge') return 'blue';
  else if(level === 'parquet') return 'yellow';
}

  const styles = {
    backgroundColor: getColor(),
  }

  return <div className="seat" style={styles} onClick={() => changeReserved(id)}></div>
}

export default Seat;