import { View, ViewType } from './view';

export class MobileView extends View {
    protected static readonly countNews: number = 1;
    protected static readonly countMeasurements: number = 1;
    protected static readonly viewType = ViewType.Mobile;

    protected getCountNews() {
        return MobileView.countNews;
    }

    protected getCountMeasurements() {
        return MobileView.countMeasurements;
    }

    protected getViewType() {
        return MobileView.viewType;
    }
}
