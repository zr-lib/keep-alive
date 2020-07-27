import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { KeepAliveAssist } from 'keep-alive-comp';
import './styles.css';

export interface ListProps extends KeepAliveAssist {}

const List: React.FC<ListProps> = ({
  beforeRouteLeave,
  scrollRestore,
  stateRestore,
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
      () => _state?.list || ['111111', '222222', '333333', '444444', '555555']
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
          new Array(6).fill(`${list.length + index + 1}`).join('')
        );
      updateList((prev) => [...prev, ...temp]);
    }
  };

  const toDetail = (item) => {
    beforeRouteLeave(scrollTop, { list });
    history.push(`/detail/${item}`);
  };

  return (
    <div className="list" ref={listRef} onScroll={onScroll}>
      {list.map((item, index) => (
        <div
          className={`item ${index % 2 === 0 ? 'item-2n' : ''}`}
          key={item}
          onClick={() => toDetail(item)}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default List;
