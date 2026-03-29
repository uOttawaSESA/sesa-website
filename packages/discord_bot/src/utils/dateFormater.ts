import { format } from "date-fns";
//TODO: Merge date formating in a util function from the main app (Since we are using the same code)
//TODO: When merged, remove date-fns

/**
 * Function which formats the date like this 'Oct 07, 2025, 6PM - 9PM'
 * @param event
 * @returns
 */
export function formatDate(event: any): string {
    const formattedDate = format(event.startTime, "MMM dd, yyyy"); // e.g., "Mar 25, 2024"
    const timeRange = `${format(event.startTime, "ha")} – ${format(event.endTime, "ha")}`; // "6PM – 8PM"

    return `${formattedDate}  ${timeRange}`;
}
