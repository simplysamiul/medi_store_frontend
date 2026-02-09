"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Pencil } from "lucide-react";
// import { updateCategoryById } from "@/actions/categoy.action";
import { toast } from "react-toastify";
import { updateCategoryById } from "@/actions/categoy.action";

export type Category = {
  id?: string;
  category_name: string;
  descripting: string;
};

// ✅ Separate Edit Component
export default function EditCategory({
  category,
  onUpdated,
}: {
  category: Category;
  onUpdated?: (cat: Category) => void;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // ✅ set default values when dialog opens / category changes
  useEffect(() => {
    if (open) {
      setName(category.category_name || "");
      setDescription(category.descripting || "");
    }
  }, [open, category]);

  const handleUpdate = async () => {
    if (!name.trim()) {
      toast.error("Category name is required");
      return;
    }

    try {
      setLoading(true);
      const updateCategory = {
        category_name: name,
        descripting: description,
      };

      const res = await updateCategoryById(category.id as string, updateCategory);

      if (res?.data?.success) {
        const updated = res.data.data;
        toast.success("Category updated successfully");
        onUpdated?.(updated);
        setOpen(false);
      } else {
        toast.error("Update failed");
      }
    } catch (err) {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <Pencil className="h-4 w-4 mr-1" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Category Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter className="pt-4">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button onClick={handleUpdate} disabled={loading}>
            {loading ? "Updating..." : "Update"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
