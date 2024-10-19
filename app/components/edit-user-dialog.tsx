import React, { useState } from "react";
import MutableDialog, { ActionState } from "@/components/mutable-dialog";
import { UserForm } from "./user-form";
import { userSchema, User, userFormSchema, UserFormData } from "../actions/schemas";
import { editUser } from "../actions/actions";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";

interface EditUserDialogProps {
    user: User;
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (updatedUser: User) => void;
  }
  
  export function EditUserDialog({ user, isOpen, onClose, onSuccess }: EditUserDialogProps) {
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
    const form = useForm<User>({
      defaultValues: {
        ...user,
        phoneNumber: user.phoneNumber ?? '', // Ensure phoneNumber is always a string
      },
    });
    
    
    const handleEditUser = async (data: Omit<User, 'id'>): Promise<ActionState<{ name: string; email: string; phoneNumber: string; }>> => {
      try {
        const updatedUser = await editUser(user.id, data);
        onSuccess(updatedUser);
        onClose();
        return { success: true, message: null, data: updatedUser };
      } catch (error) {
        console.error('Failed to edit user:', error);
        return { success: false, message: 'Failed to edit user', error };
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
        formSchema={userFormSchema}
        FormComponent={(props) => (
          <UserForm
            {...props}
            defaultValues={form.getValues()}
            onSubmit={handleEditUser}
            validationSchema={userFormSchema}
            onChange={handleFormChange} />
        )}
        action={handleEditUser}
        defaultValues={form.getValues()}
        triggerButtonLabel="Edit"
        addDialogTitle={`Edit User ${user.name}`}
        dialogDescription="Update the user details below."
        submitButtonLabel="Save Changes" isOpen={false} onClose={function (): void {
          throw new Error("Function not implemented.");
        } } title={""}      />
      );
      }
