import Component from '../components/Component.vue'
import PaymentComponent from '../components/PaymentComponent.vue'

export default ({ Vue }) => {
    Vue.component(Component.name, Component)
    Vue.component(PaymentComponent.name, PaymentComponent)
}
