import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class FormFieldComponent {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() type: string = 'text';
  @Input() controlName = '';
  @Input() formGroup!: FormGroup;

}
