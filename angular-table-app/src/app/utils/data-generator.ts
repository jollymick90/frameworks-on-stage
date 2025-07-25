// utils/data-generator.ts
export function generateRows(count: number): Row[] {
    const rows: Row[] = [];
    for (let i = 1; i <= count; i++) {
        rows.push({
            id: i,
            name: `User ${i}`,
            email: `user${i}@example.com`,
            address: `${i} Main Street, City ${i}`,
            isSelected: false,
        });
    }
    return rows;
}

// Don't forget the interface if you put it in a separate file
export interface Row {
    id: number;
    name: string;
    email: string;
    address: string;
    isSelected?: boolean;
}