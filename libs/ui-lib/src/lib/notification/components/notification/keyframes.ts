/** CSS-animations from https://animate.style ported to Angular-animations, provided by AngularFireBase
 * url: https://github.com/AngularFirebase/78-hammerjs-angular-animations/blob/master/src/app/hammer-card/keyframes.ts
 */

import { style } from '@angular/animations';

export const slideOutLeft = [
    style({transform: 'translate3d(0, 0, 0)', offset: 0}),
    style({transform: 'translate3d(-150%, 0, 0)', opacity: 0, offset: 1})
];

export const slideOutRight = [
    style({transform: 'translate3d(0, 0, 0)', offset: 0}),
    style({transform: 'translate3d(150%, 0, 0)', opacity: 0, offset: 1})
];