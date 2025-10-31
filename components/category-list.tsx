"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { api, type Category } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"
import { Trash2, FolderOpen } from "lucide-react"

interface CategoryListProps {
  categories: Category[]
  onUpdate: () => void
}

export function CategoryList({ categories, onUpdate }: CategoryListProps) {
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageUrl: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await api.createCategory(formData)
      setFormData({ name: "", description: "", imageUrl: "" })
      setShowForm(false)
      toast({
        title: "Categoria criada",
        description: "A categoria foi criada com sucesso.",
      })
      onUpdate()
    } catch (error) {
      toast({
        title: "Erro",
        description: error instanceof Error ? error.message : "Erro ao criar categoria",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja deletar esta categoria?")) return

    try {
      await api.deleteCategory(id)
      toast({
        title: "Categoria deletada",
        description: "A categoria foi deletada com sucesso.",
      })
      onUpdate()
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao deletar categoria",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Categorias</h2>
        <Button onClick={() => setShowForm(!showForm)} size="lg">
          {showForm ? "Cancelar" : "Nova Categoria"}
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Nova Categoria</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
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

              <Button type="submit" disabled={loading}>
                {loading ? "Criando..." : "Criar Categoria"}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card key={category.id} className="overflow-hidden hover:shadow-lg transition-all border-2">
            {category.imageUrl && (
              <div className="relative h-52 w-full bg-muted">
                <Image
                  src={category.imageUrl || "/placeholder.svg"}
                  alt={category.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <FolderOpen className="h-5 w-5 text-primary" />
                {category.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">{category.description}</p>
              <Button variant="destructive" size="sm" onClick={() => handleDelete(category.id)} className="gap-2">
                <Trash2 className="h-4 w-4" />
                Deletar
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {categories.length === 0 && !showForm && (
        <Card>
          <CardContent className="py-8 text-center text-gray-500">
            Nenhuma categoria cadastrada. Clique em "Nova Categoria" para começar.
          </CardContent>
        </Card>
      )}
    </div>
  )
}
