<template>
    <div class="payment-setup-control">
        <div class="row payment-row q-col-gutter-xs">
            <div class="col-xs-12 col-sm-8">
                <div>
                    <span
                        class="payment-title text-bold"
                        v-text="paymentMethodLabel"
                    />
                    <br>
                    <br>
                    <span
                        class="payment-description"
                    >
                        <span
                            class="payment-method-name"
                            v-text="availablePaymentMethods"
                        />
                    </span>
                </div>
            </div>
            <div class="col-xs-12 col-sm-4">

                <q-btn
                    class="btn-primary float-right-desktop"
                    @click="changeActiveModal('PaymentChooseMethodModal')"
                >
                    <span v-text="setupButtonLabel" />
                </q-btn>
            </div>
        </div>

        <payment-choose-method-modal
            :toggle="isActiveModal('PaymentChooseMethodModal')"
            @closeModal="dismissModal"
        />

        <payment-paypal-modal
            :toggle="isActiveModal('PaymentPaypalModal')"
            @closeModal="dismissModal"
        />

    </div>
</template>

<script>
    import PaymentChooseMethodModal from './modals/PaymentChooseMethodModal'

    export default {
        name: 'PaymentComponent',

        components: {
            PaymentChooseMethodModal,
        },

        beforeMount () {
            this.__setupIcons()
        },

        data() {
            return {
                paymentMethodLabel: 'Payment Method',
                availablePaymentMethods: 'Freedom! Bank Transfer, PayPal, Tipalti, Payoneer, TransferWise, DCC',
                setupButtonLabel: 'Set up now',
                activeModal: '',
                iconSet: {
                    paymentComponent: {}
                },
            };
        },


        methods: {
            changeActiveModal(modalName) {
                this.activeModal = modalName;
            },

            dismissModal() {
                this.changeActiveModal('');
            },

            isActiveModal(modalName) {
                return this.activeModal === modalName;
            },

            __setupIcons () {
                const iconSetName = this.$q.iconSet.name || 'fontawesome-v5'
                let iconSet
                try {
                    iconSet = this.__loadIconSet(iconSetName)
                }
                catch (e) {}
                iconSet !== void 0 && iconSet.name !== void 0 && (this.iconSet.mediaPlayer = { ...iconSet.mediaPlayer })
            },

            __loadIconSet (set) {
                let iconsList = {}
                if (set) {
                    // detect if UMD version is installed
                    if (window && window.SampleExtension && window.SampleExtension.Component) {
                        const name = set.replace(/-([a-z])/g, g => g[1].toUpperCase())
                        if (window.SampleExtension.iconSet && window.SampleExtension.iconSet[name]) {
                            const iconsSet = window.SampleExtension.iconSet[name]
                            iconsList = iconsSet
                        }
                        else {
                            /* eslint-disable-next-line no-console */
                            console.error(`SampleExtension: no icon set loaded called '${set}'`)
                            /* eslint-disable-next-line no-console */
                            console.error('Be sure to load the UMD version of the icon set in a script tag before using with UMD')
                        }
                    }
                    else {
                        try {
                            // const iconsSet = require(`quasar-app-extension-sample-extension/src/components/icon-set/${set}.js`).default
                            const iconsSet = require(`quasar-app-extension-sample-extension/src/components/icon-set/${set}.js`).default
                            iconsList = iconsSet
                        }
                        catch (e) {
                            /* eslint-disable-next-line no-console */
                            console.error(`SampleExtension: cannot find icon set file called '${set}'`)
                        }
                    }
                }
                return iconsList
            },
        },
    };
</script>