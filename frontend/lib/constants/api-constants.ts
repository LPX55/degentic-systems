// API Endpoints
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';
export const API_TIMEOUT = 30000; // 30 seconds

// Storage Configuration
export const STORAGE_CHUNK_SIZE = 256 * 1024; // 256KB chunks
export const STORAGE_SEGMENT_SIZE = 1024 * 1024; // 1MB segments

// API Routes
export const API_ROUTES = {
  MODELS: {
    LIST: '/api/models/list',
    REQUEST: '/api/models/request',
    RESPONSE: '/api/models/response',
  },
  STORAGE: {
    UPLOAD: '/api/storage/upload',
    DOWNLOAD: '/api/storage/download',
  },
};