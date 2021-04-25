import axios from 'axios';

export const state = () => ({
  data: []
});

export const mutations = {
  getData(state, payload) {
    state.data = payload
    console.log(state.data)
  }
}

export const actions = {
  async getData ({ commit }, payload) {
    try {
      const headlines = await this.$axios.$get(payload)
      commit('getData', headlines)
    } catch (e) {
      console.log(e)
    }
  }
}
