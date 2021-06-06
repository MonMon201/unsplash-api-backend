import { Photo } from './photo';

interface SearchError {
    code: number;
    messages: string[];
}

export interface SearchResult {
    isSuccess: boolean;
    error?: SearchError;
    photos?: Photo[];
}
