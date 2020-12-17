export interface PostDTO {
    id?: number;
    title?: string;
    body?: string;
    userId?: number;
    user?: {
        id?: number,
        name?: string;
    }
}
