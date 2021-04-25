import moment from 'moment'

export const state = () => ({
  data: []
});

export const mutations = {
  getData(state, response) {

    // csvファイルを1行ごとに分割
    const splitOneLine = response.split('\n')

    // 現在日の【30日前】の日付を取得
    // ※APIが当日データを提供していないため、31日としている
    const getDate = moment().subtract(31, "days").format("Y-MM-DD")

    // 取得したい情報を配列にオブジェクトとして格納（日付、性別、年齢）
    let array = []
    for(let i = 1; i < splitOneLine.length - 1; i++) {
      if(moment(splitOneLine[i].split(',')[4]).isAfter(getDate)) {
        array.push({
          date: splitOneLine[i].split(',')[4],
          gender: splitOneLine[i].split(',')[9],
          age: splitOneLine[i].split(',')[8]
        });
      }
    }
    state.data = array
    // console.log(state.data)
  }
}

export const actions = {
  async getData ({ commit }, url) {
    try {
      const response = await this.$axios.$get(url)
      commit('getData', response)
    } catch (e) {
      console.log(e)
    }
  }
}
