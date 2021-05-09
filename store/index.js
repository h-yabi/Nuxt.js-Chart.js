import moment from 'moment'
import countArray from 'count-array-values'

export const state = () => ({
  data: [], // 30日分の取得データ
  dailyCount: [], // 日毎の集計データ → [{ date: '2021-03-27', gender: '男性女性女性男性~ }]
  totalCount: [], // 日毎の合計
  maleCount: [], // 日毎の数（男性）
  femaleCount: [], // 日毎の数（女性）
})

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


    // 日毎の【性別】を全てgenderに格納 → gender: "女性男性男性男性男性男性女性女性男性"
    // ▼形式
    // [{
    //  date: '2021-03-27',
    //  gender: '男性女性女性男性
    // }]
    state.dailyCount = array.reduce((result, current) => {
      const element = result.find((p) => p.date === current.date);
      if (element) {
        element.gender += current.gender;
      } else {
        result.push({
          date: current.date,
          gender: current.gender
        });
      }
      return result;
    }, [])


    // 配列に分割 → ["女性", "男性", "女性", "男性", "女性"]
    const gender = state.dailyCount.map(value => {
      return value.gender.match(/.{2}/g)
    })


    // 日毎の合計数を集計
    state.totalCount = gender.map(value => {
      return value.length
    })


    // 男女別に日毎集計
    // 0: {value: "男性", count: 6}
    // 1: {value: "女性", count: 3}
    const genderTaxonomy = gender.map(value => {
      return countArray(value)
    });
    // console.log(genderTaxonomy)


    // 男女の感染者数をそれぞれの配列に格納
    genderTaxonomy.map((value) => {
      const countUp = (gender, array) => {
        if(value[0] === undefined || value[1] === undefined && value[0].value !== gender) {
          array.push(0)
        } else {
          if(value[0].value === gender) {
            array.push(value[0].count)
          } else if(value[1].value === gender) {
            array.push(value[1].count)
          }
        }
      }

      if(value.length === 2 || value.length === 1) {
        countUp('女性', state.femaleCount)
        countUp('男性', state.maleCount)
      }
    })

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
