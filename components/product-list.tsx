"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { api, type Product, type Category } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"
import { Search } from "lucide-react"
import { Pencil, Trash2, Eye, EyeOff } from "lucide-react"

interface ProductListProps {
  products: Product[]
  categories: Category[]
  onUpdate: () => void
}

export function ProductList({ products, categories, onUpdate }: ProductListProps) {
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    categoryId: "",
    available: true,
  })

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      imageUrl: "",
      categoryId: "",
      available: true,
    })
    setEditingProduct(null)
    setShowForm(false)
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      imageUrl: product.imageUrl || "",
      categoryId: product.categoryId,
      available: product.available,
    })
    setShowForm(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (editingProduct) {
        await api.updateProduct(editingProduct.id, {
          ...formData,
          price: Number.parseFloat(formData.price),
        })
        toast({
          title: "Produto atualizado",
          description: "O produto foi atualizado com sucesso.",
        })
      } else {
        await api.createProduct({
          ...formData,
          price: Number.parseFloat(formData.price),
        })
        toast({
          title: "Produto criado",
          description: "O produto foi criado com sucesso.",
        })
      }
      resetForm()
      onUpdate()
    } catch (error) {
      toast({
        title: "Erro",
        description: error instanceof Error ? error.message : "Erro ao salvar produto",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja deletar este produto?")) return

    try {
      await api.deleteProduct(id)
      toast({
        title: "Produto deletado",
        description: "O produto foi deletado com sucesso.",
      })
      onUpdate()
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao deletar produto",
        variant: "destructive",
      })
    }
  }

  const handleToggleAvailability = async (product: Product) => {
    try {
      await api.updateProduct(product.id, {
        available: !product.available,
      })
      toast({
        title: "Disponibilidade atualizada",
        description: `Produto ${!product.available ? "disponibilizado" : "indisponibilizado"} com sucesso.`,
      })
      onUpdate()
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao atualizar disponibilidade",
        variant: "destructive",
      })
    }
  }

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category?.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h2 className="text-3xl font-bold">Produtos</h2>
        <Button onClick={() => (showForm ? resetForm() : setShowForm(true))} size="lg">
          {showForm ? "Cancelar" : "Novo Produto"}
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Buscar produtos por nome, descrição ou categoria..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-11 h-12 border-2"
        />
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingProduct ? "Editar Produto" : "Novo Produto"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Preço</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Categoria</Label>
                <Select
                  value={formData.categoryId}
                  onValueChange={(value) => setFormData({ ...formData, categoryId: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="imageUrl">URL da Imagem (opcional)</Label>
                <Input
                  id="imageUrl"
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="https://exemplo.com/imagem.jpg"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="available"
                  checked={formData.available}
                  onCheckedChange={(checked) => setFormData({ ...formData, available: checked })}
                />
                <Label htmlFor="available">Produto disponível</Label>
              </div>

              <Button type="submit" disabled={loading}>
                {loading ? "Salvando..." : editingProduct ? "Atualizar Produto" : "Criar Produto"}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-all border-2">
            {product.imageUrl && (
              <div className="relative h-52 w-full bg-muted">
                <Image src={product.imageUrl || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
              </div>
            )}
            <CardHeader>
              <div className="flex justify-between items-start gap-2">
                <CardTitle className="text-xl">{product.name}</CardTitle>
                <Badge variant={product.available ? "default" : "secondary"} className="shrink-0">
                  {product.available ? "Disponível" : "Indisponível"}
                </Badge>
              </div>
              <CardDescription className="text-sm">{product.category?.name}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
              <p className="text-2xl font-bold text-primary">R$ {Number(product.price).toFixed(2)}</p>
              <div className="flex gap-2 flex-wrap">
                <Button variant="outline" size="sm" onClick={() => handleEdit(product)} className="gap-2">
                  <Pencil className="h-4 w-4" />
                  Editar
                </Button>
                <Button
                  variant={product.available ? "secondary" : "default"}
                  size="sm"
                  onClick={() => handleToggleAvailability(product)}
                  className="gap-2"
                >
                  {product.available ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  {product.available ? "Ocultar" : "Mostrar"}
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(product.id)} className="gap-2">
                  <Trash2 className="h-4 w-4" />
                  Deletar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && !showForm && (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            {searchQuery
              ? "Nenhum produto encontrado com os critérios de busca."
              : "Nenhum produto cadastrado. Clique em 'Novo Produto' para começar."}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
