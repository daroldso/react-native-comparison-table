import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  useWindowDimensions
} from 'react-native';

import {
  ComparisonTable,
  ComparisonTableSection,
  ComparisonTableRow
} from 'react-native-comparison-table';

import phones from './phones';

const App = () => {
  const dimension = useWindowDimensions();

  return (
    <SafeAreaView style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Compare iPhones</Text>
      <View style={styles.tableContainer}>
        <ComparisonTable
          height={dimension.height - 120}
          headerCellWidth={110}
          cellWidth={200}
        >
          <ComparisonTableRow
            fixed
            headerCellContent="Model"
            data={phones}
            comparing="name"
            rowStyle={styles.rowShadow}
          />
          <ComparisonTableRow
            headerCellContent=""
            data={phones}
            cellContent={({ item }) => (
              <Image
                source={item.image}
                resizeMode="contain"
                style={{
                  width: 80,
                  height: 120
                }}
              />
            )}
            cellStyle={styles.alignCenter}
          />
          <ComparisonTableSection title="Display">
            <ComparisonTableRow
              headerCellContent=""
              data={phones}
              comparing="screenSize"
              getBestBy="desc"
              cellContent={({
                item,
                isBest,
                cellTextStyle,
                bestCellTextStyle
              }) => (
                <View style={styles.alignCenter}>
                  <Text
                    style={[
                      isBest && bestCellTextStyle,
                      {
                        fontSize: 30,
                        marginBottom: 4
                      }
                    ]}
                  >
                    {item.screenSize}
                  </Text>
                  <Text
                    style={[
                      isBest && bestCellTextStyle,
                      { fontSize: 18, textAlign: 'center' }
                    ]}
                  >
                    {item.display}
                  </Text>
                </View>
              )}
            />
            <ComparisonTableRow
              headerCellContent=""
              data={phones}
              cellContent={({ item }) => (
                <View style={styles.alignCenter}>
                  <Image
                    source={item.cameraImage}
                    resizeMode="contain"
                    style={styles.cameraImage}
                  />
                  <Text style={styles.cameraDesc}>{item.cameraDesc}</Text>
                </View>
              )}
            />
          </ComparisonTableSection>
          <ComparisonTableSection title="Size and Weight">
            <ComparisonTableRow
              headerCellContent="Height"
              data={phones}
              comparing="height"
            />
            <ComparisonTableRow
              headerCellContent="Width"
              data={phones}
              comparing="width"
            />
            <ComparisonTableRow
              headerCellContent="Depth"
              data={phones}
              comparing="depth"
            />
            <ComparisonTableRow
              headerCellContent="Weight"
              data={phones}
              getBestBy="asc"
              comparing="weight"
            />
          </ComparisonTableSection>
          <ComparisonTableSection title="Power and Battery">
            <ComparisonTableRow
              headerCellContent="Video playback"
              data={phones}
              comparing="videoPlayback"
              getBestBy="desc"
            />
            <ComparisonTableRow
              headerCellContent="Audio playback"
              data={phones}
              comparing="audioPlayback"
              getBestBy="desc"
            />
          </ComparisonTableSection>
        </ComparisonTable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 24,
    paddingHorizontal: 12
  },
  tableContainer: {
    marginTop: 12
  },
  rowShadow: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4
  },
  alignCenter: {
    alignItems: 'center'
  },
  cameraImage: {
    width: 80,
    height: 100
  },
  cameraDesc: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 6
  }
});

export default App;
