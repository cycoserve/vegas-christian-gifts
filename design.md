# Vegas Christian Gifts Design System

## Global Theme System

### Light Theme Colors
- **Background**: White (--background: 0 0% 100%)
- **Foreground**: Dark Gray (--foreground: 240 10% 3.9%)
- **Primary**: Dark (--primary: 240 5.9% 10%)
- **Secondary**: Light Gray (--secondary: 240 4.8% 95.9%)
- **Accent**: Light Gray (--accent: 240 4.8% 95.9%)
- **Destructive**: Red (--destructive: 0 84.2% 60.2%)

### Dark Theme Colors
- **Background**: Dark Gray (--background: 240 10% 3.9%)
- **Foreground**: Off White (--foreground: 0 0% 98%)
- **Primary**: Off White (--primary: 0 0% 98%)
- **Secondary**: Dark Gray (--secondary: 240 3.7% 15.9%)
- **Accent**: Dark Gray (--accent: 240 3.7% 15.9%)
- **Destructive**: Dark Red (--destructive: 0 62.8% 30.6%)

## Products List Component Styling

### Colors
- **Description Text**: text-gray-600
- **Success Colors**: 
  - Border: border-green-500
  - Price Text: text-green-600
- **Loading State**: 
  - Container: bg-gray-200
  - Elements: bg-gray-300
- **Wishlist Heart**: text-red-500 (when active)

### Layout & Structure
- **Grid System**:
  - Mobile: 1 column
  - Small screens (sm): 2 columns
  - Medium screens (md): 3 columns
  - Large screens (lg): 4 columns
- **Spacing**:
  - Padding: py-12 px-4
  - Gap between items: gap-4
  - Margin bottom: mb-8

### Product Card
- Border: rounded-lg with light shadow (shadow-sm)
- Padding: p-4
- Image Container: 
  - Height: h-64
  - Image Style: object-cover rounded-md
- Typography:
  - Product Name: text-xl font-semibold
  - Price: text-lg font-bold
  - Description: text-gray-600

### Loading State
- Animate: animate-pulse
- Background: bg-gray-200
- Elements:
  - Image Placeholder: h-64 bg-gray-300
  - Text Lines: bg-gray-300 with varying widths (w-3/4, w-1/2, w-1/3)

### Toast Notification
- Background: bg-white
- Border: border-2 border-green-500
- Duration: 2000ms
- Content:
  - Title: Regular weight
  - Product Name: font-semibold
  - Price: text-green-600

## CSS Variables Reference

### Base Variables
```css
--radius: 0.5rem          // Border radius
--border: HSL value       // Border color
--input: HSL value        // Input color
--ring: HSL value        // Focus ring color
```

### Component Variables
```css
--card: HSL value        // Card background
--card-foreground: HSL   // Card text
--popover: HSL value     // Popover background
--popover-foreground: HSL // Popover text
--primary: HSL value     // Primary color
--primary-foreground: HSL // Primary text
--secondary: HSL value   // Secondary color
--secondary-foreground: HSL // Secondary text
--muted: HSL value      // Muted background
--muted-foreground: HSL // Muted text
--accent: HSL value     // Accent color
--accent-foreground: HSL // Accent text
```

## Special UI Elements

### Features Background
- Background: #720e0e (Dark Red)
- Grid Pattern: #f46f00 (Orange lines)
- Grid Size: 7rem x 7rem

### Category Items
- Default Background: #202020
- Hover: #f3a43c (Orange)
- Text: White
- Border Radius: 4px

### Code Blocks
- Background: #1e1e1e
- Text: #dcdcdc
- Font: 'Courier New', Courier, monospace
- Border Radius: 5px

### Blockquotes
- Border: 4px solid #3b3b3b
- Background: #242424
- Text: #e5e7eb
- Style: Italic
- Size: 1.1rem

### Custom Scrollbar
- Track: #2e2e2e
- Thumb: #4a4a4a
- Hover: #555
- Width: 8px
- Radius: 10px
