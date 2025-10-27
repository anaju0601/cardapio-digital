const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"

export interface User {
  id: string
  email: string
  name: string
  role: string
}

export interface Category {
  id: string
  name: string
  description: string
  imageUrl?: string
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  imageUrl?: string
  available: boolean
  categoryId: string
  category?: Category
}

export interface AuthResponse {
  message: string
  token: string
  user: User
}

class ApiClient {
  private getHeaders(includeAuth = true): HeadersInit {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    }

    if (includeAuth) {
      const token = localStorage.getItem("token")
      if (token) {
        headers.Authorization = `Bearer ${token}`
      }
    }

    return headers
  }

  async register(email: string, password: string, name: string): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: this.getHeaders(false),
      body: JSON.stringify({ email, password, name }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || "Erro ao registrar")
    }

    const data = await response.json()
    localStorage.setItem("token", data.token)
    return data
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: this.getHeaders(false),
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || "Erro ao fazer login")
    }

    const data = await response.json()
    localStorage.setItem("token", data.token)
    return data
  }

  async getProfile(): Promise<User> {
    const response = await fetch(`${API_URL}/api/auth/profile`, {
      headers: this.getHeaders(),
    })

    if (!response.ok) {
      throw new Error("Erro ao buscar perfil")
    }

    return response.json()
  }

  async getCategories(): Promise<Category[]> {
    const response = await fetch(`${API_URL}/api/categories`, {
      headers: this.getHeaders(),
    })

    if (!response.ok) {
      throw new Error("Erro ao buscar categorias")
    }

    return response.json()
  }

  async createCategory(data: Omit<Category, "id">): Promise<Category> {
    const response = await fetch(`${API_URL}/api/categories`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || "Erro ao criar categoria")
    }

    return response.json()
  }

  async getProducts(): Promise<Product[]> {
    const response = await fetch(`${API_URL}/api/products`, {
      headers: this.getHeaders(),
    })

    if (!response.ok) {
      throw new Error("Erro ao buscar produtos")
    }

    return response.json()
  }

  async createProduct(data: Omit<Product, "id" | "createdAt" | "updatedAt">): Promise<Product> {
    const response = await fetch(`${API_URL}/api/products`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || "Erro ao criar produto")
    }

    return response.json()
  }

  async updateProduct(id: string, data: Partial<Product>): Promise<Product> {
    const response = await fetch(`${API_URL}/api/products/${id}`, {
      method: "PUT",
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || "Erro ao atualizar produto")
    }

    return response.json()
  }

  async deleteProduct(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/api/products/${id}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || "Erro ao deletar produto")
    }
  }

  logout() {
    localStorage.removeItem("token")
  }
}

export const api = new ApiClient()
