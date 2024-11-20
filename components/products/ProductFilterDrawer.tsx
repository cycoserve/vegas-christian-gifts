import React, { useState } from 'react';
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { Filter, X } from "lucide-react";
import { ScrollArea } from '../ui/scroll-area';
import SearchComponent from '../Sections/SearchComponent';
import { Slider } from '../ui/slider';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/Label';

interface ProductFilterDrawerProps {
  onSearch: (term: string) => void;
  onPriceChange: (value: number[]) => void;
  onCategoryChange: (category: string) => void;
  onColorChange: (color: string) => void;
  selectedCategory: string;
  selectedColor: string;
  priceRange: number[];
}

const ProductFilterDrawer: React.FC<ProductFilterDrawerProps> = ({
  onSearch,
  onPriceChange,
  onCategoryChange,
  onColorChange,
  selectedCategory,
  selectedColor,
  priceRange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const categories = [
    'All',
    'Flower Pots',
    'Religious Items',
    'Home Decor',
    'Gifts',
  ];

  const colors = [
    'All',
    'White',
    'Black',
    'Brown',
    'Pink',
    'Blue',
  ];

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const closeDrawer = () => {
    setIsOpen(false);
  };

  const handleCloseClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    closeDrawer();
  };

  const FilterContent = () => (
    <div className="space-y-6 p-4">
      {/* Search */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Search</h3>
        <SearchComponent onSearch={onSearch} />
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Price Range</h3>
        <div className="px-2">
          <Slider
            defaultValue={[0, 100]}
            max={200}
            step={1}
            value={priceRange}
            onValueChange={onPriceChange}
            className="mt-2"
          />
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Categories</h3>
        <ScrollArea className="h-48 w-full rounded-md border p-2">
          <div className="space-y-2">
            {categories.map((category) => (
              <label
                key={category}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="radio"
                  checked={selectedCategory === category}
                  onChange={() => {
                    onCategoryChange(category);
                    closeDrawer();
                  }}
                  className="form-radio h-4 w-4 text-pink-600"
                />
                <span className="text-sm">{category}</span>
              </label>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Colors */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Colors</h3>
        <RadioGroup 
          className='h-48 w-full rounded-md border p-2' 
          value={selectedColor} 
          onValueChange={(value) => {
            onColorChange(value);
            closeDrawer();
          }}
        >
          <div className="space-y-2">
            {colors.map((color) => (
              <div key={color} className="flex items-center space-x-2">
                <RadioGroupItem value={color} id={`color-${color}`} />
                <Label htmlFor={`color-${color}`}>{color}</Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Filter Button */}
      <button
        onClick={toggleDrawer}
        className="md:hidden fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg z-50 hover:bg-blue-700 transition-colors"
        aria-label="Toggle filters"
      >
        <Filter className="w-6 h-6" />
      </button>

      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 bg-white p-4 border-r min-h-screen">
        <FilterContent />
      </div>

      {/* Mobile Drawer */}
      <div className="md:hidden">
        <Drawer
          open={isOpen}
          onClose={closeDrawer}
          direction="left"
          className="!w-[80vw] max-w-[300px]"
          lockBackgroundScroll={true}
          overlayColor="rgba(0, 0, 0, 0.5)"
        >
          <div className="bg-white h-full w-full relative">
            <button 
              onClick={handleCloseClick}
              className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
              aria-label="Close filters"
            >
              {/* <X className="w-6 h-6 text-gray-600" /> */}
            </button>
            <ScrollArea className="h-full pt-16">
              <FilterContent />
            </ScrollArea>
          </div>
        </Drawer>
      </div>
    </>
  );
};

export default ProductFilterDrawer;
