import * as React from 'react';
import { Alert, Animated, StyleSheet, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import { Todo } from '../../libs/types';
import { colors } from '../../styles';
import Avatar from '../common/Avatar';
import Card from '../common/Card';
import { SwipeableRow } from '../gestures/SwipeableRow';
import { Caption } from '../typography/Caption';

interface TodoItemProps {
  todo: Todo;
  onDeleteTask: (item: Todo) => void;
}

const ACTION_VIEW_WIDTH = 80;

const TodoItem: React.SFC<TodoItemProps> = props => {
  const { todo, onDeleteTask } = props;
  const [showActions, setShowActions] = React.useState(false);
  const close = React.useCallback(() => {
    setShowActions(false);
  }, []);

  const renderLeftActions = React.useCallback(
    (progress, dragX) => {
      const trans = dragX.interpolate({
        inputRange: [0, 50, 100, 101],
        outputRange: [-20, 0, 0, 1],
      });
      return (
        <RectButton style={styles.leftAction} onPress={close}>
          <Animated.Text
            style={[
              styles.actionText,
              {
                transform: [{ translateX: trans }],
              },
            ]}>
            Clear task
          </Animated.Text>
        </RectButton>
      );
    },
    [close],
  );

  const renderRightAction = React.useCallback(
    (text, color, x, progress) => {
      const trans = progress.interpolate({
        inputRange: [0, 1],
        outputRange: [x, 0],
      });
      const pressHandler = () => {
        Alert.alert('Show options.');
        close();
      };
      return (
        <Animated.View style={{ transform: [{ translateX: trans }] }}>
          <RectButton style={[styles.rightAction]} onPress={pressHandler}>
            <Caption style={styles.actionText}>{text}</Caption>
          </RectButton>
        </Animated.View>
      );
    },
    [close],
  );

  const renderRightActions = React.useCallback(
    (progress, dragX) => {
      return (
        <View style={styles.rightActionContainer}>
          {renderRightAction('Options', colors.lightGray, ACTION_VIEW_WIDTH, progress)}
        </View>
      );
    },
    [renderRightAction],
  );

  return (
    <SwipeableRow
      isClosed={!showActions}
      onSwipeableClose={() => setShowActions(false)}
      onSwipeableOpen={() => setShowActions(true)}
      onSwipeableLeftOpen={() => onDeleteTask(todo)}
      renderRightActions={renderRightActions}
      renderLeftActions={renderLeftActions}>
      <View style={styles.container}>
        <Card>
          <View style={styles.rowContainer}>
            <Avatar url={todo.avatar} badgeUrl={todo.badge} />
            <Caption style={styles.title} ellipsizeMode={'tail'} numberOfLines={2}>
              {todo.todo}
            </Caption>
          </View>
        </Card>
      </View>
    </SwipeableRow>
  );
};

const styles = StyleSheet.create({
  container: { marginHorizontal: 4, marginVertical: 2 },
  rowContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    marginLeft: 8,
  },
  leftAction: {
    flex: 1,
    backgroundColor: colors.success,
    justifyContent: 'center',
  },
  actionText: {
    fontSize: 16,
    backgroundColor: colors.transparent,
    padding: 10,
  },
  rightActionContainer: {
    width: 80,
    flexDirection: 'row',
  },
  rightAction: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

export default TodoItem;
