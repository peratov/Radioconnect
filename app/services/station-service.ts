import { Observable } from '@nativescript/core';
import { Station } from '../models/station';

export class StationService extends Observable {
    private static instance: StationService;
    private stations: Station[] = [];
    private favorites: string[] = [];

    constructor() {
        super();
        this.populateSampleStations();
    }

    static getInstance(): StationService {
        if (!StationService.instance) {
            StationService.instance = new StationService();
        }
        return StationService.instance;
    }

    getStations(): Station[] {
        return this.stations;
    }

    getFavoriteStations(): string[] {
        return this.favorites;
    }

    addToFavorites(stationId: string): void {
        if (!this.favorites.includes(stationId)) {
            this.favorites.push(stationId);
            this.notifyPropertyChange('favorites', this.favorites);
        }
    }

    removeFromFavorites(stationId: string): void {
        const index = this.favorites.indexOf(stationId);
        if (index > -1) {
            this.favorites.splice(index, 1);
            this.notifyPropertyChange('favorites', this.favorites);
        }
    }

    searchStations(query: string): Station[] {
        return this.stations.filter(station => 
            station.name.toLowerCase().includes(query.toLowerCase()) ||
            station.genre.toLowerCase().includes(query.toLowerCase()) ||
            station.location.toLowerCase().includes(query.toLowerCase())
        );
    }

    getStationById(id: string): Station | undefined {
        return this.stations.find(station => station.id === id);
    }

    private populateSampleStations() {
        this.stations = [
            {
                id: '1',
                name: 'Groove FM',
                genre: 'Jazz & Soul',
                location: 'New York, USA',
                description: 'The best in jazz and soul music, 24/7',
                logo: 'https://via.placeholder.com/100/6B46C1/FFFFFF?text=GFM',
                socialLinks: {
                    facebook: 'facebook.com/groovefm',
                    twitter: 'twitter.com/groovefm',
                    instagram: 'instagram.com/groovefm'
                },
                whatsappNumber: '+1234567890',
                bannerAdUrl: 'https://example.com/ads/groove',
                schedule: [
                    {
                        id: '1a',
                        name: 'Morning Jazz',
                        startTime: '06:00',
                        endTime: '09:00',
                        host: 'John Smith',
                        description: 'Wake up to smooth jazz'
                    }
                ]
            },
            // Add more sample stations here
        ];
    }
}