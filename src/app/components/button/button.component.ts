import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

const COLORS = {
  primary: '#4e9c35',
  secondary: '#e31937',
  neutral: '#282828'
};

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() text: string = '';
  @Input() style: 'primary' | 'secondary' | 'neutral' = 'neutral';
  @Output() btnClick = new EventEmitter();

  color = COLORS[this.style];
  
  constructor() { }
  
  ngOnInit(): void {
    this.color = COLORS[this.style];
  }

  handleClick(): void {
    this.btnClick.emit();
  }
}
