# `react-native-comparison-table`

![MIT License](https://img.shields.io/npm/l/@react-native-community/checkbox.svg) [![npm version](https://img.shields.io/npm/v/@react-native-community/checkbox.svg?style=flat)](https://www.npmjs.com/package/@react-native-community/checkbox)

Comparison table with fixed header for React Native

<img src="https://user-images.githubusercontent.com/9425789/92948433-f1a56000-f48b-11ea-8751-4175b8061d17.gif" />

## Getting started

`yarn add react-native-comparison-table`

or

`npm install react-native-comparison-table --save`

## Usage

```js
import {
  ComparisonTable,
  ComparisonTableSection,
  ComparisonTableRow
} from 'react-native-comparison-table';
```

```js
  const phones = [
    {
      id: 1,
      name: 'iPhone 11 Pro',
      image: require('./images/iphone11_pro.jpg'),
      screenSize: '5.8',
      display: 'Super Retina XDR display',
      height: '144.0',
      width: '71.4',
      depth: '8.1',
      weight: '188',
      videoPlayback: '18',
      audioPlayback: '65'
    },
    {
      id: 2,
      name: 'iPhone 11',
      image: require('./images/iphone11.jpg'),
      screenSize: '6.1',
      display: 'Liquid Retina HD display',
      height: '150.9',
      width: '75.7',
      depth: '8.3',
      weight: '194',
      videoPlayback: '17',
      audioPlayback: '65'
    },
    {
      id: 3,
      name: 'iPhone SE (2nd generation)',
      image: require('./images/iphoneSE.jpg'),
      screenSize: '4.7',
      display: 'Retina HD display',
      height: '138.4',
      width: '67.3',
      depth: '7.3',
      weight: '148',
      videoPlayback: '13',
      audioPlayback: '40'
    }
  ]

  <ComparisonTable
    height={600}
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
        headerCellContent="Weight"
        data={phones}
        getBestBy="asc"
        comparing="weight"
      />
    </ComparisonTableSection>
  </ComparisonTable>
```

Check out the [example project](example) for more examples.

## Props

### `<ComparisonTable />`

| Prop name       | Type    | Description                                                                    | Default |
| --------------- | ------- | ------------------------------------------------------------------------------ | ------- |
| isHighlightBest | boolean | If false the cell with the best compared value won't be highlighted            | true    |
| headerCellWidth | number  | Width of the header cell                                                       | 90      |
| cellWidth       | number  | Width of the body cell                                                         | 156     |
| height          | number  | The height of the table. It is required if the top ComparisonTableRow is fixed | 400     |

### `<ComparisonTableSection />`

| Prop name | Type   | Description              | Default |
| --------- | ------ | ------------------------ | ------- |
| title     | string | The title of the section |         |

### `<ComparisonTableRow />`

| Prop name         | Type            | Description                                                                                                                                                                                                                                                                        | Default |
| ----------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| data              | array           | Array of objects to compare. Data structure can refer to the example above. **Required**                                                                                                                                                                                           |         |
| comparing         | string/function | string: The key of the object to compare. <br> function: need to return an array of data to compare, e.g. (data) => data.map(item => item.count).<br /> **Required** if the best value need to be highlighted                                                                      |         |
| getBestBy         | string/function | string: **asc** or **desc**. The values will be sorted in specified order and the first item would be the best. <br /> function: custom compare function be passed to `array.sort()`. The first item will be the best. <br />**Required** if the best value need to be highlighted |         |
| fixed             | boolean         | Fixes the row position. Normally would apply to the first row                                                                                                                                                                                                                      | false   |
| cellTextAlign     | string          | Setting the `textAlign` of the body cell text                                                                                                                                                                                                                                      | left    |
| headerCellContent | string/function | The content of the header cell. Use function to render custom content. You can pass empty string if you want the header cell to be empty                                                                                                                                           |         |
| headerCellStyle   | object          | The style of the header cell.                                                                                                                                                                                                                                                      |         |
| cellContent       | function        | Customise the content of body cell. By default the body cell will display the comparing value <br />`({ item, index, isBest, cellTextStyle, bestCellTextStyle }) => {}`                                                                                                            |         |
| cellStyle         | object          | The style of the body cell.                                                                                                                                                                                                                                                        |         |
| rowStyle          | object          | The style of the row.                                                                                                                                                                                                                                                              |         |
| bestCellStyle     | object          | The style of the cell containing best value. Expected to apply to `<View>`                                                                                                                                                                                                         |         |
| bestCellTextStyle | object          | The text style of the cell containing best value. Expected to apply to `<Text>`                                                                                                                                                                                                    |         |
| mergeCells        | boolean         | Merges the body cells. Combining with empty `headerCellContent` and custom `cellContent`, you can create a row with custom content                                                                                                                                                 | false   |

## Contributors

Issues and pull requests are welcomed. For issues, please attach a screenshot showing the bug along with code snippet.

## License

The library is released under the MIT licence.
