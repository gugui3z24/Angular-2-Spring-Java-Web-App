import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

export interface ModalConfig {
    options?: NgbModalOptions;
    title?: string;
    dismissable?: boolean;
}
