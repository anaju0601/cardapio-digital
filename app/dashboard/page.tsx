"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { api, type Product, type Category, type User } from "@/lib/api"
import { ProductList } from "@/components/product-list"
import { CategoryList } from "@/components/category-list"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThemeToggle } from "@/components/theme-toggle"

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
      return
    }

    loadData()
  }, [router])

  const loadData = async () => {
    try {
      const [userProfile, productsData, categoriesData] = await Promise.all([
        api.getProfile(),
        api.getProducts(),
        api.getCategories(),
      ])

      setUser(userProfile)
      setProducts(productsData)
      setCategories(categoriesData)
    } catch (error) {
      console.error("Erro ao carregar dados:", error)
      router.push("/login")
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    api.logout()
    router.push("/")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Carregando...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold text-orange-600 dark:text-orange-500">Cardápio Digital</h1>
            <p className="text-sm text-muted-foreground">Bem-vindo, {user?.name}</p>
          </div>
          <div className="flex gap-2">
            <ThemeToggle />
            <Button variant="secondary" onClick={() => router.push("/menu")}>
              Ver Cardápio
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList>
            <TabsTrigger value="products">Produtos</TabsTrigger>
            <TabsTrigger value="categories">Categorias</TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <ProductList products={products} categories={categories} onUpdate={loadData} />
          </TabsContent>

          <TabsContent value="categories">
            <CategoryList categories={categories} onUpdate={loadData} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
