import { View, ViewType } from './view';

export class DesktopView extends View {
    protected static readonly countNews: number = 3;
    protected static readonly countMeasurements: number = 2;
    protected static readonly viewType = ViewType.Desktop;

    protected getCountNews() {
        return DesktopView.countNews;
    }

    protected getCountMeasurements() {
        return DesktopView.countMeasurements;
    }

    protected getViewType() {
        return DesktopView.viewType;
    }
}
