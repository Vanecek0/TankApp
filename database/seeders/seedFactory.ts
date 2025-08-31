type SeedFactoryParams<T> = T;

export async function seedEntity<T> (
        entities: SeedFactoryParams<T>[],
        repository: { create: (t: object) => Promise<boolean> }
    ) {
        for (const item of entities) {
            await repository.create(item as object);
        }
    };