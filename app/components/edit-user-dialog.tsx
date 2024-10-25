import React, { useState } from "react";
import MutableDialog, { ActionState } from "@/components/mutable-dialog";
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
  
  export function EditUserDialog({ user, onClose, onSuccess }: EditUserDialogProps) {
    const [, setHasUnsavedChanges] = useState(false);
    const form = useForm<User>({
      defaultValues: {
        ...user,
        phoneNumber: user.phoneNumber ?? '', // Ensure phoneNumber is always a string
      },
    });
    
    
    const handleEditUser = async (data: Omit<User, 'id'>): Promise<ActionState<{ name: string; email: string; phoneNumber: string; }>> => {
      try {
        const updatedUser = await editUser(Number(user.id), data);
        onSuccess(updatedUser);
        onClose();
        return { success: true, message: null, data: { ...updatedUser, phoneNumber: updatedUser.phoneNumber ?? '' } };
      } catch (error) {
        console.error('Failed to edit user:', error);
        return { success: false, message: 'Failed to edit user', error };
      }
    };
  
    const handleFormChange = () => {
      setHasUnsavedChanges(true);
    };
  
  
    return (
      <MutableDialog
        formSchema={userSchema}
        FormComponent={(props) => (
          <UserForm
            {...props}
            defaultValues={form.getValues()}
            onSubmit={handleEditUser}
            validationSchema={userSchema}
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
