"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { api, type Schedule } from "@/lib/api"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { ScheduleDialog } from "@/components/schedule-dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function SchedulesPage() {
  const [schedules, setSchedules] = useState<Schedule[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null)

  const fetchSchedules = async () => {
    try {
      const data = await api.getSchedules()
      setSchedules(data)
    } catch (error) {
      toast.error("Failed to load schedules")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSchedules()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this schedule?")) return

    try {
      await api.deleteSchedule(id)
      toast.success("Schedule deleted successfully")
      fetchSchedules()
    } catch (error) {
      toast.error("Failed to delete schedule")
    }
  }

  const handleEdit = (schedule: Schedule) => {
    setEditingSchedule(schedule)
    setDialogOpen(true)
  }

  const handleDialogClose = () => {
    setDialogOpen(false)
    setEditingSchedule(null)
    fetchSchedules()
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Schedules</h1>
            <p className="text-muted-foreground">Manage class schedules</p>
          </div>
          <Button onClick={() => setDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Schedule
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Schedules</CardTitle>
            <CardDescription>A list of all class schedules in the system</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">Loading...</div>
            ) : schedules.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No schedules found. Add your first schedule to get started.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead>Day</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Classroom</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {schedules.map((schedule) => (
                    <TableRow key={schedule.id}>
                      <TableCell className="font-medium">{schedule.subject?.name || "N/A"}</TableCell>
                      <TableCell>{schedule.dayOfWeek}</TableCell>
                      <TableCell>
                        {schedule.startTime} - {schedule.endTime}
                      </TableCell>
                      <TableCell>{schedule.classroom}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleEdit(schedule)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDelete(schedule.id)}>
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

      <ScheduleDialog open={dialogOpen} onClose={handleDialogClose} schedule={editingSchedule} />
    </DashboardLayout>
  )
}
