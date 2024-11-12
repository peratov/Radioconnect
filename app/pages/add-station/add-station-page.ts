import { NavigatedData, Page } from '@nativescript/core';
import { AddStationViewModel } from './add-station-view-model';

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.bindingContext = new AddStationViewModel();
}