import { ApiError } from '@google-cloud/storage';
import { getFilePrefix } from '@payloadcms/plugin-cloud-storage/utilities';
import path from 'path';
export const getHandler = ({ bucket, collection, getStorageClient })=>{
    return async (req, { headers: incomingHeaders, params: { clientUploadContext, filename } })=>{
        try {
            const prefix = await getFilePrefix({
                clientUploadContext,
                collection,
                filename,
                req
            });
            const file = getStorageClient().bucket(bucket).file(path.posix.join(prefix, filename));
            const [metadata] = await file.getMetadata();
            const etagFromHeaders = req.headers.get('etag') || req.headers.get('if-none-match');
            const objectEtag = metadata.etag;
            let headers = new Headers(incomingHeaders);
            headers.append('Content-Length', String(metadata.size));
            headers.append('Content-Type', String(metadata.contentType));
            headers.append('ETag', String(metadata.etag));
            if (collection.upload && typeof collection.upload === 'object' && typeof collection.upload.modifyResponseHeaders === 'function') {
                headers = collection.upload.modifyResponseHeaders({
                    headers
                }) || headers;
            }
            if (etagFromHeaders && etagFromHeaders === objectEtag) {
                return new Response(null, {
                    headers,
                    status: 304
                });
            }
            // Manually create a ReadableStream for the web from a Node.js stream.
            const readableStream = new ReadableStream({
                start (controller) {
                    const nodeStream = file.createReadStream();
                    nodeStream.on('data', (chunk)=>{
                        controller.enqueue(new Uint8Array(chunk));
                    });
                    nodeStream.on('end', ()=>{
                        controller.close();
                    });
                    nodeStream.on('error', (err)=>{
                        controller.error(err);
                    });
                }
            });
            return new Response(readableStream, {
                headers,
                status: 200
            });
        } catch (err) {
            if (err instanceof ApiError && err.code === 404) {
                return new Response(null, {
                    status: 404,
                    statusText: 'Not Found'
                });
            }
            req.payload.logger.error(err);
            return new Response('Internal Server Error', {
                status: 500
            });
        }
    };
};

//# sourceMappingURL=staticHandler.js.map