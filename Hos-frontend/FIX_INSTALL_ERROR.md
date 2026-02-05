# Fix: PowerShell Execution Policy Error

## The Problem
```
npm : File C:\Program Files\nodejs\npm.ps1 cannot be loaded because running scripts is disabled on this system.
```

This happens because Windows PowerShell blocks script execution by default for security.

## ✅ Solution 1: Change Execution Policy (Recommended)

### Option A: For Current User Only (Safest)
Open PowerShell as Administrator and run:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```
Type `Y` when prompted.

### Option B: For Current Session Only (Temporary)
Run this in your current PowerShell window:
```powershell
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
```

## ✅ Solution 2: Use Command Prompt (CMD) Instead

1. Press `Win + R`
2. Type `cmd` and press Enter
3. Navigate to your project:
   ```cmd
   cd "D:\Healthcare Doctor–Patient Translation\Hos-frontend"
   ```
4. Run:
   ```cmd
   npm install
   ```

## ✅ Solution 3: Use npm.cmd Directly

In PowerShell, use the `.cmd` version:
```powershell
npm.cmd install
```

## ✅ Solution 4: Bypass for Single Command

Run this in PowerShell:
```powershell
powershell -ExecutionPolicy Bypass -Command "cd 'D:\Healthcare Doctor–Patient Translation\Hos-frontend'; npm install"
```

## 🎯 Quick Fix (Easiest)

**Just use Command Prompt (CMD) instead of PowerShell:**
1. Open CMD (not PowerShell)
2. Run:
   ```cmd
   cd "D:\Healthcare Doctor–Patient Translation\Hos-frontend"
   npm install
   ```

## After Fixing

Once you can run npm, continue with:
```bash
npm install
npm run dev
```



