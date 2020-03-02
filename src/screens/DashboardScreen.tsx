import * as React from 'react';
import { ReducerAction, useCallback, useMemo, useReducer, useRef, useState } from 'react';
import { Dimensions, FlatList, LayoutAnimation, ListRenderItem, StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from 'react-navigation-hooks';

import CarouselReport from '../components/carousel/CarouselReport';
import Badge from '../components/common/Badge';
import Screen from '../components/common/Screen';
import DealItem from '../components/items/DealItem';
import ReportItem from '../components/items/ReportItem';
import TodoItem from '../components/items/TodoItem';
import NavHeader from '../components/navigation/NavHeader';
import { Caption } from '../components/typography/Caption';
import { NUMBER_OF_DEAL_COLUMN } from '../constants';
import useUpdateProfiler from '../hooks/use-update-profiler';
import { Deal, Report, Todo } from '../libs/types';
import { sharedStyles, sizes } from '../styles';

type AppReducer = {
  reports: Report[];
  todos: Todo[];
  deals: Deal[];
};

const initialReducerState: AppReducer = {
  reports: [
    {
      message: 'Current budget {0}.You could reduce budget {1} more from your pipeline.',
      currentVal: 100000,
      predictVal: 10000,
    },
    {
      message: 'Your commission this quarter total {0}. You could make {1} more from your pipeline.',
      currentVal: 32400,
      predictVal: 14200,
    },
    {
      message: 'Current budget {0}.You could reduce budget {1} more from your pipeline.',
      currentVal: 100000,
      predictVal: 10000,
    },
  ],
  todos: [
    {
      id: 1,
      todo: "Allison from Courts hasn't responded in 3 days. Follow up?",
      avatar: 'https://source.unsplash.com/120x120/?nature1',
      badge: 'https://source.unsplash.com/120x120/?company1',
    },
    {
      id: 2,
      todo: 'Have you sent the signed NDA to Singapore Airlines?',
      avatar: 'https://source.unsplash.com/120x120/?nature2',
    },
    {
      id: 3,
      todo: 'Prepare for your meeting tomorrow with Carl from Singapore Airlines',
      avatar: 'https://source.unsplash.com/120x120/?nature3',
      badge: 'https://source.unsplash.com/120x120/?natur3',
    },
    {
      id: 4,
      todo: "Finish debrief for yesterday's meeting with Same from Nestlé",
      avatar: 'https://source.unsplash.com/120x120/?nature4',
    },
  ],
  deals: [
    { title: 'Courts', avatar: 'https://source.unsplash.com/120x120/?company1' },
    { title: 'Singapore Airlines', avatar: 'https://source.unsplash.com/120x120/?company2' },
    { title: 'Nestlé', avatar: 'https://source.unsplash.com/120x120/?company3' },
  ],
};

const appReducer = (state: AppReducer, action) => {
  switch (action.type) {
    case 'DELETE_TASK_REQUEST': {
      const todos = [...state.todos];
      return {
        ...state,
        todos: todos.filter(it => it.id !== action.todoId),
      };
    }
  }
  return state;
};

const DashboardScreen = () => {
  const [isRequesting, setIsRequesting] = useState(false);
  const { navigate } = useNavigation();
  const scrollViewRef = useRef(null);

  const [localState, localDispatch] = useReducer(appReducer, initialReducerState);
  const { reports, todos, deals } = localState;
  const onDeleteTask = useCallback((item: Todo) => {
    localDispatch({ type: 'DELETE_TASK_REQUEST', todoId: item.id });
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, []);

  const renderTodoItem = useCallback<ListRenderItem<Todo>>(
    ({ item }) => {
      return <TodoItem todo={item} onDeleteTask={onDeleteTask} />;
    },
    [onDeleteTask],
  );

  const renderDealItem = useCallback<ListRenderItem<Deal>>(
    ({ item }) => {
      return (
        <TouchableOpacity
          style={styles.dealItemContainer}
          onPress={() => navigate('Detail', { todos, customer: item, onDeleteTask })}>
          <DealItem deal={item} />
        </TouchableOpacity>
      );
    },
    [todos, navigate, onDeleteTask],
  );

  const Navbar = useMemo(
    () => (
      <View style={styles.navContainer}>
        <FastImage style={styles.logo} source={{ uri: 'https://source.unsplash.com/120x120/?bee' }} />
      </View>
    ),
    [],
  );

  return (
    <Screen withLoadingView showLoading={isRequesting} navBar={Navbar}>
      <View style={styles.container}>
        <ScrollView
          ref={scrollViewRef}
          keyboardShouldPersistTaps="handled"
          overScrollMode="always"
          showsVerticalScrollIndicator={false}>
          {/** Analytics */}
          <View style={styles.carouselContainer}>
            <Caption style={styles.section}>How you're doing</Caption>
            <CarouselReport data={reports} firstItem={1} />
          </View>
          {/** Todos */}
          <View style={styles.todoContainer}>
            <View style={[styles.section, sharedStyles.horizontal, sharedStyles.alignItemsCenter]}>
              <Caption>Things to do</Caption>
              <Badge value={todos.length} />
            </View>
            <FlatList
              data={todos}
              renderItem={renderTodoItem}
              keyExtractor={(item, index) => `${index}-${item.todo}`}
            />
          </View>
          {/** Deals */}
          <View style={styles.dealContainer}>
            <View style={[styles.section, sharedStyles.horizontal, sharedStyles.alignItemsCenter]}>
              <Caption>Deals and leads</Caption>
              <Badge value={deals.length} />
            </View>
            <FlatList
              data={deals}
              renderItem={renderDealItem}
              keyExtractor={(item, index) => `${index}-${item.title}`}
              numColumns={2}
              columnWrapperStyle={styles.twoColumnsRow}
            />
          </View>
        </ScrollView>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    height: 48,
    paddingBottom: 20,
  },
  container: {},
  twoColumnsRow: {
    justifyContent: 'space-between',
  },
  dealItemContainer: {
    width: Dimensions.get('window').width / 2,
  },
  section: {
    paddingLeft: sizes.paddingXLarge,
    marginBottom: 4,
    marginTop: 16,
  },
  carouselContainer: {},
  todoContainer: {},
  dealContainer: {},
  logo: {
    width: 32,
    height: 32,
    borderRadius: 24,
    position: 'absolute',
    right: 0,
    marginRight: 16,
  },
});

export default DashboardScreen;
