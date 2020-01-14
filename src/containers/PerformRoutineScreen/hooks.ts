import { useEffect, useRef, useState } from 'react';
import { Nullable } from '../../common/typings';

export function useInterval(callback: () => any, delay: Nullable<number>) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export function useTimer(
  repLengthSeconds: number,
  shouldRun: boolean,
  isReset: boolean,
) {
  // console.log('repLength -timer', repLengthSeconds);
  const [remainingTime, setRemainingTime] = useState<number>(repLengthSeconds);
  if (isReset) {
    setRemainingTime(repLengthSeconds);
  }

  // if (!remainingTime) {
  //   shouldRun = false;
  // }

  useInterval(
    () => setRemainingTime(+(remainingTime - 0.1).toFixed(1)),
    remainingTime >= 0 && shouldRun ? 100 : null,
  );

  return remainingTime;
}
