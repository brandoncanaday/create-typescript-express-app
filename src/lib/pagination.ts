import { Utils } from './utils';

export type PaginationValues = {
    limit: number;
    page: number;
};

export class Pagination {
    public static parsePaginationParams(
        pageNo: string,
        limitNo: string,
        maxLimit: number
    ): PaginationValues {
        const pageString = Utils.parseNumber(pageNo);
        const limitString = Utils.parseNumber(limitNo);

        const page = pageString ? Math.max(1, pageString) : 1;
        const limit = limitString
            ? Math.max(1, Math.min(limitString, maxLimit))
            : 10;

        return { limit, page };
    }
}
