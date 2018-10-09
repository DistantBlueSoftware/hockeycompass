# Hockey Compass

## Installation

```
git clone https://github.com/perezvon/hockeycompass.git [your-dir]
cd [your-dir]
yarn && yarn dev (or npm install && npm run dev)
```

## Facts

All client-side code is in the `client` subfolder.

This project uses [Bootstrap 4](https://getbootstrap.com/docs/4.0/getting-started/introduction/) for basic framework.

## Opinions

We try to keep styles inline with their components, like this:

```javascript 
// MyComponent.jsx
const containerStyle = {
  height: '500px',
  width: '400px',
  display: 'flex',
  justifyContent: 'row wrap'
}

class MyComponent extends Component {
  ...
  return (
    <div 
      className='container' /*Bootstrap class*/
      style={containerStyle}>
    ...
  )
}
```

Sometimes you'll need a hover state or something that inlining is awkward at, in which case use a .css file with the same name as the component. 

