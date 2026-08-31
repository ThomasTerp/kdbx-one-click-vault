export default interface IReadWriteRepository<T> {
	read(): Promise<T>;

	write(value: T): Promise<void>;
}
