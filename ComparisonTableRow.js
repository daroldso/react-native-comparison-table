import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Animated, Dimensions, Text, View, StyleSheet } from 'react-native';
import get from 'lodash.get';
// import { getFormattedCurrency } from '~/utils/units'

const ComparisonTableRow = (props) => {
  const {
    data = [],
    comparing,
    getBestBy,
    fixed,
    cellTextAlign,
    headerCellContent,
    headerCellStyle,
    cellContent,
    cellStyle,
    rowStyle,
    bestCellStyle,
    bestCellTextStyle,
    mergeCells,

    isHighlightBest,
    headerCellWidth,
    cellWidth,
    innerScrollX,
    scrollY
  } = props;

  let bestValueIndices = [];
  // Only sort them if user provide getBestBy order string/comparison function to sort the values
  if (comparing && getBestBy) {
    const valuesOriginal =
      typeof comparing === 'function'
        ? comparing(data)
        : data.map((item) => getComparingValue(item, comparing));

    const valuesSorted = getSortedValues(valuesOriginal, getBestBy);

    // if bestValueIndices is -1, either there is no best or getBestBy is null
    bestValueIndices = getBestValueIndices(valuesOriginal, valuesSorted);
  }

  const isAllValuesEqual = bestValueIndices.length === data.length;

  const mergedBestCellStyle = {
    ...styles.bestCell,
    ...bestCellStyle
  };

  const mergedBestCellTextStyle = {
    ...styles.bestCellText,
    ...bestCellTextStyle
  };

  function getComparingValue(item, comparing) {
    return get(item, comparing);
  }

  function getSortedValues(valuesOriginal, getBestBy) {
    let valuesSorted = [...valuesOriginal];
    console.log('valuesSorted: ', valuesSorted);
    if (typeof getBestBy === 'function') {
      valuesSorted.sort(getBestBy);
    } else if (getBestBy === 'asc') {
      valuesSorted.sort((a, b) => a - b);
    } else if (getBestBy === 'desc') {
      valuesSorted.sort((a, b) => b - a);
    }
    return valuesSorted;
  }

  function getBestValueIndices(valuesOriginal, valuesSorted) {
    const [bestValue] = valuesSorted;
    let bestValueIndices = [];
    if (bestValue !== undefined) {
      valuesOriginal.forEach((value, i) => {
        if (value === bestValue) {
          bestValueIndices.push(i);
        }
      });
    } else {
      bestValueIndices = [-1];
    }
    return bestValueIndices;
  }

  function renderHeaderCellContent() {
    return (
      <Animated.View
        style={[
          styles.headerCell,
          { width: headerCellWidth },
          headerCellStyle,
          innerScrollX && {
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
        {typeof headerCellContent === 'function' ? (
          headerCellContent()
        ) : (
          <Text style={styles.headerCellText}>{headerCellContent}</Text>
        )}
      </Animated.View>
    );
  }

  function renderTemplateCellContent(cellContent, item) {
    const comparingValue = getComparingValue(item, comparing);
    if (comparing && !comparingValue) {
      return '-';
    }

    return comparingValue;
  }

  function renderCustomCellContent(
    cellContent,
    index,
    item,
    isBest,
    mergedBestCellTextStyle
  ) {
    let customCellContent = cellContent({
      item,
      index,
      isBest,
      cellTextStyle: styles.cellText,
      bestCellTextStyle: mergedBestCellTextStyle
    });

    if (React.isValidElement(customCellContent)) {
      return customCellContent;
    }

    return (
      <Text
        style={[
          styles.cellText,
          cellTextAlign && { textAlign: cellTextAlign },
          isBest && mergedBestCellTextStyle
        ]}
      >
        {renderTemplateCellContent(customCellContent, item)}
      </Text>
    );
  }

  return (
    <Animated.View
      style={[
        styles.row,
        rowStyle,
        fixed &&
          scrollY && {
            ...styles.fixedRow,
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [0, 10000],
                  outputRange: [0, 10000],
                  extrapolate: 'clamp'
                })
              }
            ]
          }
      ]}
    >
      {headerCellContent !== undefined && renderHeaderCellContent()}
      {mergeCells ? (
        <Animated.View
          style={[
            styles.mergedCell,
            { width: Dimensions.get('window').width - headerCellWidth },
            cellStyle,
            innerScrollX && {
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
          {cellContent && typeof cellContent === 'function'
            ? cellContent({ data })
            : null}
        </Animated.View>
      ) : (
        data.map((item, index) => {
          const isBest =
            bestValueIndices.includes(index) &&
            isHighlightBest &&
            !isAllValuesEqual;
          return (
            <View
              style={[
                styles.cell,
                cellStyle,
                { width: cellWidth },
                isBest && mergedBestCellStyle
              ]}
              key={index}
            >
              {typeof cellContent === 'function' ? (
                renderCustomCellContent(
                  cellContent,
                  index,
                  item,
                  isBest,
                  mergedBestCellTextStyle
                )
              ) : (
                <Text
                  style={[
                    styles.cellText,
                    cellTextAlign && { textAlign: cellTextAlign },
                    isBest && mergedBestCellTextStyle
                  ]}
                >
                  {renderTemplateCellContent(cellContent, item)}
                </Text>
              )}
            </View>
          );
        })
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  row: {
    borderTopWidth: 1,
    borderColor: '#E5E5E5',
    flexDirection: 'row'
  },
  fixedRow: {
    position: 'relative',
    zIndex: 100
  },
  headerCell: {
    position: 'relative',
    zIndex: 10,
    backgroundColor: '#F9F9FB',
    paddingVertical: 11,
    paddingHorizontal: 12,
    borderRightWidth: 1,
    borderColor: '#E5E5E5'
  },
  cell: {
    backgroundColor: '#FFF',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRightWidth: 1,
    borderColor: '#E5E5E5'
  },
  mergedCell: {
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  headerCellText: {
    fontSize: 20
  },
  cellText: {
    fontSize: 20
  },
  bestCell: {
    backgroundColor: 'rgba(255,236,170,0.2)'
  },
  bestCellText: {
    color: '#F6571A',
    fontWeight: 'bold'
  }
});

ComparisonTableRow.propTypes = {
  data: PropTypes.array,
  comparing: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  getBestBy: PropTypes.oneOfType([
    PropTypes.oneOf(['asc', 'desc']),
    PropTypes.func
  ]),
  headerCellContent: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  headerCellStyle: PropTypes.object,
  cellContent: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  cellStyle: PropTypes.object,
  rowStyle: PropTypes.object,
  bestCellStyle: PropTypes.object,
  bestCellTextStyle: PropTypes.object,
  isHighlightBest: PropTypes.bool,
  innerScrollX: PropTypes.object
};

ComparisonTableRow.defaultProps = {};

export default ComparisonTableRow;
