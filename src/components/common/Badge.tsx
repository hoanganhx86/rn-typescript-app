import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import { colors } from '../../styles';
import { Caption } from '../typography/Caption';

interface BadgeProps {
  value: number;
}

const Badge: React.SFC<BadgeProps> = props => {
  const { value } = props;
  return (
    <View style={styles.capsule}>
      <Caption family={'thin'} style={styles.text}>
        {value}
      </Caption>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 10,
    lineHeight: 10,
    fontWeight: 'bold',
    color: colors.dark,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  capsule: {
    borderWidth: 0,
    width: 16,
    height: 16,
    borderRadius: 8,
    marginLeft: 4,
    backgroundColor: colors.secondary,
    borderColor: colors.dark,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Badge;
