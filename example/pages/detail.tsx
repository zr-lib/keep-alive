import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';

export default function Detail() {
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
      <p>detail: {id}</p>
      <p>
        <button onClick={onBack}>返回</button>
      </p>
    </div>
  );
}
