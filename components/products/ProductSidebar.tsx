import React from 'react';
import SearchComponent from '../Sections/SearchComponent';
import { Slider } from '../ui/slider';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/Label';
import { ScrollArea } from '../ui/scroll-area';

interface ProductSidebarProps {
  onSearch: (term: string) => void;
  onPriceChange: (value: number[]) => void;
  onCategoryChange: (category: string) => void;
  onColorChange: (color: string) => void;
  selectedCategory: string;
  selectedColor: string;
  priceRange: number[];
}

const ProductSidebar: React.FC<ProductSidebarProps> = ({
  onSearch,
  onPriceChange,
  onCategoryChange,
  onColorChange,
  selectedCategory,
  selectedColor,
  priceRange,
}) => {
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

  return (
    <div className="w-64 bg-white p-4 border-r min-h-screen">
      <div className="space-y-6">
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
                    onChange={() => onCategoryChange(category)}
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
          <RadioGroup className='h-48 w-full rounded-md border p-2' value={selectedColor} onValueChange={onColorChange}>
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
    </div>
  );
};

export default ProductSidebar;
