import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[rainBow]'
})
export class RainBowDirective {
  constructor() { }

  possibleColors = [
    'darksalmon', 'hotpink', 'lightskyblue', 'goldenrod', 'peachpuff',
    'mediumspringgreen', 'cornflowerblue', 'blanchedalmond', 'lightslategrey'
  ];

  @HostBinding('style.color') color: string;
  @HostBinding('style.border-color') borderColor: string;

  @HostListener('keydown', ['$event.target.value']) newColor(value:any) {
    console.log('value:' + value);
    const colorPick = Math.floor(Math.random() * this.possibleColors.length);
    this.color = this.borderColor = this.possibleColors[colorPick];
  }

}
