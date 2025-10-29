const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
}

export interface Professor {
  id: string
  name: string
  email: string
  phone: string
  department: string
  specialization: string
  active: boolean
  createdAt: string
  updatedAt: string
}

export interface Subject {
  id: string
  name: string
  code: string
  workload: number
  description?: string
  professorId: string
  professor?: Professor
  createdAt: string
  updatedAt: string
}

export interface Schedule {
  id: string
  dayOfWeek: string
  startTime: string
  endTime: string
  classroom: string
  subjectId: string
  subject?: Subject
  createdAt: string
  updatedAt: string
}

class ApiClient {
  private getAuthHeader(): HeadersInit {
    const token = localStorage.getItem("token")
    if (token) {
      return { Authorization: `Bearer ${token}` }
    }
    return {}
  }

  private async handleResponse(response: Response) {
    if (!response.ok) {
      const errorText = await response.text()
      console.error("[v0] API Error:", response.status, errorText)
      throw new Error(`API Error: ${response.status} - ${errorText}`)
    }
    return response.json()
  }

  async login(credentials: LoginCredentials) {
    console.log("[v0] Attempting login to:", `${API_URL}/auth/login`)
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    })
    return this.handleResponse(response)
  }

  async register(data: RegisterData) {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Registration failed")
    return response.json()
  }

  async getMe() {
    const response = await fetch(`${API_URL}/auth/me`, {
      headers: this.getAuthHeader(),
    })
    if (!response.ok) throw new Error("Failed to get user")
    return response.json()
  }

  // Professors
  async getProfessors(): Promise<Professor[]> {
    console.log("[v0] Fetching professors from:", `${API_URL}/professors`)
    const response = await fetch(`${API_URL}/professors`, {
      headers: this.getAuthHeader(),
    })
    return this.handleResponse(response)
  }

  async getProfessor(id: string): Promise<Professor> {
    const response = await fetch(`${API_URL}/professors/${id}`, {
      headers: this.getAuthHeader(),
    })
    if (!response.ok) throw new Error("Failed to fetch professor")
    return response.json()
  }

  async createProfessor(data: Omit<Professor, "id" | "createdAt" | "updatedAt">) {
    console.log("[v0] Creating professor:", data)
    const response = await fetch(`${API_URL}/professors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...this.getAuthHeader(),
      },
      body: JSON.stringify(data),
    })
    return this.handleResponse(response)
  }

  async updateProfessor(id: string, data: Partial<Professor>) {
    console.log("[v0] Updating professor:", id, data)
    const response = await fetch(`${API_URL}/professors/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...this.getAuthHeader(),
      },
      body: JSON.stringify(data),
    })
    return this.handleResponse(response)
  }

  async deleteProfessor(id: string) {
    const response = await fetch(`${API_URL}/professors/${id}`, {
      method: "DELETE",
      headers: this.getAuthHeader(),
    })
    if (!response.ok) throw new Error("Failed to delete professor")
    return response.json()
  }

  // Subjects
  async getSubjects(): Promise<Subject[]> {
    console.log("[v0] Fetching subjects from:", `${API_URL}/subjects`)
    const response = await fetch(`${API_URL}/subjects`, {
      headers: this.getAuthHeader(),
    })
    return this.handleResponse(response)
  }

  async getSubject(id: string): Promise<Subject> {
    const response = await fetch(`${API_URL}/subjects/${id}`, {
      headers: this.getAuthHeader(),
    })
    if (!response.ok) throw new Error("Failed to fetch subject")
    return response.json()
  }

  async createSubject(data: Omit<Subject, "id" | "createdAt" | "updatedAt" | "professor">) {
    console.log("[v0] Creating subject:", data)
    const response = await fetch(`${API_URL}/subjects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...this.getAuthHeader(),
      },
      body: JSON.stringify(data),
    })
    return this.handleResponse(response)
  }

  async updateSubject(id: string, data: Partial<Subject>) {
    console.log("[v0] Updating subject:", id, data)
    const response = await fetch(`${API_URL}/subjects/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...this.getAuthHeader(),
      },
      body: JSON.stringify(data),
    })
    return this.handleResponse(response)
  }

  async deleteSubject(id: string) {
    const response = await fetch(`${API_URL}/subjects/${id}`, {
      method: "DELETE",
      headers: this.getAuthHeader(),
    })
    if (!response.ok) throw new Error("Failed to delete subject")
    return response.json()
  }

  // Schedules
  async getSchedules(): Promise<Schedule[]> {
    console.log("[v0] Fetching schedules from:", `${API_URL}/schedules`)
    const response = await fetch(`${API_URL}/schedules`, {
      headers: this.getAuthHeader(),
    })
    return this.handleResponse(response)
  }

  async getSchedule(id: string): Promise<Schedule> {
    const response = await fetch(`${API_URL}/schedules/${id}`, {
      headers: this.getAuthHeader(),
    })
    if (!response.ok) throw new Error("Failed to fetch schedule")
    return response.json()
  }

  async createSchedule(data: Omit<Schedule, "id" | "createdAt" | "updatedAt" | "subject">) {
    console.log("[v0] Creating schedule:", data)
    const response = await fetch(`${API_URL}/schedules`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...this.getAuthHeader(),
      },
      body: JSON.stringify(data),
    })
    return this.handleResponse(response)
  }

  async updateSchedule(id: string, data: Partial<Schedule>) {
    console.log("[v0] Updating schedule:", id, data)
    const response = await fetch(`${API_URL}/schedules/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...this.getAuthHeader(),
      },
      body: JSON.stringify(data),
    })
    return this.handleResponse(response)
  }

  async deleteSchedule(id: string) {
    const response = await fetch(`${API_URL}/schedules/${id}`, {
      method: "DELETE",
      headers: this.getAuthHeader(),
    })
    if (!response.ok) throw new Error("Failed to delete schedule")
    return response.json()
  }
}

export const api = new ApiClient()
