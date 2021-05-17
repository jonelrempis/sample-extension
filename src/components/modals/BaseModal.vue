<template>
    <q-dialog
        v-model="toggle"
        :maximized="maximized"
        :full-width="fullWidth"
        :content-class="[{ 'absolute-bottom-actions': absoluteBottomActions }, 'base-modal']"
        no-backdrop-dismiss
        no-esc-dismiss
    >
        <q-card :class="'size-' + size">
            <q-card-section>
                <div class="row items-center">
                    <div class="col">
                        <span
                            class="text-weight-medium text-h6"
                            v-text="header"
                        />
                    </div>
                    <div class="col-auto">
                        <q-btn
                            icon="close"
                            flat
                            round
                            color="grey-8"
                            class="btn-close"
                            @click="$emit('closeModal')"
                        />
                    </div>
                </div>
            </q-card-section>

            <q-card-section
                v-if="$slots.default"
                class="q-pt-none"
            >
                <slot />
            </q-card-section>

            <q-card-section
                v-if="$slots.iframes"
                class="q-pa-none iframes"
            >
                <slot name="iframes" />
            </q-card-section>

            <q-card-actions
                v-if="$slots.actions"
                :align="actionAlign"
                :class="absoluteBottomActions ? 'absolute-bottom' : ''"
                class="q-pa-md"
            >
                <slot name="actions" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
    export default {
        name: 'BaseModal',

        props: {
            toggle: {
                type: Boolean,
                default: false,
            },
            header: {
                type: [String, Object],
                required: true
            },
            noPadding: {
                type: Boolean,
                default: false
            },
            maximized: {
                type: Boolean,
                default: false
            },
            size: {
                type: String,
                default: ''
            },
            actionAlign: {
                type: String,
                default: 'right'
            },
            fullWidth: {
                type: Boolean,
                default: false
            },
            absoluteBottomActions: {
                type: Boolean,
                default: false
            }
        },
    };
</script>
