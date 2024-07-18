# IonPeekPop

Bring iOS Peek-Pop (3D touch) to your Ionic/Vue apps!

Provides Haptic feedback, touch recognition, pixel matching animation.

Add image:
[![PeekPop](https://img.youtube.com/vi/1Q2J3q1Z1j0/0.jpg)](https://www.youtube.com/watch?v=1Q2J3q1Z1j0)

## Instalation


## How to use


## Basic Component Structure
```vue
<IonPeekPop @onPop="">
    <template v-slot:item>
        <!--The peekable item or button goes here-->
    </template>
    <template v-slot:popover>
        <!--Here goes what will be shown when peeked-->
    </template>
    <template v-slot:contextmenu>
        <!--Here goes the context menu items-->
    </template>
</IonPeekPop>
```

## Examples (Demos)
You can access the demos files in the `./demos` folder

### Photo Library
```vue
<template>
    <IonPeekPop>
        <template v-slot:item>
            <img :src="path/to/photo"/>
        </template>
        <template v-slot:popover>
            <img :src="path/to/photo" />
        </template>
        <template v-slot:contextmenu>
            <ion-peek-pop-context-menu-item :icon="clipboardOutline" label="Copy"/>
            <ion-peek-pop-context-menu-item :icon="shareOutline" label="Share"/>
            <ion-peek-pop-context-menu-item :icon="openOutline" label="Favorite"/>
            <ion-peek-pop-context-menu-item :icon="copyOutline" label="Duplicate"/>
            <ion-peek-pop-context-menu-item :icon="eyeOffOutline" label="Hide"/>
            <ion-peek-pop-context-menu-item :icon="imagesOutline" label="Show in All Photos"/>
            <ion-peek-pop-context-menu-item :icon="albumsOutline" label="Add to Album"/>
            <ion-peek-pop-context-menu-item :icon="trashOutline" :separate="true" color="danger" :label="'Delete'" />
        </template>
    </IonPeekPop>
</template>
<script setup lang="ts">
import { albumsOutline, clipboardOutline, copyOutline, eyeOffOutline, imagesOutline, openOutline, shareOutline, trashOutline } from 'ionicons/icons';

import { IonPeekPop, IonPeekPopContextMenuItem } from 'ion-peek-pop';
import 'ion-peek-pop/styles.css';
</script>
```

### Ion-Item in Ion-List
```vue
<template>
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
            <section>
                <img :src="user.avatar" />
                <h2>{{ user.name }}</h2>
                <p>{{ user.email }}</p>
                <p>{{ user.phone }}</p>
            </section>
            </template>
            <template v-slot:contextmenu>
                <ion-peek-pop-context-menu-item :icon="openOutline" @click="openUser()" label="See user"/>
                <ion-peek-pop-context-menu-item :icon="chatbubbleEllipsesOutline" label="Chat" />
                <ion-peek-pop-context-menu-item :icon="callOutline" label="Call" />
                <ion-peek-pop-context-menu-item :icon="removeCircleOutline" :separate="true" color="danger" :label="'Remove from list'" />
            </template>
        </IonPeekPop>
    </ion-list>
</template>
<script setup lang="ts">
import { albumsOutline, clipboardOutline, copyOutline, eyeOffOutline, imagesOutline, openOutline, shareOutline, trashOutline } from 'ionicons/icons';

import { IonPeekPop, IonPeekPopContextMenuItem } from 'ion-peek-pop';
import 'ion-peek-pop/styles.css';
</script>
```
