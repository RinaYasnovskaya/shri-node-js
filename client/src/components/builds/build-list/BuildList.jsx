import React, { useEffect } from 'react';
import { BuildCard } from './BuildCard';
import './buildList.scss';
import './buildCard.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getBuildsMdw } from './getBuildsMdw';

export const BuildList = () => {
  const builds  = useSelector((state) => state.main.builds);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBuildsMdw());
  },[]);

  return (
    <div className="build-list">
      { builds && builds.map(item => <BuildCard item={item} key={item.buildNumber} />) }
      <button key="button-show" className="button button_light button__show" >Show more</button>
    </div>
  );
};
