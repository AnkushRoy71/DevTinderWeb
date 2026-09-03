import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { RippleModule } from 'primeng/ripple';
import { selectUser } from '../../state/user/user.selector';
import { AsyncPipe } from '@angular/common';

@Component({
  imports: [AvatarModule, BadgeModule, MenubarModule, InputTextModule, RippleModule, AsyncPipe],
  selector: 'app-header',
  styleUrl: './header.scss',
  templateUrl: './header.html',
  standalone: true
})
export class Header implements OnInit {
  items: MenuItem[] | undefined;
  storeService = inject(Store);
  user$ = this.storeService.select(selectUser);

  ngOnInit(): void {

  }

}
