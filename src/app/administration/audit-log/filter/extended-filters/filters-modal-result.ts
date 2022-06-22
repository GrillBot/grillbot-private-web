import { TextFilter, ExecutionFilter, ApiRequestFilter, TargetIdFilter } from './../../../../core/models/audit-log';

export interface ExtendedFiltersModalData {
    infoFilter: TextFilter;
    warningFilter: TextFilter;
    errorFilter: TextFilter;
    commandFilter: ExecutionFilter;
    interactionFilter: ExecutionFilter;
    jobFilter: ExecutionFilter;
    apiRequestFilter: ApiRequestFilter;
    overwriteCreatedFilter: TargetIdFilter;
    overwriteDeletedFilter: TargetIdFilter;
    overwriteUpdatedFilter: TargetIdFilter;
    memberUpdatedFilter: TargetIdFilter;
    memberRoleUpdatedFilter: TargetIdFilter;
}
