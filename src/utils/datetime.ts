/**
 * A utility function to format using moment
 * there will be three formats:
 * 1. Full DateTime: 'MMMM Do YYYY, h:mm:ss a' (e.g., 2 Sep 2020, 3:30 PM)
 * 2. Date Only: 'MMMM Do YYYY' (e.g., 1 Sep 2020)
 * 3. Time Only: 'h:mm:ss a' (e.g., 3:30:45 PM)
 * The function should take a date and a format type ('full', 'date', 'time') and return the formatted string.
 */
import moment from 'moment';

export const formatDateTime = (date: Date | string | null | undefined, formatType: 'full' | 'date' | 'time' = 'full'): string => {
    if (!date) return '';
    let formatString = '';
    switch (formatType) {
        case 'full':
            formatString = "D MMM YYYY, h:mm A";
            break;
        case 'date':
            formatString = 'D MMM YYYY';
            break;
        case 'time':
            formatString = 'h:mm A';
            break;
        default:
            formatString = 'D MMM YYYY, h:mm A';
    }
    return moment(date).format(formatString);
}