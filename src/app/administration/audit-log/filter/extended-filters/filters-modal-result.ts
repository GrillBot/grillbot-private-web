import { TextFilter, ExecutionFilter } from './../../../../core/models/audit-log';

export interface ExtendedFiltersModalData {
    infoFilter: TextFilter;
    warningFilter: TextFilter;
    errorFilter: TextFilter;

    commandFilter: ExecutionFilter;
    interactionFilter: ExecutionFilter;
    jobFilter: ExecutionFilter;
}
