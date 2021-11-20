import { trigger, transition, style, animate } from "@angular/animations";

export class Animations {
    static enterAnimation = trigger(
        'enterAnimation', [
          transition(':enter', [
            style({transform: 'translateY(-100%)', opacity: 0}),
            animate('150ms', style({transform: 'translateX(0)', opacity: 1}))
          ]),
          transition(':leave', [
            style({ opacity: 1}),
            animate('150ms', style({ opacity: 0}))
          ])
        ]
      )
}