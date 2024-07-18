<template>
    <button class="item" ref="itemEl" v-on-long-press.onMouseUp="onLongPressFinishCallbackDirective" v-on-long-press="[onLongPressStartCallbackDirective, { delay: 100, modifiers: { stop: true, prevent: true } }]">
        <article class="item-protector" ref="itemProtectorEl" @click="onPressCallback"></article>
        <article ref="itemContentEl" class="item-slot">
            <ion-button :id="uniqueId" v-show="false"></ion-button>
            <slot name="item"></slot>
        </article>
    </button>
    
    <article class="popover">
        <section class="popover-modal-holder" v-if="showModal">
            <ion-modal class="modal" v-if="showModal" :showBackdrop="false" ref="modalEl" :trigger="uniqueId" :enter-animation="enterAnimation" :leave-animation="leaveAnimation" :keepContentsMounted="false">
                <article class="item-mirror-area" ref="itemMirrorAreaEl">
                    <slot name="item"></slot>
                </article>
                <article class="popover-area" :is-open="isOpened">
                    <article class="popover-content" global-register="ion-peek-pop-popover-content" :isReadyForMoveMoviments="isReadyForMoveMoviments" ref="popoverContentEl" style="transform: translateX(-50%) translateY(-50%)">
                        <section class="popover-slot-container" ref="popoverSlotContainerEl">
                            <article class="popover-slot"  @click="doPop">
                                <slot name="popover"></slot>
                            </article>
                        </section>
                        <article class="popover-items" @click="closePeek(false)">
                            <slot name="contextmenu"></slot>
                        </article>
                    </article>
                </article>
            </ion-modal>
        </section>
        
    </article>
</template>

<script setup lang="ts">

import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { createAnimation, GestureDetail, IonModal } from '@ionic/vue';
import { vOnLongPress } from '@vueuse/components';
import { nextTick, onMounted, onUnmounted, ref } from 'vue';

const generateRandomId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

const uniqueId = ref(generateRandomId());
const modalEl = ref(null);
const itemEl = ref<HTMLElement>();
const popoverContentEl = ref<HTMLElement>();
const itemContentEl = ref<HTMLElement>();
const itemMirrorAreaEl = ref<HTMLElement>();
const isReadyForMoveMoviments = ref(false);
const hasLongPress = ref(false);
const popoverSlotContainerEl = ref<HTMLElement>();
const itemProtectorEl = ref<HTMLElement>();
const showModal = ref(false);
let watchableBackdrop:any = null;
const isOpened = ref(false);

const emit = defineEmits(['onPeek', 'onPop', 'onDismiss']);

const waitForNextTick = async () => {
    await nextTick();
}
const onPressCallback = (ev) => {
    if (hasLongPress.value) {
        ev.stopPropagation();
        ev.preventDefault();
        hasLongPress.value = false;
        itemProtectorEl.value.style.zIndex = '-1';
        return;
    }
}
const onLongPressDone = () => {
    hasLongPress.value = true;
    doPeek();
    setTimeout(() => {
        itemProtectorEl.value.style.zIndex = '-1';
        hasLongPress.value = false;
    }, 100)
}
const onLongPressStartCallbackDirective = (ev) => {
    ev.stopPropagation();
    
    setTimeout(() => {
        onLongPressDone();
    }, 490)
}
const onLongPressFinishCallbackDirective = (ev) => {
    onShortPressCallbackDirective(ev);
    if (ev.duration > 500 && ev.duration < 700){
        onLongPressDone();
    }
}
const onShortPressCallbackDirective = (ev) => {
    if (!itemContentEl.value){
        return;
    }

    requestAnimationFrame(() => {
        itemContentEl.value.style.transition = 'all 2s ease';
        requestAnimationFrame(() => {
            if (!itemContentEl.value){
                return;
            }
            itemContentEl.value.style.scale = '2';

            setTimeout(() => {
                if (!itemContentEl.value){
                    return;
                }
                itemContentEl.value.style.scale = '1';
                requestAnimationFrame(() => {
                    if (!itemContentEl.value){
                        return;
                    }
                    itemContentEl.value.style.transition = 'unset';
                })
            }, 300)
        })
    })
}


const doPeek = async () => {
    showModal.value = true;

    await waitForNextTick();

    document.getElementById(uniqueId.value).click();
    Haptics.impact({
        style: ImpactStyle.Heavy
    });


    setTimeout(() => {
        if (!popoverContentEl.value || !itemContentEl.value || !itemMirrorAreaEl.value){
            return;
        }


        //Add a callable method into popoverContentEl:
        popoverContentEl.value.doClosePeek = closePeek;

        const popoverContentRect = popoverContentEl.value?.getBoundingClientRect();
        const itemContentRect = itemContentEl.value?.getBoundingClientRect();

        itemMirrorAreaEl.value.style.position = 'fixed';
        itemMirrorAreaEl.value.style.top = `${itemContentRect.top}px`;
        itemMirrorAreaEl.value.style.left = `${itemContentRect.left}px`;
        itemMirrorAreaEl.value.style.width = `${itemContentRect.width}px`;
        itemMirrorAreaEl.value.style.height = `${itemContentRect.height}px`;
        itemMirrorAreaEl.value.style.zIndex = '1000';
        itemMirrorAreaEl.value.style.opacity = '1';


        popoverContentEl.value.style.position = 'fixed';
        popoverContentEl.value.style.top = `${itemContentRect.top}px`;
        popoverContentEl.value.style.left = `${itemContentRect.left}px`;
        popoverContentEl.value.style.width = `${itemContentRect.width}px`;
        popoverContentEl.value.style.height = `${itemContentRect.height}px`;
        popoverContentEl.value.style.zIndex = '1000';
        popoverContentEl.value.style.transform = 'unset';
        popoverContentEl.value.style.opacity = '0';



        //Animate to make the itemMirrorAreaEl to the popoverContentEl:
        requestAnimationFrame(() => {
            if (!popoverContentEl.value || !itemMirrorAreaEl.value){
                return;
            }

            itemMirrorAreaEl.value.style.visibility = 'visible';
            itemMirrorAreaEl.value.style.transition = 'all 0.3s ease';
            itemMirrorAreaEl.value.style.top = `${popoverContentRect.top}px`;
            itemMirrorAreaEl.value.style.left = `${popoverContentRect.left}px`;
            itemMirrorAreaEl.value.style.width = `${popoverContentRect.width}px`;
            itemMirrorAreaEl.value.style.height = `${popoverContentRect.height}px`;
            itemMirrorAreaEl.value.style.zIndex = '1000';
            itemMirrorAreaEl.value.style.opacity = '0';
        })

        //Animate to make popoverContentEl to have same size as itemMirrorAreaEl and then morph to the final size of the popoverContentEl:
        requestAnimationFrame(() => {
            if (!popoverContentEl.value || !itemMirrorAreaEl.value){
                return;
            }
            popoverContentEl.value.style.visibility = 'visible';
            popoverContentEl.value.style.transition = 'all 0.3s ease';
            popoverContentEl.value.style.top = `${popoverContentRect.top}px`;
            popoverContentEl.value.style.left = `${popoverContentRect.left}px`;
            popoverContentEl.value.style.width = `${popoverContentRect.width}px`;
            popoverContentEl.value.style.height = `${popoverContentRect.height}px`;
            popoverContentEl.value.style.transform = 'unset';
            popoverContentEl.value.style.zIndex = '1000';
            popoverContentEl.value.style.opacity = '1';

            emit('onPeek');
            setTimeout(() => {
                requestAnimationFrame(() => {
                    if (!popoverContentEl.value || !itemMirrorAreaEl.value){
                        return;
                    }
                    popoverContentEl.value.style.transition = 'unset';
                    popoverContentEl.value.style.position = 'absolute';
                    popoverContentEl.value.style.top = '50%';
                    popoverContentEl.value.style.left = '50%';
                    popoverContentEl.value.style.transform = 'translateX(-50%) translateY(-50%)';
                    isReadyForMoveMoviments.value = true;
                })
            }, 300)
            setTimeout(() => {
                isOpened.value = true;
            }, 100)
        })

        itemContentEl.value?.getBoundingClientRect()//Do not remove this line!
    }, 100)

}
const closePeek = async (isDismiss: boolean) => {
    isReadyForMoveMoviments.value = false;
    hasLongPress.value = false;
    setTimeout(() => {
        if (!popoverContentEl.value || !itemContentEl.value || !itemMirrorAreaEl.value){
            return;
        }
        isOpened.value = false;

        Haptics.impact({
            style: ImpactStyle.Light
        });


        const doDismiss = () => {
            const popoverContentRect = popoverContentEl.value?.getBoundingClientRect();
            const itemContentRect = itemContentEl.value?.getBoundingClientRect();

            itemMirrorAreaEl.value.style.position = 'fixed';
            itemMirrorAreaEl.value.style.top = `${popoverContentRect.top}px`;
            itemMirrorAreaEl.value.style.left = `${popoverContentRect.left}px`;
            itemMirrorAreaEl.value.style.width = `${popoverContentRect.width}px`;
            itemMirrorAreaEl.value.style.height = `${popoverContentRect.height}px`;
            itemMirrorAreaEl.value.style.zIndex = '1000';
            itemMirrorAreaEl.value.style.opacity = '0';



            //Animate to make the itemMirrorAreaEl to the popoverContentEl:
            requestAnimationFrame(() => {
                if (!popoverContentEl.value || !itemMirrorAreaEl.value){
                    return;
                }

                itemMirrorAreaEl.value.style.visibility = 'visible';
                itemMirrorAreaEl.value.style.transition = 'all 0.3s ease';
                itemMirrorAreaEl.value.style.top = `${itemContentRect.top}px`;
                itemMirrorAreaEl.value.style.left = `${itemContentRect.left}px`;
                itemMirrorAreaEl.value.style.width = `${itemContentRect.width}px`;
                itemMirrorAreaEl.value.style.height = `${itemContentRect.height}px`;
                itemMirrorAreaEl.value.style.zIndex = '1000';
                itemMirrorAreaEl.value.style.opacity = '1';

                popoverContentEl.value.style.visibility = 'visible';
                popoverContentEl.value.style.transition = 'all 0.3s ease';
                popoverContentEl.value.style.top = `${itemContentRect.top}px`;
                popoverContentEl.value.style.left = `${itemContentRect.left}px`;
                popoverContentEl.value.style.width = `${itemContentRect.width}px`;
                popoverContentEl.value.style.height = `${itemContentRect.height}px`;
                popoverContentEl.value.style.transform = 'unset';
                popoverContentEl.value.style.zIndex = '1000';
                popoverContentEl.value.style.opacity = '0';
                setTimeout(() => {
                    modalEl.value.$el.dismiss();
                    setTimeout(async () => {
                        await waitForNextTick();
                        showModal.value = false;
                    }, 300)
                }, 300)
            })
        }
        const doPop = () => {
            requestAnimationFrame(() => {
                if (!popoverSlotContainerEl.value){
                    return;
                }

                popoverSlotContainerEl.value.style.transition = 'all 0.2s ease';
                popoverSlotContainerEl.value.style.scale = '2';
                popoverSlotContainerEl.value.style.zIndex = '1000';
                popoverSlotContainerEl.value.style.opacity = '0';
                setTimeout(() => {
                    modalEl.value.$el.dismiss();
                    setTimeout(async () => {
                        await waitForNextTick();
                        showModal.value = false;
                    }, 300)
                }, 300)
            })



            setTimeout(() => {
                modalEl.value.$el.dismiss();
                setTimeout(async () => {
                    await waitForNextTick();
                    showModal.value = false;
                }, 300)
            }, 300)
        }


        if (isDismiss){
            doDismiss()
        }else{
            doPop();
        }

        
    }, 100);
    if (isDismiss){
        emit('onDismiss');
    }
}
const doPop = async () => {
    emit('onPop');
    closePeek(false);
}

const gestureCallbacks = {
    onStart: () => {
    },
    onMove: (detail: GestureDetail) => {
        const popoverContentEl = ref(document.querySelector(`[global-register="ion-peek-pop-popover-content"]`));
        const isReadyForMoveMoviments = ref(popoverContentEl.value?.getAttribute('isReadyForMoveMoviments') === 'true');

        if (!popoverContentEl.value || !isReadyForMoveMoviments.value){
            return;
        }

        const calculateMovementChangePercentageX = () => {
            if (detail.deltaX > 0){
                return (detail.currentX * 100) / window.innerWidth;
            }else{
                return -(100 - ((detail.currentX * 100) / detail.startX));
            }
        }
        const calculateTranslationX = (currentMovementChangePercentageX:number) => {
            const windowPadding = (window.innerWidth - popoverContentEl.value?.getBoundingClientRect().width) / 2;
            if (currentMovementChangePercentageX > 0){
                return (currentMovementChangePercentageX * windowPadding) / 100;
            }else{
                return -((currentMovementChangePercentageX * -1) * windowPadding) / 100;
            }
        }

        const calculateMovementChangePercentageY = () => {
            if (detail.deltaY > 0){
                return (detail.deltaY * 100) / window.innerHeight;
            }else{
                return -(100 - ((detail.currentY * 100) / detail.startY));
            }
        }

        const calculateTranslationY = (currentMovementChangePercentageY:number) => {
            const windowPadding = (window.innerHeight - popoverContentEl.value.getBoundingClientRect().height) / 2;
            if (currentMovementChangePercentageY > 0){
                return (currentMovementChangePercentageY * windowPadding) / 100;
            }else{
                return -((currentMovementChangePercentageY * -1) * windowPadding) / 100;
            }
        }


        const getTranslateX = (element:HTMLElement) => {
            const regex = /translateX\(([^)]+)\)/;
            const style = element.style.transform;
            const match = regex.exec(style);
            return match[1];
        }
        const getTranslateY = (element:HTMLElement) => {
            const regex = /translateY\(([^)]+)\)/;
            const style = element.style.transform;
            const match = regex.exec(style);
            return match[1];
        }



        const currentMovementChangePercentageX = calculateMovementChangePercentageX();
        const currentMovementChangePercentageY = calculateMovementChangePercentageY();
        const currentTranslationX = calculateTranslationX(currentMovementChangePercentageX);
        const currentTranslationY = calculateTranslationY(currentMovementChangePercentageY);

        //Now with currentTranslationX px, the context is the element is top: 50%, left: 50% and current transform: translateX(-50%) translateY(-50%). So, calculate how much translateX should be added to the element in percentage:
        const currentTranslateXPercentage = (currentTranslationX * 100) / popoverContentEl.value?.getBoundingClientRect().width;
        const currentTranslateYPercentage = (currentTranslationY * 100) / popoverContentEl.value?.getBoundingClientRect().height;

        //Get the current translateX value and translateY, save them and add the currentTranslationX value to the translateX value:

        const currentTransform = {
            translateX: getTranslateX(popoverContentEl.value),
            translateY: getTranslateY(popoverContentEl.value)
        }

        let desiredTransform = {
            translateX: currentTransform.translateX,
            translateY: currentTransform.translateY
        }

        if (currentTranslateXPercentage > 0){
            desiredTransform.translateX = ((-50) + currentTranslateXPercentage).toFixed(2).toString();
        }else{
            desiredTransform.translateX = ((-50) + currentTranslateXPercentage).toFixed(2).toString();
        }

        if (currentTranslateYPercentage > 0){
            desiredTransform.translateY = ((-50) + currentTranslateYPercentage).toFixed(2).toString();
        }else{
            desiredTransform.translateY = ((-50) + currentTranslateYPercentage).toFixed(2).toString();
        }

        const newTag = `translateX(${desiredTransform.translateX}%) translateY(${desiredTransform.translateY}%)`;



        


        requestAnimationFrame(() => {
            if (!popoverContentEl.value || !popoverSlotContainerEl.value){
                return;
            }
            popoverContentEl.value.style.transform = newTag;
            if (currentMovementChangePercentageY > 20){
                popoverSlotContainerEl.value.style.transform = `scale(${scaleConvert(currentMovementChangePercentageY, [20, 100], [1, 0.2])})`;
            }
        })


        if (currentMovementChangePercentageX > 80 || currentMovementChangePercentageX < -80){
            popoverContentEl.value.doClosePeek(true);
        }else if (currentMovementChangePercentageY > 45 || currentMovementChangePercentageY < -30){
            popoverContentEl.value.doClosePeek(true);
        }

    
    },
    onEnd: () => {
        const popoverContentEl = ref(document.querySelector(`[global-register="ion-peek-pop-popover-content"]`));
        const isReadyForMoveMoviments = ref(popoverContentEl.value?.getAttribute('isReadyForMoveMoviments') === 'true');

        if (!isReadyForMoveMoviments.value || !popoverContentEl.value){
            return;
        }

        const newTag = `translateX(-50%) translateY(-50%)`;
        requestAnimationFrame(() => {
            if (!popoverContentEl.value || !popoverSlotContainerEl.value){
                return;
            }
            popoverContentEl.value.style.transition = 'all 0.3s ease';
            popoverContentEl.value.style.transform = newTag;
            popoverSlotContainerEl.value.style.transform = `scale(1)`;

            setTimeout(() => {
                popoverContentEl.value.style.transition = 'unset';
            }, 300)
        })
    }
}
onMounted(() => {
    watchableBackdrop = useWatchTouch(
        itemEl.value?.closest('ion-app'),
        (info) => {
            gestureCallbacks.onStart();
        },
        (info) => {
            const detail: GestureDetail = {
                startX: info.startX,
                startY: info.startY,
                currentX: info.position.left,
                currentY: info.position.top,
                deltaX: info.offset.x,
                deltaY: info.offset.y,
                velocityX: info.velocityX,
                velocityY: info.velocityY,
                currentTime: 0,
                event: {} as any,
                data: {}
            };
            gestureCallbacks.onMove(detail);
        },
        (info) => {
            gestureCallbacks.onEnd();
        }
    );
})
onUnmounted(() => {
    watchableBackdrop();
})


const enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot as unknown as any;

    const backdropAnimation = createAnimation()
        .addElement(root.querySelector('ion-backdrop'))
        .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

    const wrapperAnimation = createAnimation()
        .addElement(root.querySelector('.modal-wrapper'))
        .keyframes([
            { offset: 0, opacity: '0', transform: 'scale(1)' },
            { offset: 1, opacity: '0.99', transform: 'scale(1)' },
        ]);

    return createAnimation()
        .addElement(baseEl)
        .easing('ease-out')
        .duration(300)
        .addAnimation([backdropAnimation, wrapperAnimation]);
};
const leaveAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot as unknown as any;

    const backdropAnimation = createAnimation()
        .addElement(root.querySelector('ion-backdrop'))
        .fromTo('opacity', 'var(--backdrop-opacity)', '0');

    const wrapperAnimation = createAnimation()
        .addElement(root.querySelector('.modal-wrapper'))
        .keyframes([
            { offset: 0, opacity: '0.99', transform: 'scale(1)' },
            { offset: 1, opacity: '0', transform: 'scale(1)' },
        ]);

    return createAnimation()
        .addElement(baseEl)
        .easing('ease-in')
        .duration(300)
        .addAnimation([backdropAnimation, wrapperAnimation]);
};


interface TouchInfo {
    touch: boolean;
    mouse: boolean;
    position: { top: number; left: number };
    direction: 'up' | 'down' | 'left' | 'right' | null;
    isFirst: boolean;
    isFinal: boolean;
    duration: number;
    startX: number;
    startY: number;
    distance: { x: number; y: number };
    offset: { x: number; y: number };
    delta: { x: number; y: number };
}
  
 function useWatchTouch(
    el: HTMLElement,
    onStart: (info: TouchInfo) => void,
    onMove: (info: TouchInfo) => void,
    onEnd: (info: TouchInfo) => void
  ) {
    let startX: number, startY: number, lastX: number, lastY: number, startTime: number, lastMoveTime: number;
  let isTouch: boolean;

  function getDirection(x: number, y: number): TouchInfo['direction'] {
    const diffX = x - startX;
    const diffY = y - startY;
    const absDiffX = Math.abs(diffX);
    const absDiffY = Math.abs(diffY);

    if (absDiffX > absDiffY) {
      return diffX > 0 ? 'right' : 'left';
    } else if (absDiffY > absDiffX) {
      return diffY > 0 ? 'down' : 'up';
    }
    return null;
  }

  function createTouchInfo(
    event: MouseEvent | Touch,
    isFirst: boolean,
    isFinal: boolean
  ): TouchInfo {
    const currentTime = Date.now();
    const duration = currentTime - startTime;
    const currentX = 'clientX' in event ? event.clientX : event.pageX;
    const currentY = 'clientY' in event ? event.clientY : event.pageY;

    const timeDelta = currentTime - lastMoveTime;
    const velocityX = timeDelta > 0 ? (currentX - lastX) / timeDelta : 0;
    const velocityY = timeDelta > 0 ? (currentY - lastY) / timeDelta : 0;

    const info: TouchInfo = {
      touch: isTouch,
      mouse: !isTouch,
      position: { top: currentY, left: currentX },
      direction: getDirection(currentX, currentY),
      isFirst,
      isFinal,
      duration,
      distance: { x: currentX - startX, y: currentY - startY },
      offset: { x: currentX - startX, y: currentY - startY },
      delta: { x: currentX - lastX, y: currentY - lastY },
      startX,
      startY,
      velocityX,
      velocityY
    };

    lastX = currentX;
    lastY = currentY;
    lastMoveTime = currentTime;

    return info;
  }

  function handleStart(event: MouseEvent | TouchEvent) {
    isTouch = event.type.startsWith('touch');
    const touchEvent = isTouch ? (event as TouchEvent).touches[0] : (event as MouseEvent);
    startX = lastX = touchEvent.clientX;
    startY = lastY = touchEvent.clientY;
    startTime = lastMoveTime = Date.now();

    const info = createTouchInfo(touchEvent, true, false);
    onStart(info);

    if (isTouch) {
      document.addEventListener('touchmove', handleMove);
      document.addEventListener('touchend', handleEnd);
    } else {
      document.addEventListener('mousemove', handleMove);
      document.addEventListener('mouseup', handleEnd);
    }
  }

  function handleMove(event: MouseEvent | TouchEvent) {
    event.preventDefault();
    const touchEvent = isTouch ? (event as TouchEvent).touches[0] : (event as MouseEvent);
    const info = createTouchInfo(touchEvent, false, false);
    onMove(info);
  }

  function handleEnd(event: MouseEvent | TouchEvent) {
    const touchEvent = isTouch ? (event as TouchEvent).changedTouches[0] : (event as MouseEvent);
    const info = createTouchInfo(touchEvent, false, true);
    onEnd(info);

    if (isTouch) {
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('touchend', handleEnd);
    } else {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleEnd);
    }
  }

  el.addEventListener('mousedown', handleStart);
  el.addEventListener('touchstart', handleStart);

  return () => {
    el.removeEventListener('mousedown', handleStart);
    el.removeEventListener('touchstart', handleStart);
  };
}


function scaleConvert(
    value: number,
    originalScale: [number, number],
    newScale: [number, number]
  ): number {
    const [originalMin, originalMax] = originalScale;
    const [newMin, newMax] = newScale;
  
    // First, normalize the value on a 0-1 scale
    const normalized = (value - originalMin) / (originalMax - originalMin);
    
    // Then, scale it to the new range
    const newValue = normalized * (newMax - newMin) + newMin;
    
    return newValue;
  }
</script>


<style scoped lang="scss">
ion-backdrop{
    opacity: 0.9;
    background: var(--ion-color-primary);
}

ion-modal{
    --width: 100%;
    --height: 100%;
    --border-radius: 0px;
    --box-shadow: 0 28px 48px rgba(0, 0, 0, 0.4);
    --background: transparent;
    backdrop-filter: blur(1.5px);
    -webkit-backdrop-filter: blur(1.5px);
}


.item{
    background: transparent;
    &:has(.item-slot > ion-item){
        width: 100%;
    }
}

.popover-area{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;


    &[is-open="true"]{
        .popover-items{
            scale: 100%
        }
    }
    &[is-open="false"]{
        .popover-items{
            scale: 0%
        }
    }
}
.popover-content{
    position: absolute;
    top: 50%;
    left: 50%;
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    row-gap: 10px;

    > .popover-slot-container{
        border-radius: 12px;
        overflow: hidden;
        background-color: transparent;
        box-shadow: 0 28px 48px rgba(0, 0, 0, 0.4);
        border-radius: 0.55px solid gainsboro;
        width: 100%;
    }
}
.popover-items{
    z-index: 10000;
    background: #fffffff0;
    box-shadow: 0 8px 32px 0 rgb(73 73 73 / 37%);
    backdrop-filter: blur( 6px );
    -webkit-backdrop-filter: blur( 6px );
    border-radius: 10px;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border-radius: 14px;
    overflow: hidden;
    max-width: 80%;
    transition: scale 0.3s ease;
    transform-origin: top center;
    :slotted(button){
        border-bottom-width: 0.55px;
        border-style: solid;
        border-color: var(--ion-tab-bar-border-color, var(--ion-border-color, var(--ion-color-step-150, rgba(0, 0, 0, 0.2))));


        &[separate="true"]:not(:last-child){
            border-bottom-width: 4px;
        }
        &[separate="true"]:last-child{
            border-top-width: 4px;
        }
        &:nth-last-child(1){
            border-bottom: unset;
        }

        &:active{
            background: var(--ion-color-light);
        }
    }
}

.item{
    position: relative;

    > .item-protector{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: transparent;
        z-index: 1;

    }
}

.item-mirror-area{
    visibility: hidden;
}
.popover-content{
    visibility: hidden;
}

@media (prefers-color-scheme: dark) {
    .popover-items{
        background: rgba( 36, 36, 36, 0.7 );
        box-shadow: 0 8px 32px 0 rgb(73 73 73 / 37%);
        backdrop-filter: blur( 6px );
        -webkit-backdrop-filter: blur( 6px );
        border-radius: 10px;
    }
}

</style>