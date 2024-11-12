import { Observable, Frame } from '@nativescript/core';

export class BasePageViewModel extends Observable {
    protected _activeTab: string = 'home';

    get activeTab(): string {
        return this._activeTab;
    }

    set activeTab(value: string) {
        if (this._activeTab !== value) {
            this._activeTab = value;
            this.notifyPropertyChange('activeTab', value);
        }
    }

    onHomeTab() {
        this.activeTab = 'home';
        Frame.topmost().navigate({
            moduleName: 'pages/home/home-page',
            clearHistory: true
        });
    }

    onAddStationTab() {
        this.activeTab = 'add';
        Frame.topmost().navigate('pages/add-station/add-station-page');
    }

    onProfileTab() {
        this.activeTab = 'profile';
        Frame.topmost().navigate('pages/profile/profile-page');
    }
}