# Demo Components Library
A quick demo of how to build a components library using ReactJS, Material UI, Styled components, Typescript and publish CJS, ESM, ES modules and a minified bundle.


## Usage

Here is a quick example to get you started, **it's all you need**:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { MyComponent } from 'componentsLibrary';
or;
import { MyComponent } from 'componentsLibrary/components';
or;
import MyComponent from 'componentsLibrary/components/MyComponent';

function App() {
    return <MyComponent>Hello World</MyComponent>;
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

## Theming

All components support DCL Pro themes.
The default styling for every component is based on DCL Pro light theme.
All DCL components also support dark DCL Pro theme colour palette as well as brand colours.

To use themes, you can wrap the components in DCL's ThemeProvider.

```tsx
import { ThemeProvider } from 'componentsLibrary';

<ThemeProvider>... your application containing DCL components here ...</ThemeProvider>;
```

Apart from the `ThemeProvider`, DCL also exports `ThemeConsumer` and `useThemeContext` that can be used to interact
with the properties of `ThemeProvider`

## Screenshots

Screenshots for all components are available [here](src/test/__image_snapshots__)
