'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CategoryFilterProps {
  onCategoryChange: (value: string) => void
}

export function CategoryFilter({ onCategoryChange }: CategoryFilterProps) {
  return (
    <Select onValueChange={onCategoryChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="All">All Categories</SelectItem>
        <SelectItem value="Graphic Tees">Graphic Tees</SelectItem>
        <SelectItem value="Tank Tops">Tank Tops</SelectItem>
        <SelectItem value="Crop Tops">Crop Tops</SelectItem>
        <SelectItem value="Hoodies">Hoodies</SelectItem>
        <SelectItem value="V-Necks">V-Necks</SelectItem>
      </SelectContent>
    </Select>
  )
}
