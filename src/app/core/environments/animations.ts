// animations.ts
import { trigger, style, transition, animate, keyframes, state, AnimationFactory, AnimationBuilder } from '@angular/animations';
import { Renderer2 } from '@angular/core';

export const fadeIn = trigger('fadeIn', [
    transition(':enter', [
        style({ opacity: 0 }),
        animate('1000ms ease-in', style({ opacity: 1 })),
    ]),
]);

export const fadeInDownUp = trigger('fadeInDownUp', [
    transition(':enter', [
        style({ opacity: 0, transform:'translateY(-50%)' }),
        animate('600ms ease-in', style({ opacity: 1, transform: 'translateY(20%)' })),
        animate('1000ms ease-in', style({ opacity: 1, transform:'translateY(0)' })),
    ]),
]);

export const fadeInDown = trigger('fadeInDown', [
    transition(':enter', [
        style({ opacity: 0, transform:'translateY(-50%)' }),
        animate('1000ms ease-in', style({ opacity: 1, transform:'translateY(0)' })),
    ]),
]);

export const fadeInUp = trigger('fadeInUp', [
    transition(':enter', [
        style({ opacity: 0, transform:'translateY(50%)' }),
        animate('500ms ease-in', style({ opacity: 1, transform:'translateY(0)' })),
    ]),
]);

export const slideRight = trigger('slideRight', [
    transition(':enter', [
        style({ transform: 'translateX(-100%)'}),
        animate('900ms ease-out', style({ transform: 'translateX(0)' })),
    ]),
]);

export const slideLeft = trigger('slideLeft', [
    transition(':enter', [
        style({ transform: 'translateX(100%)'}),
        animate('900ms ease-out', style({ transform: 'translateX(0)' })),
    ]),
]);

export const backInDown = trigger('backInDown', [
    transition(':enter', [
        style({ transform: 'translateY(-100%) scale(0.2)',}),
        animate('1000ms ease-out', style({ transform: 'translateY(0) scale(1)' })),
    ]),
]);

export const zoomIn = trigger('zoomIn', [
    transition(':enter', [
        style({ transform: 'scale(0)',}),
        animate('800ms ease-out', style({ transform: 'scale(1)' })),
    ]),
]);

export const customAnimation = trigger('sakeBtn',[
    state('default',style({transform: 'translateX(0)'})),
    state('move1', style({transform: 'translateX(-100%)'})),
    transition('default => move1', [animate('0.5s ease-out')]),
    transition('move1 => default', [animate('0.5s ease-in')])
]);


export const animateBtn = (button:HTMLElement,_animationBuilder:AnimationBuilder,_renderer:Renderer2) => {
    // Build the shake animation
    const shakeAnimation: AnimationFactory = _animationBuilder.build([
        style({ backgroundImage: 'url("../../../assets/images/giphy1-ezgif.com-webp-to-gif-converter.gif")', backgroundSize: 'cover', backgroundPosition: 'center' }),
        animate('0.5s ease-in-out', style({ transform: 'translateX(0)' })),
        animate('0.2s', style({ transform: 'translateX(-20px) skew(10deg)' })),
        animate('0.2s', style({ transform: 'translateX(20px) skew(0deg)' })),
        animate('0.2s', style({ transform: 'translateX(-20px) skew(-10deg)' })),
        animate('0.2s', style({ transform: 'translateX(0) skew(0deg)' })),
    ]);

    // Create an animation player and play it on the button
    const player = shakeAnimation.create(button);
    player.play();

    // Optional: Reset the animation after it's done
    player.onDone(() => {
        _renderer.setStyle(button, 'transform', 'none');
    });
}