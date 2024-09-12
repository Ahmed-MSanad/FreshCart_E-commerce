import { AnimationBuilder } from '@angular/animations';
import { Component, inject, Renderer2 } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { animateBtn } from '../../core/environments/animations';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  private readonly _animationBuilder = inject(AnimationBuilder);
  private readonly _renderer = inject(Renderer2);

  shareApp(eventInfo:MouseEvent):void{
    // Get the button element
    const button = eventInfo.target as HTMLElement;

    animateBtn(button,this._animationBuilder,this._renderer);
  }

}
