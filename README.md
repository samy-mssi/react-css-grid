# Grid Component Library

## Introduction

This library provides a flexible, responsive grid component for ReactJS. It is written in TypeScript and uses CSS properties to define the grid layout.

## Installation

##### Using npm

```bash
npm install --save react-simple-css-grid
```

##### Using yarn

```bash
yarn add react-simple-css-grid
```

## Usage

Import the Grid component in your file:

```
import Grid from 'react-css-grid';
```

You can then use it in your component:

```
<Grid columns={2} rows={2} height="200px">
  <div>Element 1</div>
  <div>Element 2</div>
  <div>Element 3</div>
  <div>Element 4</div>
</Grid>
```

## Props

The Grid component accepts the following props:

- children: The child elements to display in the grid.
- style: Additional CSS styles to apply to the grid.
- columns: The number of columns or the ‘grid-template-columns’ - CSS property value.
- smallScreenColumns: The number of columns or the ‘grid-template-columns’ CSS property value for small screens.
- rows: The number of rows or the ‘grid-template-rows’ CSS property value.
- rowGap: The gap between rows.
- columnGap: The gap between columns.
- className: An additional CSS class to apply to the grid.
- uniqueClass: A unique CSS class to apply to the grid. (see #Optimize section)
- alignCenter: If true, grid items are vertically centered.
- alignStart: If true, grid items are aligned to the start.
- height: The height of the grid.

## Optimize

RCG works by defining CSS styles in `<head>` with a unique class, instead of setting inline styles.

Sometimes, you may need to set a grid layout in a .map() function. In this case, you should set the `uniqueClass` prop.

If your .map() returns 10 elements using RCG, it will create 10 different classes with the same properties. By using `uniqueClass`, only one class will be defined for your 10 elements.

## License

MIT
