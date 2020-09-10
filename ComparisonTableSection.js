import React, { useState } from 'react';
import {
  Animated,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  StyleSheet
} from 'react-native';

const ComparisonTableSection = (props) => {
  const {
    children,
    title,
    isHighlightBest,
    innerScrollX,
    scrollY,
    headerCellWidth,
    cellWidth
  } = props;

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.header,
          {
            transform: [
              {
                translateX: innerScrollX.interpolate({
                  inputRange: [0, 1000],
                  outputRange: [0, 1000],
                  extrapolate: 'clamp'
                })
              }
            ]
          }
        ]}
      >
        <Text style={styles.headerText}>{title}</Text>
      </Animated.View>
      {React.Children.map(children, (child, index) =>
        child
          ? React.cloneElement(child, {
              isHighlightBest,
              innerScrollX,
              scrollY,
              headerCellWidth,
              cellWidth
            })
          : null
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    borderTopWidth: 1,
    borderColor: '#E5E5E5',
    width: Dimensions.get('window').width,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12
  },
  headerText: {
    fontWeight: 'bold'
  },
  upIcon: {
    width: 24,
    height: 24
  }
});

export default ComparisonTableSection;
