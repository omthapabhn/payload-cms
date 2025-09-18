import type { DocumentEvent, FieldSchemaJSON } from 'payload';
import type { CollectionPopulationRequestHandler } from './types.js';
export declare const mergeData: <T extends Record<string, any>>(args: {
    apiRoute?: string;
    /**
     * @deprecated Use `requestHandler` instead
     */
    collectionPopulationRequestHandler?: CollectionPopulationRequestHandler;
    depth?: number;
    externallyUpdatedRelationship?: DocumentEvent;
    fieldSchema: FieldSchemaJSON;
    incomingData: Partial<T>;
    initialData: T;
    locale?: string;
    requestHandler?: CollectionPopulationRequestHandler;
    returnNumberOfRequests?: boolean;
    serverURL: string;
}) => Promise<{
    _numberOfRequests?: number;
} & T>;
//# sourceMappingURL=mergeData.d.ts.map