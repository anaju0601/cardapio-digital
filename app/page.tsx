"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { UtensilsCrossed, ShieldCheck, FileText, Package } from "lucide-react"

export default function HomePage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    setIsAuthenticated(!!token)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <UtensilsCrossed className="h-6 w-6 text-primary" />
            <span className="font-serif text-xl font-bold">Cardápio Digital</span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-6xl md:text-7xl font-bold text-balance leading-tight">
            <span className="text-primary">Cardápio Digital</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Sistema completo e elegante para gerenciar o cardápio do seu restaurante
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
          <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-xl">API REST</CardTitle>
              <CardDescription>Backend com TypeScript e TypeORM</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                API completa com autenticação JWT, CRUD de produtos e categorias
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-xl">Documentação</CardTitle>
              <CardDescription>Swagger UI integrado</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Documentação interativa de todos os endpoints da API
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                <ShieldCheck className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-xl">Segurança</CardTitle>
              <CardDescription>Autenticação robusta</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Sistema completo de autenticação com JWT e proteção de rotas
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                <UtensilsCrossed className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-xl">Cardápio</CardTitle>
              <CardDescription>Interface elegante</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Visualização bonita e responsiva do cardápio para seus clientes
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center gap-4 flex-wrap">
          <Button size="lg" variant="outline" onClick={() => router.push("/menu")} className="text-base px-8">
            Ver Cardápio
          </Button>
          {isAuthenticated ? (
            <>
              <Button size="lg" onClick={() => router.push("/dashboard")} className="text-base px-8">
                Ir para Dashboard
              </Button>
              <Button
                size="lg"
                variant="secondary"
                onClick={() => {
                  localStorage.removeItem("token")
                  setIsAuthenticated(false)
                }}
                className="text-base px-8"
              >
                Sair
              </Button>
            </>
          ) : (
            <>
              <Button size="lg" onClick={() => router.push("/login")} className="text-base px-8">
                Fazer Login
              </Button>
              <Button size="lg" variant="secondary" onClick={() => router.push("/register")} className="text-base px-8">
                Registrar
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
