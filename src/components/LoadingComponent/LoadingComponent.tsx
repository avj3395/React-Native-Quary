import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const LoadingComponent = () => {
  return (
    <View>
      <ActivityIndicator size={'large'} />
    </View>
  );
};

export default LoadingComponent;

const styles = StyleSheet.create({});
