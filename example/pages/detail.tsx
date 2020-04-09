import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import '../styles.css';

const Detail = ({ beforeRouteLeave }) => {
  const [home, setHome] = useState('');
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const host = location.href.substring(
      location.href.indexOf('//'),
      location.href.indexOf('/')
    );
    const url = `${host}`;
    setHome(url);
  }, []);

  const goto = () => {
    beforeRouteLeave();
    history.push(`/detail2/${id}`);
  };

  return (
    <div className="detail">
      detail: {id}
      <div>
        <button onClick={goto}>detail2</button>
      </div>
    </div>
  );
};

export default Detail;
