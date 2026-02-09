"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
import { deleteCategoryById, getCategories } from "@/actions/categoy.action";
import { toast } from "react-toastify";
import AddCategory from "./AddCategory";
import EditCategory from "./EditCategory";
// import { CategoryType } from "@/types";

export type Category = {
    id?: string;
    category_name: string;
    descripting: string;
    created_at?: string;
    updated_at?: string;
};

export default function CategoryList() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    // fetch category list
    useEffect(() => {
        (async () => {
            try {
                const res = await getCategories();
                if (res?.data?.success) {
                    setCategories(res.data.data || []);
                }
            } catch (err) {
                console.error("Failed to load categories", err);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    //  delete handler
    const handleDelete = async (id: string) => {
        try {
            setDeletingId(id);
            const res = await deleteCategoryById(id);

            if (res?.data?.success) {
                setCategories((prev) => prev.filter((c) => c.id !== id));
                toast.success("Successfully deleted category!");
            } else {
                toast.error("Delete failed");
            }
        } catch (err) {
            toast.error("Delete failed");
        } finally {
            setDeletingId(null);
        }
    };

    //  after create add to list top
    const handleCreated = (cat: Category) => {
        setCategories((prev) => [cat, ...prev]);
    };

    if (loading) {
        return (
            <div className="p-6 text-center text-sm text-muted-foreground">
                Loading categories...
            </div>
        );
    }

    return (
        <Card className="w-full rounded-2xl shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between gap-3">
                <CardTitle className="text-xl sm:text-2xl">Category List</CardTitle>
                {/* Add Category Button */}
                <AddCategory onCreated={handleCreated} />
            </CardHeader>

            <CardContent className="p-3 sm:p-6">
                {/* ================= DESKTOP TABLE ================= */}
                <div className="hidden md:block w-full overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Created</TableHead>
                                <TableHead>Updated</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {categories.map((cat: Category) => (
                                <TableRow key={cat.id}>
                                    <TableCell className="font-medium">
                                        {cat.category_name}
                                    </TableCell>

                                    <TableCell className="max-w-[420px] truncate">
                                        {cat.descripting}
                                    </TableCell>

                                    <TableCell>
                                        {new Date(cat.created_at).toLocaleDateString()}
                                    </TableCell>

                                    <TableCell>
                                        {new Date(cat.updated_at).toLocaleDateString()}
                                    </TableCell>

                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <EditCategory
                                                category={cat}
                                                onUpdated={(updated) =>
                                                    setCategories(prev =>
                                                        prev.map(c => c.id === updated.id ? updated : c)
                                                    )
                                                }
                                            />

                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button
                                                        size="sm"
                                                        variant="destructive"
                                                        disabled={deletingId === cat.id}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>
                                                            Delete this category?
                                                        </AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            This action cannot be undone. This will
                                                            permanently delete the category.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() => handleDelete(cat.id)}
                                                        >
                                                            Yes, Delete
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* ================= MOBILE / TABLET CARDS ================= */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                    {categories.map((cat: Category) => (
                        <div
                            key={cat.id}
                            className="rounded-2xl border p-4 shadow-sm space-y-3"
                        >
                            <div className="space-y-1">
                                <p className="font-semibold text-base">
                                    {cat.category_name}
                                </p>
                                <p className="text-sm text-muted-foreground line-clamp-3">
                                    {cat.descripting}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                                <div>
                                    Created: {new Date(cat.created_at).toLocaleDateString()}
                                </div>
                                <div>
                                    Updated: {new Date(cat.updated_at).toLocaleDateString()}
                                </div>
                            </div>

                            <div className="flex gap-2 pt-2">
                                <EditCategory
                                    category={cat}
                                    onUpdated={(updated) =>
                                        setCategories(prev =>
                                            prev.map(c => c.id === updated.id ? updated : c)
                                        )
                                    }
                                />

                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            className="flex-1"
                                            disabled={deletingId === cat.id}
                                        >
                                            <Trash2 className="h-4 w-4 mr-1" /> Delete
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>
                                                Delete this category?
                                            </AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone. This will permanently
                                                delete the category.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction
                                                onClick={() => handleDelete(cat.id)}
                                            >
                                                Yes, Delete
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
