<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">
        test
      </h1>
    </div>
  </div>
</template>

<script>
export default {

  async fetch ({ store }) {
    const apiUrl = '/api/data/130001_tokyo_covid19_patients.csv'
    await store.dispatch('getData', apiUrl);
  }

  // async fetch({ app, store }) {
  //   this.posts = await this.$http.$get('/api/data/130001_tokyo_covid19_patients.csv')
  //   store.commit('setHige', doc.data().hige)
  // },

  // fetch ({ store, params }) {
  //   return axios.get('/api/data/130001_tokyo_covid19_patients.csv')
  //   .then((res) => {
  //     console.log(res)
  //     store.commit('getData', res.data)
  //   })
  // }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
