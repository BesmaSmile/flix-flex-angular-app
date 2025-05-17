export interface PaginatedData {
  data: any[];
  page: number;
  totalPages: number;
  loading: boolean;
  error?: string | null;
}