import { Servicing } from "@/models/Servicing";

export function createServicingSeed(overrides: Partial<Servicing> = {}): Servicing {
    return {
        profile_id: 1,
        name: '',
        description: '',
        autoservice_id: 1,
        service_date: Date.now(),
        created_at: Date.now(),
        updated_at: Date.now(),
        ...overrides,
    };
}

export async function getServicingSeeds() {
    return [
        createServicingSeed({ 
            profile_id: 1, 
            name: 'Výmena oleje a filtrů', 
            description: 'Pravidelná výměna motorového oleje, olejového a vzduchového filtru.',
            autoservice_id: 1, 
            service_date: new Date('2024-03-12').getTime(), 
            created_at: Date.now(), 
            updated_at: Date.now() 
        }),
        
        createServicingSeed({ 
            profile_id: 1, 
            name: 'Kontrola brzdového systému', 
            description: 'Kontrola a výměna brzdových destiček a odvzdušnění brzd.',
            autoservice_id: 2, 
            service_date: new Date('2024-06-01').getTime(), 
            created_at: Date.now(), 
            updated_at: Date.now() 
        }),
        
        createServicingSeed({ 
            profile_id: 2, 
            name: 'Servis klimatizace', 
            description: 'Doplnění chladiva a vyčištění klimatizační jednotky.',
            autoservice_id: 1, 
            service_date: new Date('2024-04-22').getTime(), 
            created_at: Date.now(), 
            updated_at: Date.now() 
        }),
        
        createServicingSeed({ 
            profile_id: 2, 
            name: 'Výměna pneumatik', 
            description: 'Přezutí na letní pneumatiky a vyvážení kol.',
            autoservice_id: 2, 
            service_date: new Date('2024-05-10').getTime(), 
            created_at: Date.now(), 
            updated_at: Date.now() 
        })
    ];
}