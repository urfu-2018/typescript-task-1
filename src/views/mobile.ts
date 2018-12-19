import { AbstractView } from './abstract';

export class MobileView extends AbstractView {
    protected articlesCount: number = 1;
    protected measurementsCount: number = 1;
    protected viewType: string = 'mobile';
}
