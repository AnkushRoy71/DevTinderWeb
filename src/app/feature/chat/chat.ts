import { Component, computed, effect, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { SocketService } from '../../core/services/socket/socket-service';
import type { ChatMessagePayload } from '../../core/shared/types/socket-events';
import { selectConnection } from '../../core/shared/state/connection/connection.selector';
import { selectUser } from '../../core/shared/state/user/user.selector';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.html',
  styleUrl: './chat.scss',
})
export default class Chat {
  private readonly route = inject(ActivatedRoute);
  private readonly store = inject(Store);
  private readonly socketService = inject(SocketService);
  private readonly connectionId = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('connectionId'))),
    { initialValue: this.route.snapshot.paramMap.get('connectionId') },
  );
  readonly currentUser = this.store.selectSignal(selectUser);
  private readonly connections = toSignal(this.store.select(selectConnection), {
    initialValue: null,
  });
  readonly defaultPhotoUrl = 'https://geographyandyou.com/images/user-profile.png';
  readonly draftMessage = signal('');
  readonly messages = signal<ChatMessagePayload[]>([]);
  readonly connection = computed(() => {
    const connectionId = this.connectionId();
    return connectionId
      ? (this.connections()?.find((connection) => connection._id === connectionId) ?? null)
      : null;
  });

  constructor() {
    this.socketService
      .receiveMessage()
      .pipe(takeUntilDestroyed())
      .subscribe((payload) => {
        const senderId = this.currentUser()?._id;
        const receiverId = this.connectionId();

        if (
          senderId &&
          receiverId &&
          ((payload.senderId === senderId && payload.receiverId === receiverId) ||
            (payload.senderId === receiverId && payload.receiverId === senderId))
        ) {
          this.messages.update((messages) => [...messages, payload]);
        }
      });

    effect(() => {
      const senderId = this.currentUser()?._id;
      const receiverId = this.connectionId();

      if (senderId && receiverId) {
        this.socketService.joinChat(senderId, receiverId);
      }
    });
  }

  sendMessage(event: Event): void {
    event.preventDefault();
    const message = this.draftMessage().trim();
    const senderId = this.currentUser()?._id;
    const receiverId = this.connectionId();

    if (!message || !senderId || !receiverId) {
      return;
    }

    this.socketService.sendMessage({ senderId, receiverId, message });
    this.draftMessage.set('');
  }

  updateDraftMessage(event: Event): void {
    if (event.target instanceof HTMLInputElement) {
      this.draftMessage.set(event.target.value);
    }
  }
}
