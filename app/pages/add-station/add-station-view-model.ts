import { Observable, Frame, ImageSource } from '@nativescript/core';
import { StationService } from '../../services/station-service';
import { AuthService } from '../../services/auth-service';
import { BasePageViewModel } from '../base-page-view-model';

export class AddStationViewModel extends BasePageViewModel {
    private stationService: StationService;
    private authService: AuthService;

    name: string = '';
    genre: string = '';
    location: string = '';
    description: string = '';
    whatsappNumber: string = '';
    facebook: string = '';
    twitter: string = '';
    instagram: string = '';
    logoPreview: string = '';
    private logoBase64: string = '';

    constructor() {
        super();
        this._activeTab = 'add';
        this.stationService = StationService.getInstance();
        this.authService = AuthService.getInstance();
    }

    async onSelectLogo() {
        this.logoPreview = 'https://via.placeholder.com/100';
        this.logoBase64 = 'base64_encoded_image_data';
        this.notifyPropertyChange('logoPreview', this.logoPreview);
    }

    onSubmit() {
        if (!this.authService.isLoggedIn()) {
            alert('Please login to submit a station');
            return;
        }

        if (!this.name || !this.genre || !this.location || !this.whatsappNumber) {
            alert('Please fill in all required fields');
            return;
        }

        const newStation = {
            id: Date.now().toString(),
            name: this.name,
            genre: this.genre,
            location: this.location,
            description: this.description,
            logo: this.logoBase64 || '',
            whatsappNumber: this.whatsappNumber,
            socialLinks: {
                facebook: this.facebook,
                twitter: this.twitter,
                instagram: this.instagram
            },
            schedule: []
        };

        console.log('Submitting new station:', newStation);
        alert('Station submitted for review');
        Frame.topmost().goBack();
    }
}