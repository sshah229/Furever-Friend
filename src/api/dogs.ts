import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL
axios.defaults.withCredentials = true

// --- Types ---
export interface Dog {
  id: string
  img: string
  name: string
  age: number
  zip_code: string
  breed: string
}

export interface SearchParams {
  breeds?: string[]
  size?: number
  from?: string
  sort?: string   // e.g. 'breed:asc'
}

export interface SearchResponse {
  resultIds: string[]
  total: number
  next?: string
  prev?: string
}

// --- Endpoints ---

// 1. List all breeds
export async function fetchBreeds(): Promise<string[]> {
  const res = await axios.get<string[]>('/dogs/breeds')
  return res.data
}

// 2. Search with explicit params
export async function searchDogs(params: SearchParams): Promise<SearchResponse> {
  const res = await axios.get<SearchResponse>('/dogs/search', { params })
  return res.data
}

// 3. Cursor-based search: pass raw querystring from `next`
export async function searchDogsCursor(
  cursorQuery?: string,
  params?: Omit<SearchParams, 'from'>
): Promise<SearchResponse> {
  if (cursorQuery) {
    const res = await axios.get<SearchResponse>(`/dogs/search?${cursorQuery}`)
    return res.data
  } else {
    const res = await axios.get<SearchResponse>('/dogs/search', { params })
    return res.data
  }
}

// 4. Fetch dog objects by ID list
export async function fetchDogsByIds(ids: string[]): Promise<Dog[]> {
  const res = await axios.post<Dog[]>('/dogs', ids)
  return res.data
}

// 5. Match endpoint
export async function matchDogs(ids: string[]): Promise<string> {
  const res = await axios.post<{ match: string }>('/dogs/match', ids)
  return res.data.match
}
