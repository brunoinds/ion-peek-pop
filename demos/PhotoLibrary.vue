<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Photos</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                <ion-title size="large">Photos</ion-title>
                </ion-toolbar>
            </ion-header>
            <br>
            <section class="photos">
                <article  v-for="photo in photosList" :key="photo">
                    <IonPeekPop>
                        <template v-slot:item>
                            <img :src="photo" class="image" />
                        </template>
                        <template v-slot:popover>
                        <ion-img :src="photo" />
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
                </article>
                
            </section>
        </ion-content>
</ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonHeader, IonImg, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import { IonPeekPop, IonPeekPopContextMenuItem } from 'ion-peek-pop';
import 'ion-peek-pop/styles.css';
import { albumsOutline, clipboardOutline, copyOutline, eyeOffOutline, imagesOutline, openOutline, shareOutline, trashOutline } from 'ionicons/icons';
import { ref } from 'vue';
const photosList = ref([
'https://conafer.org.br/wp-content/uploads/2022/10/566f045d0e2163522f00f274thinkstockphotos-479667835-1-scaled.webp',
'https://www.petz.com.br/blog/wp-content/uploads/2021/09/dia-mundial-dos-animais-topo.jpg',
'https://p2.trrsf.com/image/fget/cf/774/0/images.terra.com/2024/02/29/1213799964-leao-leoa.jpg',  
'https://www.portaldodog.com.br/wp-content/uploads/2024/02/animais-fofos-3.png',
'https://ciclovivo.com.br/wp-content/uploads/2015/009/img/noticias/7475598318_b2084ba4ba_z.jpg',
'https://certifiedhumanebrasil.org/wp-content/uploads/2017/01/CERTIFIED-HUMANE_Post-blog.png',
'https://p2.trrsf.com/image/fget/cf/774/0/images.terra.com/2023/10/26/1095416860-20144148136268.jpg',
'https://static.todamateria.com.br/upload/lo/bo/loboguara-cke.jpg?auto_optimize=low',
'https://images.pexels.com/photos/50577/hedgehog-animal-baby-cute-50577.jpeg?cs=srgb&dl=pexels-pixabay-50577.jpg&fm=jpg',
'https://factanimal.com/wp-content/uploads/2023/03/cute-red-panda.jpg',
'https://smv.org/media/images/2021.03.10_AnimalCuteness_Getty.width-1000.jpg',
'https://static.independent.co.uk/s3fs-public/thumbnails/image/2013/01/24/12/v2-cute-cat-picture.jpg',
'https://www.usatoday.com/gcdn/presto/2020/03/23/USAT/f0623acd-fafa-4177-8035-f32d213a30e2-AFP_1153955091.jpg?width=700&height=467&fit=crop&format=pjpg&auto=webp'
])
</script>

<style scoped lang="scss">
.photos{
//Gride 4 columns, infinite rows:
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr;
grid-auto-rows: 80px;
gap: 1rem;

>*{
    width: 80px;
    height: 80px;
}
}
.image{
width: 80px;
height: 80px;
object-fit: cover;
max-width: 80px;
max-height: 80px;
min-width: 80px;
min-height: 80px;
}
</style>