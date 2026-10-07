import { Location } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ConnectionModel } from '../../core/shared/models/connection.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.html',
  styleUrl: './chat.scss',
})
export default class Chat {
  private readonly location = inject(Location);
  readonly defaultPhotoUrl = 'https://geographyandyou.com/images/user-profile.png';
  readonly connection = signal(this.getConnectionFromNavigationState());

  private getConnectionFromNavigationState(): ConnectionModel | null {
    const state: unknown = this.location.getState();

    if (
      typeof state !== 'object' ||
      state === null ||
      !('connection' in state) ||
      !this.isConnectionModel(state.connection)
    ) {
      return null;
    }

    return state.connection;
  }

  private isConnectionModel(value: unknown): value is ConnectionModel {
    return (
      typeof value === 'object' &&
      value !== null &&
      '_id' in value &&
      typeof value._id === 'string' &&
      'firstName' in value &&
      typeof value.firstName === 'string' &&
      'lastName' in value &&
      typeof value.lastName === 'string' &&
      'age' in value &&
      typeof value.age === 'number' &&
      'gender' in value &&
      typeof value.gender === 'string' &&
      (!('photoUrl' in value) || typeof value.photoUrl === 'string') &&
      (!('about' in value) || typeof value.about === 'string')
    );
  }
}
