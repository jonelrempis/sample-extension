<template>
    <div>
        <base-modal
            :toggle="toggle"
            header="Choose your payment method"
            action-align="left"
            v-on="$listeners"
        >
            <q-list
                class="no-padding"
                separator
            >
                <q-item
                    v-for="(details, paymentMethod) in activePaymentMethods"
                    :key="details.name"
                    class="row payment-method-choice"
                    @click.native="setUpPaymentMethod(details, paymentMethod)"
                >
                    <div
                        class="col-sm-11 payment-method-container payment-method-details"
                    >
                        <div>
                            <span
                                class="payment-method-name"
                                v-text="details.name"
                            />
                            <q-chip
                                v-if="details.chip"
                                color="primary"
                                small
                            >
                                <span v-text="details.chip.title" />
                                <q-tooltip
                                    v-if="details.chip.note"
                                    :offset="[0, 10]"
                                    anchor="top middle"
                                    self="bottom middle"
                                    v-text="details.chip.note"
                                />
                            </q-chip>
                        </div>
                        <span
                            class="payment-method-info"
                            v-text="details.info"
                        />
                    </div>
                    <div class="col-sm-1 payment-method-container setup-button-container">
                        <i class="fa fa-chevron-right" />
                    </div>
                </q-item>
                <div class="container control-buttons">
                    <div class="row">
                        <div class="col-sm-offset-12">
                            <q-btn
                                :label="'back'"
                                color="primary"
                                flat
                                @click="closeModal"
                            />
                        </div>
                    </div>
                </div>
            </q-list>
        </base-modal>
    </div>
</template>


<script>
    import _ from 'lodash';
    import BaseModal from './BaseModal.vue';

    export default {

        name: 'PaymentChooseMethodModal',

        components: {
            BaseModal
        },

        props: {
            toggle: {
                type: Boolean,
                default: false
            },
            paymentMethodType: {
                type: String,
                required: false,
                default: ''
            },
            user: {
                type: Object,
                required: false,
                default: () => {}
            }
        },

        data() {
            return {
                paymentMethods: {
                    paypal: {
                        modalName: 'PaymentPayPalModal',
                        name: 'Paypal',
                        logo: '/statics/assets/payment-logos/paypal-icon.png',
                        chip: {
                            title: 'Use if earnings are less than $50 monthly'
                        },
                        useUrl: false,
                        active: true,
                        info: 'Not recommended unless your monthly earnings are under $50 and the bank account connected to your PayPal account is in USD'
                    },
                    worldfirst: {
                        modalName: 'PaymentFreedomModal',
                        name: 'Freedom! Bank Transfer',
                        logo: '/statics/assets/payment-logos/worldfirst-icon.png',
                        chip: {
                            title: 'Most Popular'
                        },
                        useUrl: false,
                        active: true,
                        info: 'With the lowest USD to USD transfer fees on payments above $50 and the best foreign exchange rates, you receive the most directly into your bank account.'
                    },
                    tipalti: {
                        modalName: 'PaymentTipaltiModal',
                        name: 'tipalti-bank-transfer',
                        logo: '/statics/assets/payment-logos/tipalti-icon.png',
                        useUrl: true,
                        active: false
                    },
                    payoneer: {
                        modalName: 'PaymentPayoneerModal',
                        name: 'Payoneer',
                        logo: '/statics/assets/payment-logos/payoneer-icon.png',
                        useUrl: true,
                        active: true,
                        info: 'For monthly earnings above $50; note that Payoneer\'s fees to access or convert funds are typically higher than if using Freedom! Bank Transfer'
                    },
                    transferwise: {
                        modalName: 'PaymentTransferwiseModal',
                        name: 'transferwise',
                        logo: '/statics/assets/payment-logos/transferwise-icon.png',
                        useUrl: false,
                        chip: {
                            title: 'beta',
                            note: 'transferwise-beta-note'
                        },
                        active: false
                    },
                    dcc: {
                        modalName: 'PaymentDCCModal',
                        name: 'digital-content-center',
                        logo: '/statics/assets/payment-logos/dcc-icon.png',
                        useUrl: false,
                        active: false
                    },
                },
            };
        },

        computed: {
            activePaymentMethods () {
                return _.pickBy(this.paymentMethods, (details, paymentMethod) => details.active || paymentMethod === this.paymentMethodType);
            }
        },

        methods: {
            isInAvailablePaymentMethods(paymentMethod) {
                return _.includes(_.keys(this.user.availablePaymentMethods), paymentMethod);
            },

            closeModal() {
                this.$emit('closeModal');
            },

            setUpPaymentMethod(details, paymentMethod) {
                this.openModal(details, paymentMethod);
            },

            openModal(details, paymentMethod) {
                this.$emit('choosePaymentMethod', details.modalName);

                if (details.useUrl) {
                    this.$emit(`get${_.capitalize(paymentMethod)}Url`);
                }
            },

        },
    };
</script>
