"use client";

import { deleteUserById, getAllUsers } from "@/actions/user.action";
import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { Badge } from "@/components/ui/badge";
import UserEditModal from "./userEditModal";

export interface User {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    role: "ADMIN" | "SELLER" | "CUSTOMER";
    status: "ACTIVE" | "INACTIVE" | "BLOCKED";
    emailVerified: boolean;
    image?: string | null;
    createdAt: string;
    updatedAt: string;
}


const UsersList = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingUser, setEditingUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await getAllUsers();
                if (res?.data?.success) {
                    setUsers(res.data.data);
                }
            } catch (error) {
                console.error("Failed to fetch users", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    /* ================= DELETE ================= */
    const handleDelete = async (id: string) => {
        try {
            const res = await deleteUserById(id);
            if (res.data.success) {
                // optimistic update
                setUsers((prev) => prev.filter((u) => u.id !== id));

                toast.success("User deleted successfully");
            }
        } catch (error) {
            toast.error("Failed to delete user");
        }
    };

    if (loading) return <p>Loading users...</p>;

    return (
        <div className="p-4 md:p-6">
            <Card className="rounded-2xl shadow-md">
                <CardHeader>
                    <CardTitle className="text-xl md:text-2xl font-bold">
                        Users List
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    {/* ================= DESKTOP TABLE ================= */}
                    <div className="hidden md:block rounded-xl border overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Phone</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Verified</TableHead>
                                    <TableHead>Joined</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {users.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell className="font-medium">
                                            {user.name}
                                        </TableCell>

                                        <TableCell>{user.email}</TableCell>

                                        <TableCell>{user.phone ?? "—"}</TableCell>

                                        <TableCell>
                                            <Badge variant="outline">{user.role}</Badge>
                                        </TableCell>

                                        <TableCell>
                                            <Badge
                                                className={
                                                    user.status === "ACTIVE"
                                                        ? "bg-black text-white hover:bg-black"
                                                        : user.status === "INACTIVE"
                                                            ? "bg-red-500 text-white hover:bg-red-500"
                                                            : "bg-gray-200 text-gray-500 cursor-not-allowed"
                                                }
                                            >
                                                {user.status}
                                            </Badge>
                                        </TableCell>


                                        <TableCell>
                                            {user.emailVerified ? "✅" : "❌"}
                                        </TableCell>

                                        <TableCell>
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </TableCell>

                                        <TableCell className="text-right space-x-2">
                                            <Button
                                                size="icon"
                                                variant="outline"
                                                onClick={() => setEditingUser(user)}
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </Button>


                                            <DeleteDialog onConfirm={() => handleDelete(user.id)} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>

                        </Table>
                    </div>

                    {/* ================= MOBILE CARDS ================= */}
                    <div className="grid gap-4 md:hidden">
                        {users.map((user) => (
                            <Card key={user.id} className="rounded-xl border">
                                <CardContent className="p-4 space-y-2">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="font-semibold">{user.name}</p>
                                            <p className="text-sm opacity-70">{user.email}</p>
                                        </div>

                                        <Badge
                                            variant={
                                                user.status === "ACTIVE"
                                                    ? "default"
                                                    : user.status === "BLOCKED"
                                                        ? "destructive"
                                                        : "secondary"
                                            }
                                        >
                                            {user.status}
                                        </Badge>
                                    </div>

                                    <p className="text-sm"> {user.phone ?? "—"}</p>
                                    <p className="text-sm">Role: {user.role}</p>
                                    <p className="text-sm">
                                        Verified: {user.emailVerified ? "Yes" : "No"}
                                    </p>

                                    <div className="flex gap-2 pt-2">
                                        <Button
                                            size="icon"
                                            variant="outline"
                                            onClick={() => setEditingUser(user)}
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </Button>


                                        <DeleteDialog onConfirm={() => handleDelete(user.id)} />
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                </CardContent>
            </Card>

            {/* edit modal */}
            {/* ================= EDIT USER MODAL ================= */}
            {editingUser && (
                <UserEditModal
                    open={!!editingUser}
                    user={editingUser}
                    onClose={() => setEditingUser(null)}
                    onUpdated={(updatedUser) => {
                        setUsers((prev) =>
                            prev.map((u) =>
                                u.id === updatedUser.id ? updatedUser : u
                            )
                        );
                        setEditingUser(null);
                        toast.success("User updated successfully");
                    }}
                />
            )}
        </div>
    );
};

export default UsersList;


// Delete dialoge //

function DeleteDialog({ onConfirm }: { onConfirm: () => void }) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button size="icon" variant="destructive">
                    <Trash2 className="w-4 h-4" />
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete user?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. The user will be permanently removed.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        className="bg-red-500 hover:bg-red-600"
                        onClick={onConfirm}
                    >
                        Yes, Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

