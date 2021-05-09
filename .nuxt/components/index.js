import { wrapFunctional } from './utils'

export { default as Logo } from '../../components/Logo.vue'
export { default as TimeScale } from '../../components/TimeScale.vue'

export const LazyLogo = import('../../components/Logo.vue' /* webpackChunkName: "components/logo" */).then(c => wrapFunctional(c.default || c))
export const LazyTimeScale = import('../../components/TimeScale.vue' /* webpackChunkName: "components/time-scale" */).then(c => wrapFunctional(c.default || c))
