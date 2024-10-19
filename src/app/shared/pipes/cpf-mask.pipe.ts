import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  standalone: true,
  name: 'cpfMask'
})
export class CpfMaskPipe implements PipeTransform {

  transform(value: string | undefined): string {
    if (!value) return '';

    // Remove qualquer coisa que não seja número
    value = value.replace(/\D/g, '');

    // Aplica a máscara de CPF (XXX.XXX.XXX-XX)
    return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

}
