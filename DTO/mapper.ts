export const DTO = <T, U>(
    responseDTO: U,
    propertyMappings?: Record<string, keyof T>
): T => {
    const mappedDTO: Partial<T> = {};

    for (const key in responseDTO) {
        if (propertyMappings && key in propertyMappings) {
            mappedDTO[propertyMappings[key] as keyof T] = responseDTO[
                key
            ] as unknown as T[keyof T];
        } else {
            mappedDTO[key as unknown as keyof T] = responseDTO[
                key
            ] as unknown as T[keyof T];
        }
    }
    return mappedDTO as T;
};