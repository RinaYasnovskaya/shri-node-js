import React from 'react';
import { BuildCard } from './BuildCard';
import './buildList.scss';
import './buildCard.scss';
import { buildList } from '../../../js/test-backend';

export const BuildList = () => {
  const { data } = buildList;

  return (
    <div className="build-list">
      { data.map(item => <BuildCard item={item} key={item.buildNumber} />) }
      <button className="button button_light button__show" >Show more</button>
    </div>
  );
};
