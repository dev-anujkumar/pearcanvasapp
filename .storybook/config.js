import { configure } from '@storybook/react'
import '@storybook/addon-console' //Global to print all console errors on storybook canvas  
import { addDecorator } from '@storybook/react'
import { withInfo } from '@storybook/addon-info' //Globle import for info of a story
import { addReadme } from 'storybook-readme'

addDecorator(withInfo)
addDecorator(addReadme)

// automatically import all files ending in *.stories.js under stories folder //
const req = require.context('../stories', true, /\.stories\.js$/)

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
