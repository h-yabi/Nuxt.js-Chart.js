import moment from 'moment'

export const state = () => ({
  data: {
    labels: [],
    datasets: [
      {
        label: '男性',
        data: [],
        backgroundColor: 'rgba(0, 108, 255, 0.4)',
        borderColor: 'rgba(0, 108, 255, 0.4)',
        fill: false,
        type: 'line',
        lineTension: 0.5,
      },
      {
        label: '女性',
        data: [],
        backgroundColor: 'rgba(255, 0, 0, 0.4)',
        borderColor: 'rgba(255, 0, 0, 0.4)',
        fill: false,
        type: 'line',
        lineTension: 0.3,
      },
      {
        label: '合計',
        data: [],
        backgroundColor: 'rgba(210, 210, 210, 0.9)',
        borderColor: 'rgba(210, 210, 210, 0.9)',
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
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  },
})

export const mutations = {
  timeScale(state, rootState) {

    // data配列に男女それぞれの集計数を反映
    state.data.datasets[0].data = rootState.maleCount
    state.data.datasets[1].data = rootState.femaleCount
    state.data.datasets[2].data = rootState.totalCount

    // 日付フォーマットを変更
    const formatDate = rootState.dailyCount.map(value => {
      return moment(value.date, "YYYY-MM-DD").format('M/D')
    });
    state.data.labels = formatDate
  }
}

export const actions = {
  timeScale({ commit, rootState }) {
    commit('timeScale', rootState)
  }
}
