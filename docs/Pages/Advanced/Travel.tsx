import React, { useState } from 'react';
import './travel.css';
import { useMorph, useMultiMorph, useFade } from '../../../src/index';
import { createEaseIn } from '../../../src/easings';

const strongerEase = createEaseIn(3);

const faces = [
  {
    username: 'brunnolou',
    src: 'https://avatars1.githubusercontent.com/u/2729225?s=460&v=4',
  },
  {
    username: 'lucalanca',
    src: 'https://avatars3.githubusercontent.com/u/389459?s=460&v=4',
  },
  {
    username: 'florianginetta',
    src: 'https://avatars3.githubusercontent.com/u/30113109?s=460&v=4',
  },
  {
    username: 'lejoe',
    src: 'https://avatars3.githubusercontent.com/u/1759?s=460&v=4',
  },
];

const spring = {
  damping: 5,
  mass: 1,
  stiffness: 3,
};

const Travel = () => {
  const [toggle, go] = useState(false);
  const fade = useFade({ isReversed: toggle, spring, zIndex: 4 });
  const contentPlaceholderMorph = useMorph({
    spring, zIndex: 1,
    easings: strongerEase,
  });
  const coverMorph = useMorph({ spring, zIndex: 2 });
  const sepMorph = useMorph({ spring, zIndex: 3 });
  const titleMorph = useMorph({ spring, zIndex: 4 });
  const leftMorph = useMorph({ spring, zIndex: 4 });
  const rightMorph = useMorph({ spring, zIndex: 4 });
  const facesMorphs = useMultiMorph(faces, { spring, zIndex: 3, getMargins: true });

  return (
    <div className="container">
      <button onClick={() => go(!toggle)}>Toggle</button>
      {!toggle && (
        <a className="card" onClick={() => go(true)}>
          <div>
            <h1 className="card-title" {...titleMorph}>
              Zurich
            </h1>
          </div>
          <div
            {...coverMorph({
              style: { backgroundImage: 'url("/public/zurich.jpg")' },
            })}
            className="card-image"
          />

          <div className="card-footer">
            <span {...leftMorph}>
              <small className="c-white">Grossmünster</small>
            </span>
            <span {...rightMorph}>
              <small className="c-white">47.3769° N, 8.5417° E</small>
            </span>
          </div>
        </a>
      )}

      {!toggle && (
        <div className="card-content">
          <div
            className="card-content-placeholder"
            {...contentPlaceholderMorph}
          />
          <div />
          <div className="p1">
            <p className="separator t-left" {...sepMorph}>
              Panorama Grossmünster limmat river
            </p>

            <ul className="users">
              {faces.map(({ src, username }, index) => (
                <li className="users-item" key={`card-${username}`}>
                  <img
                    className="users-image"
                    src={src}
                    alt={username}
                    {...facesMorphs[index]}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {toggle && (
        <div className="details" onClick={() => go(false)}>
          <div
            className="details-image"
            role="img"
            {...coverMorph({
              style: { backgroundImage: 'url("/public/zurich.jpg")' },
            })}
          />

          <div className="details-title">
            <div className="details-toolbar card-footer">
              <small {...leftMorph}>Grossmünster</small>
              <small {...rightMorph}>47.3769° N, 8.5417° E</small>
            </div>

            <h1 className="card-title" {...titleMorph}>
              Zurich
            </h1>
          </div>

          <div className="details-content">
            <div
              className="details-content-placeholder"
              {...contentPlaceholderMorph}
            />
            <div className="center l-flex">
              <span {...sepMorph}> </span>
            </div>

            <ul>
              {faces.map(({ src, username }, index) => (
                <li className="users-item" key={`details-${username}`}>
                  <img
                    className="users-image users-image--lg"
                    src={src}
                    alt={username}
                    {...facesMorphs[index]}
                  />

                  <span {...fade}>{username}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Travel;
