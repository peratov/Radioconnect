import { Observable, Frame } from '@nativescript/core';
import { AuthService } from '../../services/auth-service';
import { StationService } from '../../services/station-service';
import { BasePageViewModel } from '../base-page-view-model';

export class ProfileViewModel extends BasePageViewModel {
    private authService: AuthService;
    private stationService: StationService;

    email: string = '';
    password: string = '';
    confirmPassword: string = '';
    username: string = '';
    favoriteStations: any[] = [];
    isLoginForm: boolean = true;
    isAdminForm: boolean = false;

    constructor() {
        super();
        this._activeTab = 'profile';
        this.authService = AuthService.getInstance();
        this.stationService = StationService.getInstance();
        this.updateState();
    }

    get isLoggedIn(): boolean {
        return this.authService.isLoggedIn();
    }

    get isAdmin(): boolean {
        return this.authService.isAdmin();
    }

    showLoginForm() {
        this.isLoginForm = true;
        this.isAdminForm = false;
        this.notifyPropertyChange('isLoginForm', true);
        this.notifyPropertyChange('isAdminForm', false);
    }

    showRegisterForm() {
        this.isLoginForm = false;
        this.isAdminForm = false;
        this.notifyPropertyChange('isLoginForm', false);
        this.notifyPropertyChange('isAdminForm', false);
    }

    showAdminForm() {
        this.isLoginForm = false;
        this.isAdminForm = true;
        this.notifyPropertyChange('isLoginForm', false);
        this.notifyPropertyChange('isAdminForm', true);
    }

    private updateState() {
        if (this.isLoggedIn) {
            const user = this.authService.getCurrentUser();
            this.username = user.username;
            this.email = user.email;
            this.favoriteStations = this.stationService.getStations().slice(0, 3);
        }
        this.notifyPropertyChange('isLoggedIn', this.isLoggedIn);
        this.notifyPropertyChange('isAdmin', this.isAdmin);
        this.notifyPropertyChange('username', this.username);
        this.notifyPropertyChange('email', this.email);
        this.notifyPropertyChange('favoriteStations', this.favoriteStations);
    }

    async onLogin() {
        if (!this.email || !this.password) {
            alert('Please enter both email and password');
            return;
        }

        try {
            await this.authService.login(this.email, this.password);
            this.updateState();
        } catch (error) {
            alert('Login failed. Please try again.');
        }
    }

    async onAdminLogin() {
        if (!this.email || !this.password) {
            alert('Please enter both email and password');
            return;
        }

        try {
            await this.authService.adminLogin(this.email, this.password);
            this.updateState();
            if (this.isAdmin) {
                Frame.topmost().navigate('pages/admin/admin-dashboard-page');
            }
        } catch (error) {
            alert('Admin login failed. Please try again.');
        }
    }

    onManageStations() {
        Frame.topmost().navigate('pages/admin/station-approvals-page');
    }

    onManageBannerAds() {
        Frame.topmost().navigate('pages/admin/banner-ads-page');
    }

    async onRegister() {
        if (!this.username || !this.email || !this.password || !this.confirmPassword) {
            alert('Please fill in all fields');
            return;
        }

        if (this.password !== this.confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            await this.authService.register(this.username, this.email, this.password);
            this.updateState();
        } catch (error) {
            alert('Registration failed. Please try again.');
        }
    }

    onForgotPassword() {
        alert('Password reset link will be sent to your email');
    }

    onFacebookLogin() {
        alert('Facebook login not implemented in this demo');
    }

    onTwitterLogin() {
        alert('Twitter login not implemented in this demo');
    }

    onGoogleLogin() {
        alert('Google login not implemented in this demo');
    }

    onLogout() {
        this.authService.logout();
        this.email = '';
        this.password = '';
        this.username = '';
        this.confirmPassword = '';
        this.updateState();
    }
}