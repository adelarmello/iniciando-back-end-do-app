export default interface ICacheProvider {
  save(key: string, valeu: any): Promise<void>; // Salva os dados do cache
  recover<T>(key: string): Promise<T | null>; // Lista os dados do cache
  invalidate(key: string): Promise<void>; // Deleta os dados do cache
  invalidatePrefix(prefix: string): Promise<void>;
}
