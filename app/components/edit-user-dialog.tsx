import React, { useState } from "react";
import MutableDialog from "@/components/mutable-dialog";
import { UserForm } from "./user-form";
import { userSchema, User } from "../actions/schemas";
import { editUser } from "../actions/actions";
import { useForm } from "react-hook-form";

interface EditUserDialogProps {
    user: User;
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (updatedUser: User) => void;
  }
  
  export function EditUserDialog({ user, isOpen, onClose, onSuccess }: EditUserDialogProps) {
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  
    const handleEditUser = async (data: Omit<User, 'id'>) => {
      try {
        const updatedUser = await editUser(user.id, data);
        onSuccess(updatedUser);
        onClose();
      } catch (error) {
        console.error('Failed to edit user:', error);
      }
    };
  
    const handleFormChange = () => {
      setHasUnsavedChanges(true);
    };
  
    const handleClose = () => {
      if (hasUnsavedChanges) {
        if (window.confirm('You have unsaved changes. Are you sure you want to close?')) {
          onClose();
        }
      } else {
        onClose();
      }
    };
  
    return (
      <MutableDialog
        isOpen={isOpen}
        onClose={handleClose}
        formSchema={userSchema}
        FormComponent={() => (
          <UserForm
            defaultValues={{
              ...user,
              phoneNumber: user.phoneNumber ?? '', // Ensure phoneNumber is always a string
            }}
            onSubmit={handleEditUser}
            validationSchema={userSchema}
            onChange={handleFormChange}
            form={useForm()}
            />
        )} title={"Edit User"}    
        />
  );}