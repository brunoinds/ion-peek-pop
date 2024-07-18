# IonPeekPop


## Instalation


## How to use


```ts
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

```