import { Observable, Utils } from '@nativescript/core';
import { StationService } from '../../services/station-service';
import { AuthService } from '../../services/auth-service';
import { Station } from '../../models/station';
import { BasePageViewModel } from '../base-page-view-model';

export class StationViewModel extends BasePageViewModel {
    private stationService: StationService;
    private authService: AuthService;
    private _station: Station;
    private _isFavorite: boolean = false;

    constructor(stationId: string) {
        super();
        this.stationService = StationService.getInstance();
        this.authService = AuthService.getInstance();
        this._station = this.stationService.getStationById(stationId);
    }

    get station(): Station {
        return this._station;
    }

    get isFavorite(): boolean {
        return this._isFavorite;
    }

    set isFavorite(value: boolean) {
        if (this._isFavorite !== value) {
            this._isFavorite = value;
            this.notifyPropertyChange('isFavorite', value);
        }
    }

    toggleFavorite() {
        if (!this.authService.isLoggedIn()) {
            alert('Please login to add favorites');
            return;
        }
        this.isFavorite = !this.isFavorite;
    }

    onWhatsAppTap() {
        const whatsappUrl = `whatsapp://send?phone=${this.station.whatsappNumber}`;
        Utils.openUrl(whatsappUrl)
            .catch(() => {
                alert('WhatsApp is not installed');
            });
    }

    onShareTap() {
        const shareText = `Check out ${this.station.name} - ${this.station.description}`;
        Utils.openUrl(`mailto:?subject=Check out this radio station&body=${encodeURIComponent(shareText)}`)
            .catch(error => {
                console.log('Error sharing:', error);
            });
    }

    onFacebookTap() {
        Utils.openUrl(this.station.socialLinks.facebook);
    }

    onTwitterTap() {
        Utils.openUrl(this.station.socialLinks.twitter);
    }

    onInstagramTap() {
        Utils.openUrl(this.station.socialLinks.instagram);
    }

    onBannerTap() {
        if (this.station.bannerAdUrl) {
            Utils.openUrl(this.station.bannerAdUrl);
        }
    }
}