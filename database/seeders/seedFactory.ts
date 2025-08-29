type SeedFactoryParams<T> = T;

export async function seedEntity<T> (
        entities: SeedFactoryParams<T>[],
        model: { create: (data: T) => Promise<any> }
    ) {
        for (const item of entities) {
            await model.create(item);
        }
    };