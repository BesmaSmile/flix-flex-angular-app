import { NgClass, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './button.component.html',
  imports: [NgClass, NgIf],
})
export class ButtonComponent {
  @Input() label!: string;
  @Input() type: 'button' | 'submit' = 'button';
  @Input() disabled = false;
  @Input() submitting = false;
  @Input() variant: 'primary' | 'secondary' | 'tertiary' = 'primary';
  @Input() fullWidth = false;
  @Input() class = '';
}
