import { New } from './new';

export class DesktopView extends New {
    protected renderArticles: number = 3;
    protected renderMeasurements: number = 2;
    protected type: string = 'desktop';
}
