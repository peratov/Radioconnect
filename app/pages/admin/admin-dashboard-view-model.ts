import { Observable, Frame } from '@nativescript/core';
import { BasePageViewModel } from '../base-page-view-model';
import { StationService } from '../../services/station-service';
import { AuthService } from '../../services/auth-service';

export class AdminDashboardViewModel extends BasePageViewModel {
    private stationService: StationService;
    private authService: AuthService;

    pendingStations: any[] = [];
    activeStations: any[] = [];
    activeBannerAds: any[] = [];
    totalUsers: number = 0;

    constructor() {
        super();
        this.stationService = StationService.getInstance();
        this.authService = AuthService.getInstance();
        this.loadDashboardData();
    }

    private loadDashboardData() {
        // Mock data for dashboard
        this.pendingStations = [{ id: 1, name: 'Pending Station 1' }];
        this.activeStations = this.stationService.getStations();
        this.activeBannerAds = [{ id: 1, name: 'Banner Ad 1' }];
        this.totalUsers = 100;

        this.notifyPropertyChange('pendingStations', this.pendingStations);
        this.notifyPropertyChange('activeStations', this.activeStations);
        this.notifyPropertyChange('activeBannerAds', this.activeBannerAds);
        this.notifyPropertyChange('totalUsers', this.totalUsers);
    }

    onManageStations() {
        Frame.topmost().navigate('pages/admin/station-approvals-page');
    }

    onManageBannerAds() {
        Frame.topmost().navigate('pages/admin/banner-ads-page');
    }

    onViewReports() {
        Frame.topmost().navigate('pages/admin/reports-page');
    }

    onUserManagement() {
        Frame.topmost().navigate('pages/admin/user-management-page');
    }
}