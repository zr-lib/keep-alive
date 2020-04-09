import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { KeepAliveAssist } from 'keep-alive';
import '../styles.css';

export interface ListProps extends KeepAliveAssist {}

const List: React.FC<ListProps> = ({
  beforeRouteLeave,
  scrollRestore,
  stateRestore,
  deleteCache,
}) => {
  const history = useHistory();
  const listRef = useRef<HTMLDivElement | null>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [list, updateList] = useState([]);

  useEffect(() => {
    restore();
  }, []);

  const restore = () => {
    const _scrollTop = scrollRestore();
    const _state = stateRestore();

    updateList(
      () =>
        _state?.list || [
          '11111111111111111',
          '22222222222222222',
          '33333333333333333',
          '44444444444444444',
          '55555555555555555',
          '66666666666666666',
        ]
    );
    setTimeout(() => {
      listRef.current.scrollTop = _scrollTop;
    }, 0);
  };

  const onScroll = (e: any) => {
    e.persist();
    const top = e.target.scrollTop;
    setScrollTop(top);
    const scrollHeight = listRef.current.scrollHeight;
    const offsetHeight = listRef.current.offsetHeight;
    if (scrollHeight - offsetHeight - top <= 50) {
      const temp = new Array(5)
        .fill('')
        .map((i, index) =>
          new Array(17).fill(`${list.length + index + 1}`).join('')
        );
      updateList((prev) => [...prev, ...temp]);
    }
  };

  const toDetail = (i) => {
    beforeRouteLeave(scrollTop, { list });
    history.push(`/detail/${i}`);
  };

  return (
    <div className="list" ref={listRef} onScroll={onScroll}>
      {list.map((i) => (
        <div className="item" key={i} onClick={() => toDetail(i)}>
          {i}
        </div>
      ))}
    </div>
  );
};

export default List;
