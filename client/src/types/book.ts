export interface Book {
    _id: string,
    title: string,
    scartchers?: string[],
    coverImage?: string,
    description?: string,
    royalroadTags?: string[],
}