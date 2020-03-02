import * as React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import ParsedText from 'react-native-parsed-text';
import * as Progress from 'react-native-progress';

import * as stringUtils from '../../libs/stringUtils';
import { Report } from '../../libs/types';
import Card from '../common/Card';
import { Caption } from '../typography/Caption';

interface ReportItemProps {
  report: Report;
}

const ReportItem: React.SFC<ReportItemProps> = props => {
  const { report } = props;
  const formatedString = report.message
    .replace('{0}', `$${stringUtils.numberWithCommas(report.currentVal)}`)
    .replace('{1}', `$${stringUtils.numberWithCommas(report.predictVal)}`);
  return (
    <View style={styles.container}>
      <Card>
        <View style={styles.content}>
          <Caption>
            <ParsedText
              style={styles.text}
              parse={[{ pattern: /\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(\.[0-9][0-9])?/i, style: styles.money }]}>
              {formatedString}
            </ParsedText>
          </Caption>
          <Progress.Bar style={styles.progressBar} progress={0.8} width={260} />
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    minHeight: 120,
  },
  content: {
    flex: 1,
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
  },
  progressBar: {
    margin: 24,
  },
  text: {},
  money: {
    fontWeight: 'bold',
  },
});

export default ReportItem;
