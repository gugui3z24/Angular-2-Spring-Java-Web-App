export interface AlertConfig {
    title?: string;
    message: string;
    type: 'success' | 'info' | 'warning' | 'danger' | 'primary' | 'light';
    dismissible?: boolean;
    timer?: number;
    icon?: string;
}
