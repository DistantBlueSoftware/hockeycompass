# Hockey Compass

## Installation

```
git clone https://github.com/DistantBlueSoftware/hockeycompass.git [your-dir]
cd [your-dir]
yarn && cd client && yarn && cd .. && yarn dev /* or the same but with npm install */
```

## Facts

You'll need a few environment variables for test; create a `.env` file in the root dir and enter something akin to the following: 

```
MAILGUN_API_KEY=any_key_will_do_for_test
MAILGUN_DOMAIN=mg.test.com
ROOT_URL=localhost:3000
STRIPE_SECRET_KEY_TEST=test_stripe_key
```
Note: test Stripe payments will fail unless you have the actual test key for the account, or your own test key.

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

