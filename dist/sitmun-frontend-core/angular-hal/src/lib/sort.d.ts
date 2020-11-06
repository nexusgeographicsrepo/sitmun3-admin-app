/** SortOrder enum */
export declare type SortOrder = 'DESC' | 'ASC';
/** Sort data interface */
export interface Sort {
    /** sort path */
    path: string;
    /** sort order */
    order: SortOrder;
}
