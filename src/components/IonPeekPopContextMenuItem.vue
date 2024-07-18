<template>
    <button ref="buttonElement" :label="label" :value="value" @click="onClickItem" :separate="separate">
        <ion-label :color="colorUI">
            {{ label }}
        </ion-label>
        <ion-icon :icon="iconUI" :color="colorUI"></ion-icon>
    </button>
</template>

<script setup lang="ts">

import { onMounted, getCurrentInstance, ref, computed } from 'vue';
import { IonList, IonItem, IonLabel, IonBackdrop, IonIcon } from '@ionic/vue';

const buttonElement = ref(null);

const props = defineProps({
    icon: {
        type: String,
        required: false,
        default: null
    },
    label: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: false,
        default: null
    },
    value: {
        type: String,
        required: false,
        default: null
    },
    separate: {
        type: Boolean,
        required: false,
        default: false
    }
})



const iconUI = computed(() => {
    if (props.icon){
        return props.icon;
    }else{
        return undefined;
    }
})

const colorUI = computed(() => {
    if (props.color){
        return props.color;
    }else{
        return 'dark';
    }
})

const emit = defineEmits(['click']);

const onClickItem = () => {
    emit('click');
}

onMounted(() => {

});

</script>


<style scoped lang="scss">
button{
    display: flex;
    align-items: center;
    column-gap: 10px;
    font-size: 17px;
    padding: 12px 15px;
    width: 100%;
    justify-content: space-between;
    background: transparent;
    text-align: left;
    > p{
        margin: 0;
    }
}



</style>