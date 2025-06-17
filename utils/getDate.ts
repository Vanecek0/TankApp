export const getDate = (dateInput: Date | string) => {
    const date = new Date(dateInput);
    const monthIndex = date.getMonth();
    const dayIndex = date.getDay();

    const fullMonthNames = [
        'leden', 'únor', 'březen', 'duben', 'květen', 'červen',
        'červenec', 'srpen', 'září', 'říjen', 'listopad', 'prosinec'
    ];

    const shortMonthNames = [
        'Led', 'Úno', 'Bře', 'Dub', 'Kvě', 'Čer',
        'Čvc', 'Srp', 'Zář', 'Říj', 'Lis', 'Pro'
    ];

    const fullDayNames = [
        'pondělí', 'úterý', 'středa', 'čtvrtek', 'pátek', 'sobota', 'neděle'
    ];

    const shortDayNames = [
        'po', 'út', 'st', 'čt', 'pá', 'so', 'ne'
    ];

    return {
        year: date.getFullYear(),
        monthLong: fullMonthNames[monthIndex],
        monthShort: shortMonthNames[monthIndex],
        dayLong: fullDayNames[dayIndex],
        dayShort: shortDayNames[dayIndex],

    };
}