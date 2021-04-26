<script>
import { Bar } from 'vue-chartjs'
import { mapActions } from 'vuex'

export default {
  extends: Bar,
  mounted() {
    this.timeScale()
    this.renderChart(this.$store.state.timescale.data, this.$store.state.timescale.options)
  },
  methods: {
    ...mapActions({
      timeScale: 'timescale/timeScale'
    })
  }
}
</script>

<style lang="sass">
#bar-chart
  width: 100%
  max-width: 600px
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
  margin: 30px auto

.title
  margin-bottom: 40px
  font-size: 24px
  line-height: 1.5
  span
    display: block
    margin-top: 5px
    font-size: 18px
</style>
