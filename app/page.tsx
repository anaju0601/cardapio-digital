"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    setIsAuthenticated(!!token)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-orange-600 mb-4">Cardápio Digital</h1>
          <p className="text-xl text-gray-600">Sistema completo de gerenciamento de cardápio</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-orange-600">API REST</CardTitle>
              <CardDescription>Backend com TypeScript e TypeORM</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">API completa com autenticação JWT, CRUD de produtos e categorias</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-orange-600">Documentação</CardTitle>
              <CardDescription>Swagger UI integrado</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Documentação interativa de todos os endpoints da API</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-orange-600">Docker</CardTitle>
              <CardDescription>Containerização completa</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Backend, frontend e banco de dados em containers Docker</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center gap-4">
          {isAuthenticated ? (
            <>
              <Button size="lg" onClick={() => router.push("/dashboard")}>
                Ir para Dashboard
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  localStorage.removeItem("token")
                  setIsAuthenticated(false)
                }}
              >
                Sair
              </Button>
            </>
          ) : (
            <>
              <Button size="lg" onClick={() => router.push("/login")}>
                Fazer Login
              </Button>
              <Button size="lg" variant="outline" onClick={() => router.push("/register")}>
                Registrar
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
