import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Phone, Mail } from 'lucide-react'
import { EditUserDialog } from './edit-user-dialog'
import { User } from '../actions/schemas'
import { editUser } from '../actions/actions'

interface UserCardProps {
  user: User
  onUserUpdate: (updatedUser: User) => void
}

export default function UserCard({ user, onUserUpdate }: UserCardProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleOpenEditDialog = () => {
    setIsEditDialogOpen(true)
  }

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false)
  }

  const handleUserUpdate = async (updatedUser: User) => {
    const previousUser = { ...user }
    onUserUpdate(updatedUser)

    try {
      await editUser(updatedUser.id, updatedUser)
      setError(null)
    } catch (error) {
      setError('Failed to update user')
      onUserUpdate(previousUser)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="w-16 h-16">
          <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`} alt={user.name} />
          <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <CardTitle className="text-2xl">{user.name}</CardTitle>
          <Badge variant="secondary" className="w-fit mt-1">ID: {user.id}</Badge>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-muted-foreground" />
          <span>{user.phoneNumber}</span>
        </div>
        {user.email && (
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <span>{user.email}</span>
          </div>
        )}
          </CardContent>
        <button onClick={handleOpenEditDialog} className="mt-4"></button>
        {error && <div className="text-red-500 mt-2">{error}</div>}
      <EditUserDialog
        user={user}
        isOpen={isEditDialogOpen}
        onClose={handleCloseEditDialog}
        onSuccess={handleUserUpdate}
      />
    </Card>
  )
}