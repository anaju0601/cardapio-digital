"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { api, type Professor } from "@/lib/api"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { ProfessorDialog } from "@/components/professor-dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function ProfessorsPage() {
  const [professors, setProfessors] = useState<Professor[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingProfessor, setEditingProfessor] = useState<Professor | null>(null)

  const fetchProfessors = async () => {
    try {
      const data = await api.getProfessors()
      setProfessors(data)
    } catch (error) {
      toast.error("Failed to load professors")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProfessors()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this professor?")) return

    try {
      await api.deleteProfessor(id)
      toast.success("Professor deleted successfully")
      fetchProfessors()
    } catch (error) {
      toast.error("Failed to delete professor")
    }
  }

  const handleEdit = (professor: Professor) => {
    setEditingProfessor(professor)
    setDialogOpen(true)
  }

  const handleDialogClose = () => {
    setDialogOpen(false)
    setEditingProfessor(null)
    fetchProfessors()
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Professors</h1>
            <p className="text-muted-foreground">Manage university professors</p>
          </div>
          <Button onClick={() => setDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Professor
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Professors</CardTitle>
            <CardDescription>A list of all professors in the system</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">Loading...</div>
            ) : professors.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No professors found. Add your first professor to get started.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Specialization</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {professors.map((professor) => (
                    <TableRow key={professor.id}>
                      <TableCell className="font-medium">{professor.name}</TableCell>
                      <TableCell>{professor.email}</TableCell>
                      <TableCell>{professor.department}</TableCell>
                      <TableCell>{professor.specialization}</TableCell>
                      <TableCell>
                        <Badge variant={professor.active ? "default" : "secondary"}>
                          {professor.active ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleEdit(professor)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDelete(professor.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      <ProfessorDialog open={dialogOpen} onClose={handleDialogClose} professor={editingProfessor} />
    </DashboardLayout>
  )
}
