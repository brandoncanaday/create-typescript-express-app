import path from 'path';

export class Utils {
    public static getCurrentFileName(fileURL: string): string {
        return path.basename(fileURL, path.extname(fileURL));
    }

    public static parseNumber(val: string): number | undefined {
        const num = Number.parseInt(Utils.parseString(val) || '', 10);

        return !Number.isNaN(num) ? num : undefined;
    }

    public static parseString(val: string): string | undefined {
        return val ? `${val}`.trim() : undefined;
    }
}
