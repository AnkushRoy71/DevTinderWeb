import { Component, inject, signal } from '@angular/core';
import { form, FormField, max, maxLength, min, pattern, required } from '@angular/forms/signals';
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { LabelModule } from 'primeng/label';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { addUser } from '../../core/shared/state/user/user.actions';
import { selectUser } from '../../core/shared/state/user/user.selector';
import { FeedModel } from '../../core/shared/models/feed.model';
import { FeedCard } from "../home/feed/feed-card/feed-card";
import { ProfileService } from '../../core/services/httpServices/profile';
import { ApiResponseModel } from '../../core/shared/models/apiReponse.model';
import { UserModel } from '../../core/shared/models/user.model';

export interface ProfileFormModel extends FeedModel {
}

@Component({
  imports: [
    ButtonModule,
    CardModule,
    FormField,
    InputNumberModule,
    InputTextModule,
    LabelModule,
    SelectModule,
    TextareaModule,
    FeedCard
],
  selector: 'app-profile',
  styleUrl: './profile.scss',
  templateUrl: './profile.html',
})
export default class Profile {
  private readonly store = inject(Store);
  private readonly currentUser = this.store.selectSignal(selectUser);
  private readonly profileService = inject(ProfileService)

  readonly submitted = signal(false);
  readonly genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
  ];

  readonly profileModel = signal<ProfileFormModel>(this.getInitialProfile());

  readonly profileForm = form(this.profileModel, (schema) => {
    required(schema.firstName);
    required(schema.lastName);
    required(schema.age);
    min(schema.age, 18);
    max(schema.age, 100);
    required(schema.gender);
    pattern(schema.photoUrl, /^$|^https?:\/\/\S+$/);
    maxLength(schema.about, 500);
  });

  onSubmit(event: Event): void {
    event.preventDefault();
    console.log('Form submitted:', this.profileModel());
    this.submitted.set(true);

    if (this.profileForm().valid()) {
      this.saveProfile(this.profileModel());
    }
  }

  private saveProfile(profile: ProfileFormModel): void {
    const user = this.currentUser();
    this.profileService.updateUserDetails(profile).subscribe({
      next: (response: ApiResponseModel<UserModel>) => {
        console.log('Profile updated successfully:', response.data);
        if (response.data) {
          this.store.dispatch(addUser({ user: response.data }));
        }
      },
      error: (error: ApiResponseModel<UserModel>) => {
        console.error('Error updating profile:', error);
      }
    });
    // if (user) {
    //   this.store.dispatch(addUser({ user: { ...user, ...profile } }));
    // }
  }

  private getInitialProfile(): ProfileFormModel {
    const user = this.currentUser();

    return {
      firstName: user?.firstName ?? '',
      lastName: user?.lastName ?? '',
      age: user?.age ?? 0,
      gender: user?.gender ?? '',
      photoUrl: user?.photoUrl ?? '',
      about: user?.about ?? '',
    };
  }
}
