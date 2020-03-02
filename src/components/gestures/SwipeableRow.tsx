import React, { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import uidV1 from 'uuid/v1';

import { useEmitter } from '../../hooks/use-emitter';
import { emitter } from '../../libs/emitter';
import { sharedStyles } from '../../styles';

export type SwipeableRowProps = React.ComponentPropsWithRef<typeof View> & {
  renderLeftActions?: (progress: any, dragX: any) => ReactNode;
  renderRightActions?: (progress: any, dragX: any) => ReactNode;
  children?: ReactNode;
  isClosed?: boolean;
  onSwipeableClose?: () => void;
  onSwipeableOpen?: () => void;
  onSwipeableWillOpen?: () => void;
  onSwipeableWillClose?: () => void;
  onSwipeableLeftOpen?: () => void;
  onSwipeableRightOpen?: () => void;
  onPress?: () => void;
};

export const SwipeableRow = (props: SwipeableRowProps) => {
  const {
    renderLeftActions,
    renderRightActions,
    children,
    isClosed,
    onPress,
    onSwipeableOpen,
    onSwipeableClose,
    onSwipeableWillOpen,
    onSwipeableWillClose,
    onSwipeableLeftOpen,
    onSwipeableRightOpen,
  } = props;
  const swipeableRowRef = useRef(null);
  const [rowId] = useState(uidV1());
  const swipeableViewClosedRef = useRef(false);

  useEmitter('UPDATE_ACTIVE_SWIPE_GESTURE_ROW_ID', payload => {
    if (rowId !== payload.rowId) {
      close();
    }
  });

  const close = useCallback(() => {
    swipeableViewClosedRef.current = true;
    swipeableRowRef.current.close();
  }, []);

  const notifyActiveGestureRowId = useCallback(
    (removeActiveId = false) => {
      emitter.emit('UPDATE_ACTIVE_SWIPE_GESTURE_ROW_ID', {
        rowId: removeActiveId ? null : rowId,
      });
      swipeableViewClosedRef.current = false;
      onSwipeableWillOpen && onSwipeableWillOpen();
    },
    [onSwipeableWillOpen, rowId],
  );

  useEffect(() => {
    if (isClosed && !swipeableViewClosedRef.current) {
      close();
    }
  }, [close, isClosed]);

  return (
    <Swipeable
      ref={swipeableRowRef}
      leftThreshold={40}
      rightThreshold={40}
      useNativeAnimations
      onSwipeableLeftOpen={onSwipeableLeftOpen}
      onSwipeableRightOpen={onSwipeableRightOpen}
      overshootLeft={Boolean(renderLeftActions)}
      overshootRight={Boolean(renderRightActions)}
      onSwipeableWillOpen={notifyActiveGestureRowId}
      onSwipeableClose={onSwipeableClose}
      onSwipeableOpen={onSwipeableOpen}
      onSwipeableWillClose={onSwipeableWillClose}
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}>
      <RectButton
        onPress={() => {
          notifyActiveGestureRowId(true);
          onPress && onPress();
        }}>
        {children}
      </RectButton>
    </Swipeable>
  );
};
