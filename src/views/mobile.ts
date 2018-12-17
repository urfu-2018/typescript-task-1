import { DeviceView } from './device';

export class MobileView extends DeviceView {
    protected readonly articlesCount: number = 1;
    protected readonly measurementsCount: number = 1;
    protected readonly deviceName: string = 'mobile';
}
