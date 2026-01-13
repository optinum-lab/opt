# Git Push Script
param(
    [string]$message = "Update project files",
    [string]$remote = "opt",
    [string]$branch = "main"
)

Write-Host "🚀 Git Push Script" -ForegroundColor Cyan
Write-Host "==================" -ForegroundColor Cyan

# Stage all changes
Write-Host "`n📦 Staging all changes..." -ForegroundColor Yellow
git add -A

# Show status
Write-Host "`n📋 Status:" -ForegroundColor Yellow
git status --short

# Commit
Write-Host "`n💾 Committing with message: '$message'" -ForegroundColor Yellow
git commit -m $message

# Push
Write-Host "`n🚀 Pushing to $remote/$branch..." -ForegroundColor Yellow
git push $remote $branch

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Successfully pushed to $remote/$branch!" -ForegroundColor Green
} else {
    Write-Host "`n❌ Push failed!" -ForegroundColor Red
}
