import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setRebuild } from '../../../reducer';
import { ItemValues } from './ItemValues';

interface BuildCardProps {
  item: ItemValues;
}

export const BuildCard: React.ComponentType<BuildCardProps> = ({ item }) => {
  const { id,
          buildNumber,
          commitMessage,
          commitHash,
          branchName,
          authorName,
          status,
          start,
          duration } = item;

  const shortCommitHash = commitHash?.slice(0, 7);
  const date = new Date(start).toString().split(' ');
  const readyDate = `${date[2]} ${date[1]}, ${date[4].substr(0, 5)}`;
  const lowerStatus = status === 'InProgress' ? 'waiting' : status?.toLowerCase();
  const dispatch = useDispatch();

  const onClickLink = () => {
    dispatch(setRebuild(true));
  }

  return (
    <Link to={{pathname: `/build/${id}`}} onClick={onClickLink} className="card">
      <div className="card__left-part">
        <img src={`../../assets/img/${lowerStatus}.svg`} alt={status} className="card__status" />
        <div className="card__left-inner" >
          <div className="card__left-top">
            <span className={`card__title card__title_${lowerStatus}`}>#{buildNumber}</span>
            <span className="card__description">{commitMessage}</span>
          </div>
          <div className="card__left-bottom">
            <span className="card__branch">{branchName}</span>
            <span className="card__hash">{shortCommitHash}</span>
            <span className="card__author">{authorName}</span>
          </div>
        </div>
      </div>
      <div className="card__right-part">
        <span className="card__date">{readyDate}</span>
        <span className="card__time">{duration} min</span>
      </div>
    </Link>
  );
};
