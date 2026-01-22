# Favicon dosyalarını Cloudinary'ye yükleme scripti
# Kullanım: .\upload-favicons-to-cloudinary.ps1

$cloudName = "dkxbhuvvp"
$uploadPreset = "ml_default" # Cloudinary dashboard'unuzdan unsigned upload preset oluşturun

$faviconFiles = @(
    @{ Path = "public\favicon.ico"; PublicId = "favicon/favicon" }
    @{ Path = "public\favicon-16x16.png"; PublicId = "favicon/favicon-16x16" }
    @{ Path = "public\favicon-32x32.png"; PublicId = "favicon/favicon-32x32" }
    @{ Path = "public\favicon-96x96.png"; PublicId = "favicon/favicon-96x96" }
    @{ Path = "public\apple-touch-icon.png"; PublicId = "favicon/apple-touch-icon" }
    @{ Path = "public\web-app-manifest-192x192.png"; PublicId = "favicon/web-app-manifest-192x192" }
    @{ Path = "public\web-app-manifest-512x512.png"; PublicId = "favicon/web-app-manifest-512x512" }
)

Write-Host "🚀 Favicon dosyaları Cloudinary'ye yükleniyor..." -ForegroundColor Cyan

foreach ($file in $faviconFiles) {
    if (Test-Path $file.Path) {
        Write-Host "📤 Yükleniyor: $($file.Path)" -ForegroundColor Yellow
        
        $url = "https://api.cloudinary.com/v1_1/$cloudName/image/upload"
        
        $formData = @{
            file = Get-Item $file.Path
            upload_preset = $uploadPreset
            public_id = $file.PublicId
            folder = "favicon"
        }
        
        try {
            $response = Invoke-RestMethod -Uri $url -Method Post -Form $formData
            Write-Host "✅ Başarılı: $($response.secure_url)" -ForegroundColor Green
        }
        catch {
            Write-Host "❌ Hata: $($_.Exception.Message)" -ForegroundColor Red
        }
    }
    else {
        Write-Host "⚠️  Dosya bulunamadı: $($file.Path)" -ForegroundColor Yellow
    }
}

Write-Host "`n✨ Tüm favicon'lar yüklendi!" -ForegroundColor Green
Write-Host "📝 layout.tsx dosyasındaki URL'leri kontrol edin." -ForegroundColor Cyan
