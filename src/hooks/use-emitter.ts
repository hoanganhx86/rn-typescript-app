import { DependencyList, useEffect } from 'react';

import { emitter, EmitterTypes } from '../libs/emitter';

export function useEmitter<K extends keyof EmitterTypes>(
  key: K | undefined,
  callback: (payload: EmitterTypes[K]) => void,
  deps: DependencyList = [],
) {
  useEffect(() => {
    if (!(key && callback)) return;

    const listener = emitter.addListener(key, callback);
    return () => listener.remove();
  }, [callback, key, ...deps]);

  return emitter;
}
