import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import * as Progress from 'react-native-progress';

import { Deal } from '../../libs/types';
import { colors, sharedStyles } from '../../styles';
import Avatar from '../common/Avatar';
import Card from '../common/Card';
import { Caption } from '../typography/Caption';

interface DealItemProps {
  deal: Deal;
}

const DealItem: React.SFC<DealItemProps> = props => {
  const { deal } = props;
  return (
    <View style={styles.container}>
      <Card>
        <View style={styles.rowContainer}>
          <View style={styles.avatarAndTitle}>
            <Avatar url={deal.avatar} />
            <Caption>{deal.title}</Caption>
          </View>
          <View style={styles.progressBarContainer}>
            <Progress.Bar style={styles.progressBar} progress={0.6} width={64} />
          </View>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: 88,
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  rowContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatarAndTitle: {
    flexDirection: 'row',
    width: '72%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressBarContainer: {
    transform: [{ rotate: '-90deg' }],
  },
  progressBar: {
    margin: 16,
  },
});

export default DealItem;
