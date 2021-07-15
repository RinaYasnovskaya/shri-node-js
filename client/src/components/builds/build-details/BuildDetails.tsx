import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { BuildCard } from '../build-list/BuildCard';
import './buildDetails.scss';
import '../build-list/buildCard.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getBuildsInformation } from '../../../actions';
import { RootState } from '../../..';

export const BuildDetails: React.FC = () => {
  const { buildId } = useParams<{buildId?: string}>();
  const buildsDetails = useSelector((state: RootState) => state.main.buildDetails);
  const buildsLog = useSelector((state: RootState) => state.main.buildLog);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBuildsInformation(buildId, dispatch));
  }, []);

  return (
    <div className="build-details">
      <BuildCard item={buildsDetails} />
      <div className="log">
        <pre>{buildsLog}</pre>
      </div>
    </div>
  );
};
