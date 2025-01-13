interface SearchQueryParams {
    body: {
        query: string; // `query` must be a string
        page?: string; // Optional, defaults to 1
        size?: string; // Optional, defaults to 10
    }
}