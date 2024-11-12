import { NavigatedData, Page } from '@nativescript/core';
import { StationViewModel } from './station-view-model';

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    const stationId = page.navigationContext.stationId;
    page.bindingContext = new StationViewModel(stationId);
}