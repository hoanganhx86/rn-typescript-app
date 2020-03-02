import * as React from 'react';
import { useCallback, useMemo, useReducer, useRef, useState } from 'react';
import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from 'react-navigation-hooks';
import { NavigationStackProp } from 'react-navigation-stack';

import CarouselReport from '../components/carousel/CarouselReport';
import Avatar from '../components/common/Avatar';
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
import { colors, sharedStyles, sizes } from '../styles';

const DetailScreen = (props: {
  navigation: NavigationStackProp<{
    params: {
      todos?: Todo[];
      customer: Deal;
      onDeleteTask: (item: Todo) => void;
    };
  }>;
}) => {
  const { todos, customer, onDeleteTask } = props.navigation.state.params;
  const { goBack } = useNavigation();
  const [isRequesting, setIsRequesting] = useState(false);
  const scrollViewRef = useRef(null);

  const renderTodoItem = useCallback<ListRenderItem<Todo>>(({ item }) => {
    return <TodoItem todo={item} onDeleteTask={onDeleteTask} />;
  }, []);

  const Navbar = useMemo(
    () => (
      <NavHeader style={styles.navContainer}>
        <View style={styles.rowContainer}>
          <Icon name="arrow-back" size={30} color={colors.dark} onPress={() => goBack()} />
          <View style={styles.avatarAndTitle}>
            <Avatar url={customer.avatar} />
            <Caption>{customer.title}</Caption>
          </View>
        </View>
      </NavHeader>
    ),
    [],
  );

  return (
    <Screen enableSafeArea={false} withLoadingView showLoading={isRequesting} navBar={Navbar}>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={[sharedStyles.screen]}
        keyboardShouldPersistTaps="handled"
        overScrollMode="always"
        showsVerticalScrollIndicator={false}>
        <View style={[styles.section, sharedStyles.horizontal, sharedStyles.alignItemsCenter]}>
          <Caption>Things to do</Caption>
          <Badge value={todos.length} />
        </View>
        <FlatList data={todos} renderItem={renderTodoItem} keyExtractor={(item, index) => `${index}-${item.todo}`} />
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    paddingTop: 48,
    height: 120,
    justifyContent: 'flex-end',
  },
  rowContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
  },
  backBt: {},
  section: {
    paddingLeft: sizes.paddingXLarge,
    marginBottom: 4,
    marginTop: 16,
  },
  avatarAndTitle: {
    flexDirection: 'row',
    width: '30%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 16,
  },
});

export default DetailScreen;
