import React, { useEffect } from 'react';
import { BuildCard } from './BuildCard';
import './buildList.scss';
import './buildCard.scss';
import { buildList } from '../../../js/test-backend';
import { useDispatch, useSelector } from 'react-redux';
import { getBuildsMdw } from '../../../actions';

export const BuildList = () => {
  const builds  = useSelector((state) => state.builds);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBuildsMdw());
  },[]);

  const { data } = buildList;

  return (
    <div className="build-list">
      { data.map(item => <BuildCard item={item} key={item.buildNumber} />) }
      <button key="button-show" className="button button_light button__show" >Show more</button>
    </div>
  );
};
