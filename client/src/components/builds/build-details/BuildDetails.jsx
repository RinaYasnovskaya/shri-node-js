import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { BuildCard } from '../build-list/BuildCard';
import './buildDetails.scss';
import '../build-list/buildCard.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getBuildInformation } from './getBuildsInformation';

export const BuildDetails = () => {
  const { buildId } = useParams();
  const buildsDetails = useSelector((state) => state.main.buildDetails);
  const buildsLog = useSelector((state) => state.main.buildLog);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBuildInformation(buildId, dispatch));
  }, []);

  return (
    <div className="build-details">
      {/* <BuildCard item={buildsDetails} /> */}
      <div className="log">
        <pre>{buildsLog}</pre>
      </div>
    </div>
  );
};
