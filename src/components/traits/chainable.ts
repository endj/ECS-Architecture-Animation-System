interface Chainable<T> {
    next: T;
    reset(): void;
}