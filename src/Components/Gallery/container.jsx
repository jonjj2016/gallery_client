import React, { useEffect, useState } from 'react';
import Component from './component';
import { load_start, search_start } from '../../Modules/actions';
import { useDispatch, useSelector } from 'react-redux';

const Container = () => {
  const [state, setState] = useState({
    count: 30,
    images: [],
    start: 1,
    searchField: '',
    currentImage: 0,
    viewerIsOpen: false,
  });

  const { count, start, images, loading, err } = useSelector((state) => state);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(search_start({ count: count, start, searchField: state.searchField }));
  }, []);
  const fetchImages = () => {
    if (start) {
      dispatch(load_start({ count, start, searchField: state.searchField }));
    }
  };
  const onChange = (e) => {
    setState({ ...state, searchField: e.target.value });
  };
  const onSubmit = () => {
    dispatch(search_start({ count: state.count, start: state.start, searchField: state.searchField }));
  };
  return <div>{<Component onSubmit={onSubmit} onChange={onChange} fetchImages={fetchImages} state={state} setState={setState} images={images} loading={loading} err={err} />}</div>;
};

export default Container;
