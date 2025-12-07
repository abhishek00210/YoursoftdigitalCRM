import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AddTaskDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onTaskCreate: (task: {
    id?: string;
    title: string;
    description?: string;
    status: string;
    tags: string[];
    assignees?: any[];
  }) => void;
}

export const AddTaskDialog: React.FC<AddTaskDialogProps> = ({
  isOpen,
  onOpenChange,
  onTaskCreate,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [statusValue, setStatusValue] = useState("todo");
  const [tagsValue, setTagsValue] = useState("");

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setStatusValue("todo");
    setTagsValue("");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title.trim()) return alert("Please enter a title");

    const taskData = {
      title: title.trim(),
      description: description.trim(),
      status: statusValue || "todo",
      tags: tagsValue.split(",").map(t => t.trim()).filter(Boolean),
      assignees: [{ initials: "N" }],
    };

    onTaskCreate(taskData);
    resetForm();
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
          <DialogDescription>Create a new task and place it in a column.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">Title</Label>
              <Input id="title" name="title" className="col-span-3" required value={title} onChange={(e)=>setTitle(e.target.value)} />
            </div>

            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="description" className="text-right">Description</Label>
              <Textarea id="description" name="description" className="col-span-3" value={description} onChange={(e)=>setDescription(e.target.value)} />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">Status</Label>
              <div className="col-span-3">
                <Select name="status" value={statusValue} onValueChange={(v)=>setStatusValue(v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todo">To Do</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="review">Review</SelectItem>
                    <SelectItem value="done">Done</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tags" className="text-right">Tags</Label>
              <Input id="tags" name="tags" className="col-span-3" value={tagsValue} onChange={(e)=>setTagsValue(e.target.value)} placeholder="comma,separated,tags" />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => { resetForm(); onOpenChange(false); }}>Cancel</Button>
            <Button type="submit">Create Task</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
