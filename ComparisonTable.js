import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Animated, Dimensions, Platform, View, StyleSheet } from 'react-native';

const ComparisonTable = (props) => {
  const {
    children,
    isHighlightBest = true,
    headerCellWidth = 90,
    cellWidth = 156,
    height = 400
  } = props;
  const innerScrollX = useRef(new Animated.Value(0)).current;
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <View style={{ height }}>
      <Animated.ScrollView
        scrollEventThrottle={8}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          // In android, useNativeDriver will trigger a strange error:
          // Error while updating 'transform' of a view managed by: RCTView
          Platform.OS == 'ios' && {
            useNativeDriver: true
          }
        )}
      >
        <View>
          <Animated.ScrollView
            horizontal
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: innerScrollX } } }],
              Platform.OS == 'ios' && {
                useNativeDriver: true
              }
            )}
          >
            <View>
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
          </Animated.ScrollView>
        </View>
      </Animated.ScrollView>
    </View>
  );
};

ComparisonTable.propTypes = {
  cellWidth: PropTypes.number,
  headerCellWidth: PropTypes.number,
  height: PropTypes.number,
  isHighlightBest: PropTypes.bool
};

const styles = StyleSheet.create({
  fixedHeader: {
    borderBottomWidth: 1,
    borderColor: '#CBCBCB',
    position: 'absolute',
    width: Dimensions.get('window').width,
    top: 0,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    zIndex: 1
  },
  headerText: {
    fontWeight: 'bold'
  }
});

export default ComparisonTable;
