import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';

interface AvatarProps {
  children: React.ReactNode;
  url?: string;
  badgeUrl?: string;
}

const Avatar: React.SFC<AvatarProps> = props => {
  const { url, badgeUrl } = props;
  return (
    <View style={styles.avatarContainer}>
      <FastImage style={styles.avatar} source={{ uri: url }} fallback />
      <FastImage style={styles.badge} source={{ uri: badgeUrl }} fallback />
    </View>
  );
};

const styles = StyleSheet.create({
  avatarContainer: { width: 70, height: 60 },
  avatar: { width: 60, height: 60, borderRadius: 24 },
  badge: { width: 24, height: 24, borderRadius: 20, position: 'absolute', bottom: 0, right: 0 },
});

export default Avatar;
