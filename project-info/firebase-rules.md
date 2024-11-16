# Firebase Security Rules Update

## Firestore Rules for Carts Collection
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Carts collection - each user can only read/write their own cart
    match /carts/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Products collection remains read-only for all users
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth.token.admin == true;
    }
  }
}
```

## Implementation Steps

1. The 'carts' collection has already been created

2. Update Firebase Security Rules:
   - Go to Firebase Console
   - Navigate to Firestore Database
   - Click on "Rules" tab
   - Copy and paste the above rules
   - Click "Publish"

## Rules Explanation

1. Carts Collection:
   - Users can only access their own cart document (matching their uid)
   - Authentication is required for all cart operations
   - Each user's cart is stored in a document with their uid as the ID

2. Products Collection:
   - Read access for all users
   - Write access restricted to admin users

## Testing the Rules

Test these scenarios to ensure rules are working:
1. Authenticated user can read/write their own cart
2. Authenticated user cannot access other users' carts
3. Unauthenticated users cannot access any cart data
4. All users can read product data
