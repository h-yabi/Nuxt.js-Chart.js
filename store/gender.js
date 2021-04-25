import moment from 'moment'
import countArray from 'count-array-values'

export const state = () => ({
  data: {
    labels: [],
    datasets: [
      {
        label: '男性',
        data: [],
        backgroundColor: 'rgba(0, 108, 255, 0.4)',
        fill: false,
        type: 'bar',
        lineTension: 0.3,
      },
      {
        label: '女性',
        data: [],
        backgroundColor: 'rgba(255, 0, 0, 0.4)',
        fill: false,
        type: 'bar',
        lineTension: 0.3,
      },
    ]
  },
  options: {
    scales: {
      // 横ラベル設定
      xAxes: [{
        scaleLabel: {
          display: true,
          fontColor: "#999",
          labelString: "日付"
        },
        stacked: true,
        ticks: {
          max: 24,
          stepSize: 4,
        }
      }],
      // 軸ラベル設定
      yAxes: [{
        // scaleLabel: {
        //   labelString: "感染者数"
        // },
        stacked: true
      }]
    },
  },
})

export const mutations = {
  genderAggregate(state, data) {

      // 日毎の【性別】を全てgenderに格納 → gender: "女性男性男性男性男性男性女性女性男性"
      const group = data.reduce((result, current) => {
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
      }, []);
      // console.log(group)


      // 配列に分割 → ["女性", "男性", "女性", "男性", "女性"]
      const gender = group.map(value => {
        return value.gender.match(/.{2}/g)
      });


      // 男女別に日毎集計
      // 0: {value: "男性", count: 6}
      // 1: {value: "女性", count: 3}
      const genderTaxonomy = gender.map(value => {
        return countArray(value)
      });


      // 男女の感染者数をそれぞれの配列に格納
      let maleCount = []
      let femaleCount = []
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
          countUp('女性', femaleCount)
          countUp('男性', maleCount)
        }
      });

      // data配列に男女それぞれの集計数を反映
      state.data.datasets[0].data = maleCount
      state.data.datasets[1].data = femaleCount

      // 日付フォーマットを変更
      const formatDate = group.map(value => {
        return moment(value.date, "YYYY-MM-DD").format('M/D')
      });
      state.data.labels = formatDate
  }
}

export const actions = {
  genderAggregate({ commit }, data) {
    commit('genderAggregate', data)
  }
}
