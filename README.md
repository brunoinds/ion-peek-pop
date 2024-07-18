<p align="center"><br><img src="https://user-images.githubusercontent.com/236501/85893648-1c92e880-b7a8-11ea-926d-95355b8175c7.png" width="128" height="128" /></p>
<h3 align="center">Ionic Peek Pop</h3>
<p align="center"><strong><code>brunoinds/ion-peek-pop</code></strong></p>
<p align="center">
  Immersive 3D touch experience for Ionic/Vue applications.
</p>

<p align="center">
  <img src="https://img.shields.io/maintenance/yes/2024?style=flat-square" />
  <a href="https://www.npmjs.com/package/ion-peek-pop"><img src="https://img.shields.io/npm/l/ion-peek-pop?style=flat-square" /></a>
  <br>
  <a href="https://www.npmjs.com/package/ion-peek-pop"><img src="https://img.shields.io/npm/dw/ion-peek-pop?style=flat-square" /></a>
  <a href="https://www.npmjs.com/package/ion-peek-pop"><img src="https://img.shields.io/npm/v/ion-peek-pop?style=flat-square" /></a>
  <!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
  <a href="#contributors-"><img src="https://img.shields.io/badge/all%20contributors-1-orange?style=flat-square" /></a>
  <!-- ALL-CONTRIBUTORS-BADGE:END -->
</p>

<p align="center">
    <img height="290" src="https://github.com/brunoinds/ion-peek-pop/blob/main/demos/photo-library-short.gif"/>
    <img height="290" src="https://github.com/brunoinds/ion-peek-pop/blob/main/demos/photo-library-short.gif"/>
    <img height="290" src="https://github.com/brunoinds/ion-peek-pop/blob/main/demos/photo-library-short.gif"/>
</p>

### Features
- **3D Touch Experience**: Utilizes advanced touch recognition to provide a tactile interaction, simulating a three-dimensional interaction within a two-dimensional interface.
- **Haptic Feedback**: Offers immediate tactile feedback to users, enhancing the overall experience and engagement.
- **Pixel Matching Animation**: Ensures a fluid and responsive animation that matches the touch intensity, providing a seamless transition between states.

## Table of Contents

- [Instalation](#instalation)
- [Usage](#usage)
- [Documentation](#documentation)
- [Demos](#demos)


## Instalation
```bash
npm install ion-peek-pop
```


## Usage
### Basic Example
```vue
<template>
    <IonPeekPop @onPop="">
        <template v-slot:item>
            <IonButton>Peek me (press and hold)</IonButton>
        </template>
        <template v-slot:popover>
            <div>Hello World from the Peek Window</div>
        </template>
        <template v-slot:contextmenu>
            <!--Optional contextmenu items-->
        </template>
    </IonPeekPop>
</template>

<script setup lang="ts">
import { IonPeekPop, IonPeekPopContextMenuItem } from 'ion-peek-pop';
import 'ion-peek-pop/styles.css';
</script>
```


You can access the demos files in the `./demos` folder


# Documentation
The `IonPeekPop` component is a sophisticated addition to Ionic/Vue applications, offering an immersive 3D touch experience 📱. This component is designed to enhance user interaction through haptic feedback, precise touch recognition, and smooth pixel-matching animations, bringing a new level of depth to the application's interface.

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

## How to Import
```vue
<script setup lang="ts">
import { IonPeekPop, IonPeekPopContextMenuItem } from 'ion-peek-pop';
import 'ion-peek-pop/styles.css';
</script>
```

## Components

## IonPeekPop
### `Slots`

| Prop          | Type     | Description                                      | Default |
|---------------|----------|--------------------------------------------------|---------|
| `item`        | Slot     | Slot for the peekable item or button.            | N/A     |
| `popover`     | Slot     | Slot for the content shown when peeked.          | N/A     |
| `contextmenu` | Slot     | Slot for the context menu items.                 | N/A     |

### `Events`

| Prop        | Type     | Description                                      | Default |
|-------------|----------|--------------------------------------------------|---------|
| `onPop`     | Event    | Triggered when the user pops the item.           | N/A     |
| `onPeek`    | Event | Triggered when the user initiates a peek.           | N/A     |
| `onDismiss` | Event | Triggered when the peek view is dismissed.          | N/A     |


## IonPeekPopContextMenuItem
### `Properties`

| Prop       | Type    | Description                                      | Default |
|------------|---------|--------------------------------------------------|---------|
| `icon`     | Prop    | Icon for the menu item.                          | N/A     |
| `label`    | Prop    | Text label for the menu item.                    | N/A     |
| `separate` | Boolean | Adds separation from other items.                | `false` |
| `color`    | String  | Custom color for the item, enhancing emphasis.   | N/A     |


## Styling
The component's appearance and theming are managed through a dedicated `styles.css` file, ensuring consistency and ease of customization.

## Examples

### Photo Library Example
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
https://github.com/user-attachments/assets/e097ca51-7118-4775-9147-441e3c683f43


### Ion-Item in Ion-List Example
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
