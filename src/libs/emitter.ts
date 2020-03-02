import { EventEmitter, EventSubscription } from 'fbemitter';

export type EmitterTypes = {
  UPDATE_ACTIVE_SWIPE_GESTURE_ROW_ID: {
    rowId: string;
  };
};

const _emitter = new EventEmitter();

export const emitter = {
  addListener<K extends keyof EmitterTypes>(key: K, listener: (payload: EmitterTypes[K]) => void) {
    return _emitter.addListener(key, listener);
  },
  emit<K extends keyof EmitterTypes>(key: K, payload: EmitterTypes[K]) {
    if (__DEV__) console.debug('[EMITTER]', key, payload);
    _emitter.emit(key, payload);
  },
};
