import { TextFilter, ExecutionFilter, ApiRequestFilter } from './../../../../core/models/audit-log';

export interface ExtendedFiltersModalData {
    infoFilter: TextFilter;
    warningFilter: TextFilter;
    errorFilter: TextFilter;
    commandFilter: ExecutionFilter;
    interactionFilter: ExecutionFilter;
    jobFilter: ExecutionFilter;
    apiRequestFilter: ApiRequestFilter;
}
