import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import { colors } from '../../styles';

interface CardProps {
  children: React.ReactNode;
}

const Card: React.SFC<CardProps> = props => {
  return <View style={styles.card}>{props.children}</View>;
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.secondary,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,

    elevation: 5,
    borderRadius: 6,
  },
});

export default Card;
