import timeDiff from 'timediff';
import { useEffect, useState } from 'react';
import useStyles from './style';
import moment from 'moment';

function renderDuration(difference, duration, k:any) {
  if (difference[duration]) {
    return (
      <div key = {k}>
        {difference[duration]}
        {duration[0]}
      </div>
    );
  }
}
export default function Timer({
  startTime = null,
  endTime,
  showDurations = ['days', 'hours', 'minutes', 'seconds'],
  textForStart = '',
  textForEnd = '',
}) {
  function TimeDiff({ difference }) {
    return (
      <span>
        {Object.keys(difference)
          .filter(duration => difference[duration] && showDurations.includes(duration))
          .map((duration, k) => (renderDuration(difference, duration, k)))}
      </span>
    );
  }
  const [currentTime, setCurrentTime] = useState(new Date().getTime());
  const classes = useStyles();
  let text = '';

  useEffect(() => {
    let t = setTimeout(() => setCurrentTime(new Date().getTime()), 1000);

    return () => {
      clearTimeout(t);
    };
  });

  let difference = null;
  if (startTime && moment(startTime).isSameOrAfter(currentTime)) {
    difference = timeDiff(currentTime, startTime);
    text = textForStart;
    return (
      <div className={classes.root}>
        {text} <TimeDiff difference={difference} />
      </div>
    );
  } else if (endTime && moment(endTime).isSameOrAfter(currentTime)) {
    difference = timeDiff(currentTime, endTime);
    text = textForEnd;
    // if (difference && endTime) {
      return (
        <div className={classes.root}>
          <TimeDiff difference={difference} /> {text}
        </div>
      );
    // } else {
    //   return null;
    // }
  } else {
    return null;
  }
}
