import { DeviceView } from './device';

export class DesktopView extends DeviceView {
    protected readonly articlesCount: number = 3;
    protected readonly measurementsCount: number = 2;
    protected readonly deviceName: string = 'desktop';
}
