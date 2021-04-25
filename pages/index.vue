<template>
  <div class="container">
    <div class="inner">
      <h1 class="title">【東京都】<br>新型コロナ陽性患者数の集計<span>（直近30日）</span></h1>
      <Gender />
    </div>
  </div>
</template>

<script>
export default {
  async fetch ({ store }) {
    const apiUrl = '/api/data/130001_tokyo_covid19_patients.csv'
    await store.dispatch('getData', apiUrl)
  }
}
</script>

<style lang="sass">
.container
  margin: 0 auto
  min-height: 100vh
  display: flex
  justify-content: center
  align-items: center
  text-align: center

.inner
  width: 100%
  max-width: 1000px

.title
  display: block
  font-weight: 300
  font-size: 100px
  color: #35495e
  letter-spacing: 1px

.subtitle
  font-weight: 300
  font-size: 42px
  color: #526488
  word-spacing: 5px
  padding-bottom: 15px

.links
  padding-top: 15px
</style>
