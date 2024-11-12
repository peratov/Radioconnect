import { Observable, Utils, Frame } from '@nativescript/core';
import { StationService } from '../../services/station-service';
import { AuthService } from '../../services/auth-service';
import { Station } from '../../models/station';
import { BasePageViewModel } from '../base-page-view-model';

export class HomeViewModel extends BasePageViewModel {
    private stationService: StationService;
    private authService: AuthService;
    private _stations: Station[] = [];
    private _searchQuery: string = '';
    private _currentBannerAd: string = 'https://via.placeholder.com/800x200/6B46C1/FFFFFF?text=Radio+Connect+Premium';

    constructor() {
        super();
        this._activeTab = 'home';
        this.stationService = StationService.getInstance();
        this.authService = AuthService.getInstance();
        this.loadStations();
        this.rotateBannerAds();
    }

    get stations(): Station[] {
        return this._stations;
    }

    set stations(value: Station[]) {
        if (this._stations !== value) {
            this._stations = value;
            this.notifyPropertyChange('stations', value);
        }
    }

    get searchQuery(): string {
        return this._searchQuery;
    }

    set searchQuery(value: string) {
        if (this._searchQuery !== value) {
            this._searchQuery = value;
            this.notifyPropertyChange('searchQuery', value);
        }
    }

    get currentBannerAd(): string {
        return this._currentBannerAd;
    }

    set currentBannerAd(value: string) {
        if (this._currentBannerAd !== value) {
            this._currentBannerAd = value;
            this.notifyPropertyChange('currentBannerAd', value);
        }
    }

    private rotateBannerAds() {
        const ads = [
            'https://via.placeholder.com/800x200/6B46C1/FFFFFF?text=Radio+Connect+Premium',
            'https://via.placeholder.com/800x200/2B6CB0/FFFFFF?text=Discover+New+Stations',
            'https://via.placeholder.com/800x200/C05621/FFFFFF?text=Your+Ad+Here'
        ];
        let currentIndex = 0;

        setInterval(() => {
            currentIndex = (currentIndex + 1) % ads.length;
            this.currentBannerAd = ads[currentIndex];
        }, 5000);
    }

    onBannerTap() {
        console.log('Banner ad tapped');
    }

    loadStations() {
        const favorites = this.authService.isLoggedIn() ? this.stationService.getFavoriteStations() : [];
        this.stations = this.stationService.getStations().map(station => ({
            ...station,
            isFavorite: favorites.includes(station.id)
        }));
    }

    onSearchSubmit() {
        if (this.searchQuery) {
            this.stations = this.stationService.searchStations(this.searchQuery);
        } else {
            this.loadStations();
        }
    }

    onStationTap(args: any) {
        const station = this.stations[args.index];
        Frame.topmost().navigate({
            moduleName: 'pages/station/station-page',
            context: {
                stationId: station.id
            }
        });
    }

    toggleFavorite(args: any) {
        const station = args.object.bindingContext;
        
        if (!this.authService.isLoggedIn()) {
            alert('Please login to add favorites');
            Frame.topmost().navigate('pages/profile/profile-page');
            return;
        }

        station.isFavorite = !station.isFavorite;
        if (station.isFavorite) {
            this.stationService.addToFavorites(station.id);
        } else {
            this.stationService.removeFromFavorites(station.id);
        }
        this.notifyPropertyChange('stations', this.stations);
    }

    onWhatsAppTap(args: any) {
        const station = args.object.bindingContext;
        const whatsappUrl = `whatsapp://send?phone=${station.whatsappNumber}`;
        
        Utils.openUrl(whatsappUrl)
            .catch(() => {
                console.log('WhatsApp is not installed');
            });
    }
}