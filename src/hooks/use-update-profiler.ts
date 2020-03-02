import { useEffect, useRef } from 'react';

export default function useUpdateProfiler(name = '', props: {}) {
  const previousProps = useRef({});

  useEffect(() => {
    if (__DEV__ && previousProps.current) {
      const allKeys = Object.keys({ ...previousProps.current, ...props });
      const changesObj = {};
      allKeys.forEach(key => {
        if (previousProps.current[key] !== props[key]) {
          changesObj[key] = {
            from: previousProps.current[key],
            to: props[key],
          };
        }
      });

      if (Object.keys(changesObj).length) {
        console.log('[update-profiler]', name, changesObj);
      }
    }

    previousProps.current = props;
  });
}
