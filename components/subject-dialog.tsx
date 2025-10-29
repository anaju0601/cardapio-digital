"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { api, type Subject, type Professor } from "@/lib/api"
import { toast } from "sonner"

interface SubjectDialogProps {
  open: boolean
  onClose: () => void
  subject?: Subject | null
}

export function SubjectDialog({ open, onClose, subject }: SubjectDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    workload: 0,
    description: "",
    professorId: "",
  })
  const [professors, setProfessors] = useState<Professor[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (open) {
      api.getProfessors().then(setProfessors)
    }
  }, [open])

  useEffect(() => {
    if (subject) {
      setFormData({
        name: subject.name,
        code: subject.code,
        workload: subject.workload,
        description: subject.description || "",
        professorId: subject.professorId,
      })
    } else {
      setFormData({
        name: "",
        code: "",
        workload: 0,
        description: "",
        professorId: "",
      })
    }
  }, [subject, open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (subject) {
        await api.updateSubject(subject.id, formData)
        toast.success("Subject updated successfully")
      } else {
        await api.createSubject(formData)
        toast.success("Subject created successfully")
      }
      onClose()
    } catch (error) {
      toast.error(`Failed to ${subject ? "update" : "create"} subject`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{subject ? "Edit Subject" : "Add New Subject"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="code">Code</Label>
            <Input
              id="code"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="workload">Workload (hours)</Label>
            <Input
              id="workload"
              type="number"
              value={formData.workload}
              onChange={(e) => setFormData({ ...formData, workload: Number(e.target.value) })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="professor">Professor</Label>
            <Select
              value={formData.professorId}
              onValueChange={(value) => setFormData({ ...formData, professorId: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a professor" />
              </SelectTrigger>
              <SelectContent>
                {professors.map((professor) => (
                  <SelectItem key={professor.id} value={professor.id}>
                    {professor.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : subject ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
