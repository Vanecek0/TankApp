export interface Repository<T> {
  exists(t: T): Promise<boolean>;
  remove(id: number): Promise<any>;
  getById(id: number): Promise<T>;
  create(t: T): Promise<any>;
}