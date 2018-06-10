export class StringUtil {

    public static isBlank(value: string): boolean {
        if (!value || !value.toString().trim()) {
            return true;
        }
        return false;
    }

    public static isNotBlank(value: string): boolean {
        return !this.isBlank(value);
    }

    public static titleCaseWord(value: string): string {
        return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    }
}
