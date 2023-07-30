import Vue from 'vue'
import Vuex from 'vuex'
import { saveStatePlugin } from './utils'

Vue.use(Vuex)

const flowchart = JSON.parse(localStorage.getItem('flowchart')) || []

export default new Vuex.Store({
  plugins: [saveStatePlugin],
  state: {
    flowchart
  }
})
