import * as React from 'react';
import { Dimensions, ListRenderItem, StyleSheet, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';

import { Report } from '../../libs/types';
import ReportItem from '../items/ReportItem';
import { Caption } from '../typography/Caption';

interface CarouselReportProps {
  data: Report[];
  firstItem?: number;
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = SCREEN_WIDTH * 0.8;

const CarouselReport: React.SFC<CarouselReportProps> = props => {
  const { data, firstItem } = props;
  const carouselRef = React.useRef(null);
  const _renderItem = React.useCallback<ListRenderItem<Report>>(({ item }) => {
    return <ReportItem report={item} />;
  }, []);

  return (
    <Carousel
      ref={carouselRef}
      data={data}
      firstItem={firstItem}
      renderItem={_renderItem}
      sliderWidth={SCREEN_WIDTH}
      itemWidth={ITEM_WIDTH}
    />
  );
};

const styles = StyleSheet.create({});

export default CarouselReport;
