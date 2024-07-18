<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Users</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
            <ion-toolbar>
                <ion-title size="large">Users</ion-title>
            </ion-toolbar>
            </ion-header>
            <ion-list>
                <IonPeekPop v-for="user in usersList" :key="user.name" @onPop="openUser()">
                    <template v-slot:item>
                        <ion-item button>
                            <ion-avatar slot="start">
                                <ion-img :src="user.avatar" />
                            </ion-avatar>
                            <ion-label>
                                <h2><b>{{ user.name }}</b></h2>
                                <p><b>{{ user.email }}</b></p>
                                <p>{{ user.phone }}</p>
                            </ion-label>
                        </ion-item>
                    </template>
                    <template v-slot:popover>
                    <section class="user-preview">
                        <img height="150" width="150" :src="user.avatar" />
                        <h2>{{ user.name }}</h2>
                        <p>{{ user.email }}</p>
                        <p>{{ user.phone }}</p>
                    </section>
                    </template>
                    <template v-slot:contextmenu>
                        <ion-peek-pop-context-menu-item :icon="openOutline" @click="openUser()" label="See user"/>
                        <ion-peek-pop-context-menu-item :icon="chatbubbleEllipsesOutline" :label="'Chat with ' + user.name" />
                        <ion-peek-pop-context-menu-item :icon="callOutline" :label="'Call ' + user.phone" />
                        <ion-peek-pop-context-menu-item :icon="removeCircleOutline" :separate="true" color="danger" :label="'Remove from list'" />
                    </template>
                </IonPeekPop>
            </ion-list>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { IonAvatar, IonContent, IonHeader, IonImg, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import { IonPeekPop, IonPeekPopContextMenuItem } from 'ion-peek-pop';
import 'ion-peek-pop/styles.css';
import { callOutline, chatbubbleEllipsesOutline, openOutline, removeCircleOutline } from 'ionicons/icons';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const openUser = () => {
router.push('/user')
}
const usersList = ref([
{
    name: 'John Doe',
    avatar: 'https://xquality.com.br/wp-content/uploads/2021/02/team-1.jpg',
    email: 'johndoe@example.com',
    phone: '+1234567890'
},
{
    name: 'Jane Doe',
    avatar: 'https://images.unsplash.com/photo-1561406636-b80293969660?fm=jpg&w=3000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    email: 'janedoe@example.com',
    phone: '+0987654321'
},
{
    name: 'Alice',
    avatar: 'https://www.freshfields.com/49a319/globalassets/profile-images/b/lou_bernardfreshfields.com_primary_1000x84072dpi.png',
    email: 'alice@example.com',
    phone: '+1234567890'
},
{
    name: 'Bob',
    avatar: 'https://www.shutterstock.com/image-photo/smiling-african-american-millennial-businessman-600nw-1437938108.jpg',
    email: 'bob@example.com',
    phone: '+0987654321',
},
{
    name: 'Charlie',
    avatar: 'https://www.pajeumotogas.com.br/wp-content/uploads/2016/06/team-1.jpg',
    email: 'charlie@example.com',
    phone: '+1122334455'
},
{
    name: 'Diana',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAV5YKhbr7nKM-TMl2Fp85eD6fHbKAbtjK0lrlWDpKIRVtq7CDK6MJKLJZUXuT8yni59I&usqp=CAU',
    email: 'diana@example.com',
    phone: '+5566778899'
},
{
    name: 'Ethan',
    avatar: 'https://nam.edu/wp-content/uploads/2021/02/John-Doe-Headshot-scaled.jpg',
    email: 'ethan@example.com',
    phone: '+9988776655'
},
{
    name: 'Fiona',
    avatar: 'https://m.media-amazon.com/images/I/91gr30F8H7L._SX450_CR0%2C0%2C450%2C450_.jpg',
    email: 'fiona@example.com',
    phone: '+2233445566'
},
{
    name: 'George',
    avatar: 'https://www.sound.xyz/_next/image?url=https%3A%2F%2Fd2i9ybouka0ieh.cloudfront.net%2Fuser-uploads%2F2ad29c6e-5ee4-440f-877e-70e70ee46e6c%2FAVATAR_IMAGE%2F8315628-85A9F7D1-D40D-4DB0-96F7-AACB725D7732.jpeg&w=3840&q=75',
    email: 'george@example.com',
    phone: '+3344556677'
},
{
    name: 'Hannah',
    avatar: 'https://pbs.twimg.com/profile_images/1639464461844226049/D3efqQ_7_400x400.jpg',
    email: 'hannah@example.com',
    phone: '+4455667788'
},
{
    name: 'Ian',
    avatar: 'https://gcl.sa/wp-content/uploads/2021/02/team-5.jpg',
    email: 'ian@example.com',
    phone: '+5566778899'
},
{
    name: 'Julia',
    avatar: 'https://m.media-amazon.com/images/S/amzn-author-media-prod/gtm8pev8q6ojgdqu3fn8tlsl90._SY450_CR0%2C0%2C450%2C450_.jpg',
    email: 'julia@example.com',
    phone: '+6677889900'
}
])
</script>

<style scoped lang="scss">
.user-preview {
display: flex;
flex-direction: column;
align-items: center;
gap: 1rem;
padding: 1rem;
background-color: white;
border-radius: 1rem;
box-shadow: 0 0 1rem rgba(black, 0.1);
width: 100%;
> img{
    border-radius: 50%;
    object-fit: cover;
}

h2 {
    margin: unset;
    font-size: 1.5rem;
    font-weight: bold;
}
p {
    margin: unset;
    font-size: 1rem;
}
}
</style>