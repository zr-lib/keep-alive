import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import '../styles.css';

export default function Detail2() {
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

  const onBack = () => {
    history.replace(home);
  };

  return (
    <div className="detail">
      detail2: {id}
      <div>
        <button onClick={onBack}>返回</button>
      </div>
    </div>
  );
}
