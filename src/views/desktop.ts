import { AbstractView } from './abstract';

export class DesktopView extends AbstractView {
    protected articlesCount: number = 3;
    protected measurementsCount: number = 2;
    protected viewType: string = 'desktop';
}
