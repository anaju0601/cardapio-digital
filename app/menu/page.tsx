"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { api, type Product, type Category } from "@/lib/api"
import Image from "next/image"
import { Search, UtensilsCrossed, Home } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { useRouter } from "next/navigation"

export default function MenuPage() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [productsData, categoriesData] = await Promise.all([api.getProducts(), api.getCategories()])

      setProducts(productsData.filter((p) => p.available))
      setCategories(categoriesData)
    } catch (error) {
      console.error("Erro ao carregar dados:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory ? p.categoryId === selectedCategory : true
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-accent/20 to-background">
        <div className="text-center space-y-4">
          <UtensilsCrossed className="h-12 w-12 text-primary mx-auto animate-pulse" />
          <p className="text-lg text-muted-foreground">Carregando cardápio...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background">
      <header className="bg-card/80 backdrop-blur-md border-b shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <UtensilsCrossed className="h-8 w-8 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold text-primary">Nosso Cardápio</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={() => router.push("/")}>
                <Home className="h-5 w-5" />
              </Button>
              <ThemeToggle />
            </div>
          </div>
          <p className="text-center text-lg text-muted-foreground">Confira nossas delícias</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="mb-10">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Buscar produtos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-lg border-2 focus:border-primary"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-12 justify-center">
          <Badge
            variant={selectedCategory === null ? "default" : "outline"}
            className="cursor-pointer px-6 py-3 text-base hover:scale-105 transition-transform"
            onClick={() => setSelectedCategory(null)}
          >
            Todos
          </Badge>
          {categories.map((category) => (
            <Badge
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className="cursor-pointer px-6 py-3 text-base hover:scale-105 transition-transform"
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </Badge>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="overflow-hidden hover:shadow-2xl transition-all hover:scale-[1.02] border-2 hover:border-primary/50"
            >
              {product.imageUrl && (
                <div className="relative h-64 w-full bg-muted overflow-hidden">
                  <Image
                    src={product.imageUrl || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
              )}
              <CardHeader className="space-y-3">
                <div className="flex justify-between items-start gap-2">
                  <CardTitle className="text-2xl leading-tight">{product.name}</CardTitle>
                  <Badge variant="secondary" className="shrink-0">
                    {product.category?.name}
                  </Badge>
                </div>
                <CardDescription className="text-base leading-relaxed">{product.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-primary">R$ {Number(product.price).toFixed(2)}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <Card className="border-2">
            <CardContent className="py-16 text-center">
              <UtensilsCrossed className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-xl text-muted-foreground">
                {searchQuery
                  ? "Nenhum produto encontrado com os critérios de busca."
                  : "Nenhum produto disponível nesta categoria."}
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
