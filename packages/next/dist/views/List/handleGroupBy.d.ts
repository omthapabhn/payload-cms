import type { ClientConfig, Column, ListQuery, PaginatedDocs, PayloadRequest, SanitizedCollectionConfig, ViewTypes, Where } from 'payload';
export declare const handleGroupBy: ({ clientConfig, collectionConfig, collectionSlug, columns, customCellProps, drawerSlug, enableRowSelections, query, req, trash, user, viewType, where: whereWithMergedSearch, }: {
    clientConfig: ClientConfig;
    collectionConfig: SanitizedCollectionConfig;
    collectionSlug: string;
    columns: any[];
    customCellProps?: Record<string, any>;
    drawerSlug?: string;
    enableRowSelections?: boolean;
    query?: ListQuery;
    req: PayloadRequest;
    trash?: boolean;
    user: any;
    viewType?: ViewTypes;
    where: Where;
}) => Promise<{
    columnState: Column[];
    data: PaginatedDocs;
    Table: null | React.ReactNode | React.ReactNode[];
}>;
//# sourceMappingURL=handleGroupBy.d.ts.map