export const getMonthLabels = (locale: string = "cs-CZ") => {
    return Array.from({ length: 12 }, (_, i) => {
        const date = new Date(2000, i, 1);

        return {
            short: date.toLocaleString(locale, { month: "short" }),
            full: date.toLocaleString(locale, { month: "long" }),
        };
    });
};