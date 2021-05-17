<template>
    <div class="my-component__text">
        Hello, World!

        <div class="row q-col-gutter-sm">
            <q-input
                v-model="first_name"
                class="col-sm-12"
                label="First Name"
                outlined
            />

            <q-input
                v-model="last_name"
                class="col-sm-12"
                label="Last Name"
                outlined
            />
        </div>

        <q-btn
            class="q-mt-sm"
            color="primary"
            label="Submit"
        />
    </div>
</template>

<script>
    export default {
        name: 'MyComponent',

        data() {
            return {
                first_name: null,
                last_name: null
            };
        }
    }
</script>
