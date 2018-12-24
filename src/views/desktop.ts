import { AbstractView } from './AbstractView';

export class DesktopView extends AbstractView {
    private static articleCount: number = 3;
    private static measurementsCount: number = 2;
    private static deviceName: string = 'desktop';

    constructor() {
        super(DesktopView.deviceName, DesktopView.articleCount, DesktopView.measurementsCount);
    }
}
