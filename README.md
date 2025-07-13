# Gerçek Zamanlı Görev Yönetim Uygulaması

Bu proje, HTML, CSS ve JavaScript kullanılarak geliştirilmiş bir gerçek zamanlı görev yönetim uygulamasıdır. Insider CodeCraft 25 Bootcamp'in 8. görev projesi olarak hazırlanmıştır.

## Özellikler

### 1. Görev Listesi Arayüzü
- Sayfa yüklendiğinde boş bir görev listesi gösterilir
- Kullanıcı, form aracılığıyla yeni görevler ekleyebilir
- Her görev için aşağıdaki bilgiler tutulur:
  - Başlık (Zorunlu Alan)
  - Açıklama (Opsiyonel)
  - Öncelik (Düşük / Orta / Yüksek - Radio butonlarıyla)
  - Tamamlandı mı? (Varsayılan olarak tamamlanmamış olarak ayarlanır)

### 2. Görev Ekleme ve DOM Manipülasyonu
- Kullanıcı formu doldurup "Ekle" butonuna bastığında, yeni görev dinamik olarak listeye eklenir
- Görevler sayfa yenilense bile korunmaz (localStorage kullanılmamıştır)
- Form gönderildikten sonra form alanları otomatik olarak temizlenir

### 3. Olay Yönetimi ve Event Delegation
- Kullanıcı, her görev satırında bulunan butonları kullanarak:
  - Görevi tamamlandı olarak işaretleyebilir (yeşil arka plan eklenir)
  - Görevi listeden silebilir
- Event delegation yaklaşımı kullanılarak dinamik elemanlar için tek bir event listener kullanılmıştır
- stopPropagation() ile istenmeyen event bubbling önlenir

### 4. Form Doğrulama ve Hata Yönetimi
- Kullanıcı boş bir başlıkla görev ekleyemez
- Öncelik seçilmediğinde hata mesajı gösterilir
- try-catch blokları ile beklenmedik hatalar yakalanır ve kullanıcıya bildirilir

### 5. Filtreleme ve Sıralama
- "Sadece tamamlananları göster" butonu ile tamamlanan görevler filtrelenebilir
- Önceliğe göre sıralama seçeneği ile görevler düşükten yükseğe veya yüksekten düşüğe sıralanabilir

## Teknolojiler

- HTML5
- CSS3
- Vanilla JavaScript (framework kullanılmamıştır)

## Kurulum ve Çalıştırma

1. Projeyi klonlayın:


2. Proje klasörüne gidin:


3. `index.html` dosyasını bir tarayıcıda açın.

## Geliştirme Notları

Proje yapısı oldukça basittir:
- `index.html`: Uygulamanın HTML yapısını içerir
- `style.css`: Tüm stil tanımlamalarını içerir
- `app.js`: Uygulamanın tüm işlevselliğini sağlayan JavaScript kodunu içerir

