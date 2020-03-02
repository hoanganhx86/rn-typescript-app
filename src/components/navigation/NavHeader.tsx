import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import { colors } from '../../styles';

interface NavHeaderProps {
  children: React.ReactNode;
  style?: {};
}

const NavHeader: React.SFC<NavHeaderProps> = props => {
  const { children, style } = props;
  return <View style={[styles.header, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  header: {
    minHeight: 80,
    backgroundColor: colors.secondary,
    shadowColor: colors.black,
    marginBottom: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
  },
});

export default NavHeader;
