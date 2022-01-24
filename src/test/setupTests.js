import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({
  adapter: new Adapter()  // The adapter abstracts away anything that changes based on the React version so the core enzyme code can stay the same.
})

require('dotenv').config({ path: '.env.test' })